from django.shortcuts import render

# Create your views here.

def cards(request):
    return render(request, 'cards.html')
