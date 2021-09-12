from django.shortcuts import render, redirect, reverse
from videos.models import MyList, Videos, Likes
from videos.views import current_user_videos
from subscription.views import check_users_subscription

# Create your views here.


def users_profile(request):

    if request.user.is_authenticated:

        # If a user has a subscriptin so
        # displaying content
        if check_users_subscription(request.user):
        
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

        # If a user has not subscription so
        # redirecting to the subscrription plans page
        else:
            return redirect(reverse('cards'))

    else:
        return redirect(reverse('account_login'))


# Leave a feedbacks view
def leave_feedbacks(request):
    if request.user.is_authenticated:
        return render(request, 'profile_feedbacks.html')
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

