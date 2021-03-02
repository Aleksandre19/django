from django.shortcuts import render, redirect, reverse
# Create your views here.


def videos(request):
    if request.user.is_authenticated:
        # if request.method == 'GET':
        #     next = request.GET.get('next', '')
        #     return render(request, '%s/index.html'%(next))
        return render(request, 'videos/index.html')
    else:
        return redirect(reverse('account_login'))    


def single_video(request):
    if request.user.is_authenticated:
        return render(request, 'videos/single_video.html')
    else:
        return redirect(reverse('account_login'))    