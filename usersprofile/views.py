from django.shortcuts import render, redirect, reverse


# Create your views here.


def users_profile(request):
    if request.user.is_authenticated:
        return render(request, 'users_profile.html')
    else:
        return redirect(reverse('account_login'))

def profile_events(request):
    if request.user.is_authenticated:
        return render(request, 'events_profile.html')
    else:
        return redirect(reverse('account_login'))


def liked_videos(request):
    if request.user.is_authenticated:
        return render(request, 'liked_videos.html')
    else:
        return redirect(reverse('account_login'))


def watched_videos(request):
    if request.user.is_authenticated:
        return render(request, 'watched_videos.html')
    else:
        return redirect(reverse('account_login'))


def playlists(request):
    if request.user.is_authenticated:
        return render(request, 'playlists.html')
    else:
        return redirect(reverse('account_login'))


def profile_account(request):
    if request.user.is_authenticated:
        return render(request, 'profile_account.html')
    else:
        return redirect(reverse('account_login'))


def profile_subscription(request):
    if request.user.is_authenticated:
        return render(request, 'profile_subscription.html')
    else:
        return redirect(reverse('account_login'))

