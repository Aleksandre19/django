from django.shortcuts import render, redirect, reverse
from .forms import SubForm

# Create your views here.

def cards(request):
    return render(request, 'cards.html')


def checkout(request):
    
    if request.GET:
        
        price = request.GET['price']

        if not price:
            price = 0

        sub_form = SubForm()

        context = {
            'sub_form': sub_form,
            'price' : price,
        }

        return render(request, 'checkout.html', context)
    else:
        return redirect(reverse('cards'))
