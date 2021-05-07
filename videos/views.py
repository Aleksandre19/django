from django.shortcuts import render, redirect, reverse
from .models import Videos, Category
# Create your views here.


def videos(request):
    if request.user.is_authenticated:
        
        videos = Videos.objects.all()
        categories = Category.objects.all()

        context = {
            'videos' : videos,
            'categories' : categories,
        }

        return render(request, 'videos/index.html', context)
    else:
        return redirect(reverse('account_login'))    


def single_video(request):
    if request.user.is_authenticated:
        return render(request, 'videos/single_video.html')
    else:
        return redirect(reverse('account_login'))    