from django.shortcuts import render, redirect, reverse, get_object_or_404
from videos.models import Videos, MyList, Likes, Category
from videos.views import current_user_videos, get_videos_by_category
from subscription.views import check_users_subscription
from subscription.models import Cards
from feedbacks.models import Feedbacks
from django.contrib.auth.models import User
import random

# Create your views here.

# This function displayes content on the home page for
# both logged in and not logged in users


def index(request):

    if request.user.is_authenticated:

        # If a user is authenticated and has
        # subscription so displaying the content
        if check_users_subscription(request.user):
            
            # Defining variables
            mylist_videos = None
            videos = None
            videos_in_likes = None
            videos_in_mylist = None
            subscribed = None
            # Requiring categories
            categories = Category.objects.all()

            # Requiring a new video for home page ( Logged In User )
            day_videos = Videos.objects.filter(new_video=True)[:3]

            # Requiring videos from MyList module by user
            mylist_videos = MyList.objects.filter(user=request.user)
            # Requiring videos
            videos = Videos.objects.all()
            # Requiring videos from Likes and MyList modules by user
            videos_in_likes = current_user_videos(Likes, request.user)
            videos_in_mylist = current_user_videos(MyList, request.user)

            # Getting latest feedback
            feedback = Feedbacks.objects.order_by('date').last()
            
            """ This code adds videos in to the likes and mylist
                for the test user."""
            # Get user name
            test_user = request.user.username
            if test_user == 'testme':
                # Likes and mylist for test user.
                user_likes = Likes.objects.filter(user=request.user)   
                user_mylists = MyList.objects.filter(user=request.user)
               
                # Grab videos.
                testuser_videos = videos[:10]

                # Add videos in to the likes & mylists.
                if not user_likes or not user_mylists:
                    # Add in to the likes.
                    if not user_likes:
                        for video in random.choices(testuser_videos, k=3):
                            add_liked_video = Likes(user=request.user, video=video)
                            add_liked_video.save()

                    # Add in to the MyList.
                    if not user_mylists:
                        # Add videos in to the mylist.
                        for video in random.choices(testuser_videos, k=5):
                            add_mylist_video = MyList(user=request.user, video=video)
                            add_mylist_video.save()                        

            # Make a categories list.
            categories_list = []
            for category in categories:
                categories_list.append(category.name)
                context = {
                    'day_videos': day_videos,
                    'categories': categories,
                    'videos_by_categories': get_videos_by_category(Category, categories_list, all_categories=True
                                                                  ) if request.user.is_authenticated else None,
                    'mylist_videos': mylist_videos,
                    'videos': videos,
                    'videos_in_likes': videos_in_likes,
                    'videos_in_mylist': videos_in_mylist,
                    'subscribed': subscribed,
                    'feedback': feedback if request.user.is_authenticated else None,
                }
        # If a user has not subscription so
        # redirecting to the subscription plans page
        else:
            return redirect(reverse('cards'))
    # Then a user is not autheticated so
    # displaying the folowing content on the home page

    else:

        ''' Delete test user's likes and mylist '''
        # Grab test user
        testuser = User.objects.get(username='testme')
        # Delete likes  
        user_likes = Likes.objects.filter(user=testuser)
        user_likes.delete()
        # Delete mylist
        user_mylist = MyList.objects.filter(user=testuser)
        user_mylist.delete()

        # Require weilcoming videos for home page.
        welcoming_videos = Videos.objects.filter(welcoming=True)[:3]

        cards = Cards.objects.all()

        context = {
            'welcoming_videos': welcoming_videos,
            'cards': cards,
        }

    return render(request, 'home/index.html', context)

