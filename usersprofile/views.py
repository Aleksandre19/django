from django.shortcuts import render, redirect, reverse
from videos.models import MyList, Videos, Likes
from videos.views import current_user_videos

# Create your views here.


def users_profile(request):

    if request.user.is_authenticated:
        
        user_videos = None

        # Requiring videos 
        if request.GET:
            # MyList videos by user
            if request.GET['action'] == 'mylist':
                user_videos = MyList.objects.filter(user=request.user)
            # Likes videos by user
            if request.GET['action'] == 'liked':
                user_videos = Likes.objects.filter(user=request.user)

        # Requiring videos
        videos = Videos.objects.all()

        # Requiring videos from Likes and MyList modules by user
        videos_in_likes = current_user_videos(Likes, request.user)
        videos_in_mylist = current_user_videos(MyList, request.user)

        context = {
            'user_videos' : user_videos,
            'videos' : videos,
            'videos_in_likes' : videos_in_likes,
            'videos_in_mylist' : videos_in_mylist,
        }

        return render(request, 'users_profile.html', context)

    else:
        return redirect(reverse('account_login'))


def profile_events(request):
    if request.user.is_authenticated:
        return render(request, 'events_profile.html')
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


def user_logout(request):
    return redirect(reverse('account_logout'))

