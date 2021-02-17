from django.shortcuts import render
# Create your views here.


def videos(request):
    return render(request, 'videos/index.html')