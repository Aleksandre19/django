from django.shortcuts import render, redirect, reverse, get_object_or_404
from .forms import SubForm
from django.contrib.auth.models import User
from .models import Cards, Subscription
import stripe
from django.conf import settings
import datetime



# Stripe public key
stripe_public_key = settings.STRIPE_PUBLIC_KEY
# Stripe secret key
stripe_secret_key = settings.STRIPE_SECRET_KEY


# Subscription plans view
def cards(request):
    
    # Requiring a all subscription cards
    cards = Cards.objects.all()

    context = {
        'cards' : cards,
    }

    # If a user is not autheticated so
    # displaying subscription plan
    if not request.user.is_authenticated:
        return render(request, 'cards.html', context)
    
    if request.user.is_authenticated:
        # If a user has a subscription so
        # redirectiing to the video's page
        if check_users_subscription(request.user):
            return redirect(reverse('home'))

        # If not so displaying a subscription plans
        else:
            return render(request, 'cards.html', context)


# Cheking if a user has subscriptions and
def check_users_subscription(user):
    subscribed = None
    subscriptions = Subscription.objects.filter(user=user)  
    for subscription in subscriptions:
        subscribed = subscription.subscribed  
    return subscribed


# Checkout page view
def checkout(request):
    
    if request.user.is_authenticated:
        
        # Checking a POST request
        if request.POST:
            
            # Declairing variables
            period = None
            saving = None
            price = None

            # Requesting a Subscription's payment form
            sub_form = SubForm()

            # Requesting all cards
            cards = Cards.objects.all()

            # Current Plan's Price
            current_price = request.POST['price']

            # Stripe price ID
            plan_id = request.POST['stripe_plan_id']
            
            # Requaring current user's email address
            user = User.objects.get(id=request.user.id)
            customer_email_address = user.email

            # Checking which card corresponds to the request 
            for card in cards:
                if card.price == int(current_price):
                    period = card.duration
                    saving = card.saving
                    price = card.price

            # Converting a price for stripe
            stripe_total = int(current_price) * 100

            # Setting a buplic key to stripe
            stripe.api_key = stripe_secret_key

            # Creating a stripe payment intent
            intent = stripe.PaymentIntent.create(
                amount=stripe_total,
                currency='EUR',
                payment_method_types = ['card'],
            )

            # Page context
            context = {
                'sub_form': sub_form,
                'cards' : cards,
                'stripe_public_key' : stripe_public_key,
                'client_secret' : intent.client_secret,
                'customer_email_address' : customer_email_address,
                'payment_intent_id' : intent.id,
                'plan_id' : plan_id, 
                'current_card' : {
                    'period' : period,
                    'saving' : saving,
                    'price' : price,
                },
            }

            # Rendering a checkout page
            return render(request, 'checkout.html', context)

        # If there is not POST request so
        # redirecting to the subscription plans page
        else:
            # Rendering a plans page
            return redirect(reverse('cards'))

    # If a user is not authenticated so
    # redirecting to the login page 
    else:
        return redirect(reverse('account_login'))


# Subscription Success Function
def sub_success(request):

    # Checking a POST request
    if request.POST:

        # Storing a stripe intent ID
        payment_intent_id = request.POST['payment_intent_id']

        # Storing a payment method ID
        payment_method_id = request.POST['payment_method_id']

        # Storing a email address
        customer_email_address = request.POST['customer_email_address']

        # Storing a stripe price ID
        stripe_plan_id = request.POST['plan_id']

        # Requiring current subscription card
        sub_card = get_object_or_404(Cards, stripe_plan_id=stripe_plan_id)

        # Getting current plan's Price
        current_plan_price = sub_card.price
        # for s_card in sub_card:
        #     current_plan_price=s_card.price
        #     current_plan_id=s_card.id

        # Initiating a stripe
        stripe.api_key = stripe_secret_key

        # Creating a stripe customer
        customer = stripe.Customer.create(
            email=customer_email_address,
            payment_method=payment_method_id,
            invoice_settings={
                'default_payment_method' : payment_method_id
            }
        )

        # Creating a subscription
        subs = stripe.Subscription.create(
            customer=customer.id,
            items=[
                {
                    'plan': stripe_plan_id
                },
            ]
        )

        # Modifying a stripe intent
        stripe.PaymentIntent.modify(
            payment_intent_id,
            payment_method=payment_method_id,
            customer=customer.id
        )

        # Confirming a stripe intent
        stripe.PaymentIntent.confirm(
            payment_intent_id
        )

        # Inserting a data in to the Subscription's module
        if subs:
            subscription = Subscription(
                sub_number=subs.id,
                user=request.user,
                card=sub_card,
                full_name=request.POST['full_name'],
                email=request.POST['email'],
                phone_number=request.POST['phone_number'],
                start_date=datetime.datetime.fromtimestamp(float(subs.current_period_start)),
                end_date=datetime.datetime.fromtimestamp(float(subs.current_period_end)),
                subscribed=True,
                price=current_plan_price,
            )

            subscription.save()
        
        # Rendering a success page
        return render(request, 'sub_success.html')

    else:
        
        # Rendering a plans page
        return redirect(reverse('cards'))


# Subscription Cancel Function
def sub_cancel(request):
    return render(request, 'sub_cancel.html')



