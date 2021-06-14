from django.shortcuts import render, redirect, reverse
from .forms import SubForm
from .models import Cards

# Create your views here.

def cards(request):

    # Requiring a all subscription cards
    cards = Cards.objects.all()

    context = {
        'cards' : cards,
    }

    return render(request, 'cards.html', context)


def checkout(request):
    
    if request.GET:
        
        # Declairing variables
        period = None
        saving = None
        price = None

        # Requiring Subscription payment form
        sub_form = SubForm()

        # Requiring all cards
        cards = Cards.objects.all()

        # Getting current GET request
        reqvst = request.GET['price']
        
        # Checking which card corespondings to request 
        for card in cards:
            if card.price == int(reqvst):
                period = card.duration
                saving = card.saving
                price = card.price

    
        context = {
            'sub_form': sub_form,
            'cards' : cards,
            'current_card' : {
                'period' : period,
                'saving' : saving,
                'price' : price,
            },
            'stripe_public_key' : 'pk_test_51IyeeiFgpxm4y9aBYzNrN1nmYnWxMAu0XfbciWIloDdMf2PTFIad0nhQOsiEjtmraUthF0yScT46GsnNp8XCgTi800usbn0gUR',
            'client_secret' : 'Test client secret',
        }

        return render(request, 'checkout.html', context)
    else:
        return redirect(reverse('cards'))
