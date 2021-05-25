from django.shortcuts import render, get_object_or_404
from videos.models import Videos, MyList, Likes, Category
from videos.views import current_user_videos, get_videos_by_category

# Create your views here.


def index(request):

    # Defining variables
    mylist_videos = None
    videos = None
    videos_in_likes = None
    videos_in_mylist = None
    
    # Requiring categories
    categories = Category.objects.all()

    # Requiring a weilcoming videos for home page
    welcoming_videos = Videos.objects.filter(welcoming=True)[:3]
    # Requiring a new video for home page ( Logged In User )
    new_video = Videos.objects.filter(new_video=True)[:1]

    if request.user.is_authenticated:

        # Requiring videos from MyList module by user
        mylist_videos = MyList.objects.filter(user=request.user)
        # Requiring videos
        videos = Videos.objects.all()
        
        # Requiring videos from Likes and MyList modules by user
        videos_in_likes = current_user_videos(Likes, request.user)
        videos_in_mylist = current_user_videos(MyList, request.user)

        # Making a categories list
        categories_list = []
        for category in categories:
            categories_list.append(category.name)


    context = {
        'welcoming_videos' : welcoming_videos,
        'new_video' : new_video,
        'categories' : categories,
        'videos_by_categories' : get_videos_by_category(request, categories_list,
                                                         Category, without_get=True) 
                                                         if request.user.is_authenticated else None,
        'mylist_videos' : mylist_videos,
        'videos' : videos,
        'videos_in_likes' : videos_in_likes,
        'videos_in_mylist' : videos_in_mylist,
    }

    return render(request, 'home/index.html', context)
