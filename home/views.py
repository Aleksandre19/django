from django.shortcuts import render, redirect, reverse, get_object_or_404
from videos.models import Videos, MyList, Likes, Category
from videos.views import current_user_videos, get_videos_by_category
from subscription.views import check_users_subscription
from subscription.models import Cards
from feedbacks.models import Feedbacks

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
            new_video = Videos.objects.filter(new_video=True)[:1]

            # Requiring videos from MyList module by user
            mylist_videos = MyList.objects.filter(user=request.user)
            
            # Requiring videos
            videos = Videos.objects.all()
            
            # Requiring videos from Likes and MyList modules by user
            videos_in_likes = current_user_videos(Likes, request.user)
            videos_in_mylist = current_user_videos(MyList, request.user)

            # Getting latest feedback
            feedback = Feedbacks.objects.order_by('date').last()

            # Making a categories list
            categories_list = []
            for category in categories:
                categories_list.append(category.name)


            context = {
                
                'new_video' : new_video,
                'categories' : categories,
                'videos_by_categories' : get_videos_by_category(request, categories_list,
                                                                Category, without_get=True) 
                                                                if request.user.is_authenticated else None,
                'mylist_videos' : mylist_videos,
                'videos' : videos,
                'videos_in_likes' : videos_in_likes,
                'videos_in_mylist' : videos_in_mylist,
                'subscribed' : subscribed,
                'feedback' : feedback if request.user.is_authenticated else None,
            }
        # If a user has not subscription so
        # redirecting to the subscription plans page 
        else:
            return redirect(reverse('cards'))
    
    # Then a user is not autheticated so 
    # displaying the folowing content on the home page
    else:

        # Requiring a weilcoming videos for home page
        welcoming_videos = Videos.objects.filter(welcoming=True)[:3]

        cards = Cards.objects.all()

        context = {
            'welcoming_videos' : welcoming_videos,
            'cards' : cards,
        }

    return render(request, 'home/index.html', context)
