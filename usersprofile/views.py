from django.shortcuts import render, redirect, reverse
from videos.models import MyList, Likes
from .models import ProfileCategories, ProfileLinks
from videos.views import current_user_videos
from subscription.views import check_users_subscription

# Create your views here.


def users_profile(request, page='home'):

    if request.user.is_authenticated:

        # If a user has a subscriptin so
        # displaying content
        if check_users_subscription(request.user):

            account = False
            subscription = False

            categories = ProfileCategories.objects.all()
            subcategories = ProfileLinks.objects.all()

            # Grab content by likes and mylist
            videos_in_likes = current_user_videos(Likes, request.user)
            videos_in_mylist = current_user_videos(MyList, request.user)

            # content for mylist and liked videos
            actions = {
                'liked': videos_in_likes,
                'mylist': videos_in_mylist,
            }

            context = {
                'categories': categories,
                'subcategories': subcategories,
                'actions': actions,
                'page': page,
                "account": account,
                "subscription": subscription,
            }

            return render(request, "users_profile.html", context)

        # If a user has not subscription so
        # redirecting to the subscrription plans page
        else:
            return redirect(reverse("cards"))

    else:
        return redirect(reverse("account_login"))


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

