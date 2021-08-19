from django.shortcuts import render, redirect, reverse, get_object_or_404
from .models import Videos, Category, Subjects, Likes, MyList
from subscription.views import  check_users_subscription
from django.db.models import Count, Q
from django.contrib import messages
# from django.contrib.auth.models import User
# import math
# from django.views.generic.edit import CreateView

# Create your views here.

def videos(request):

    ''' Checking to see if user is already athenticcated '''
    if request.user.is_authenticated:

        # Check to see if a user has a subscription
        
        # If a user has subscription so showing the videos
        if check_users_subscription(request.user):
            # All Videos
            videos = Videos.objects.all()
            # All Subjects
            subjects = Subjects.objects.all().annotate(posts_count=Count('videos'))
            # All Categories
            categories = Category.objects.all()

            search_results = None

            # Videos search query
            if request.GET:
                if 'search' in request.GET:
                    query = request.GET['search']

                    # If there is not search criteria displaying message
                    if not query:
                        messages.error(request, "You didn't enter any search criteri! ")
                        return redirect(reverse('videos'))
                    
                    queries = Q(title__icontains=query) | Q(description__icontains=query)
                    search_results = videos.filter(queries)

            context = {
                'videos' : videos,
                'categories' : categories,
                'subjects' : subjects,
                'videos_by_categories' : get_videos_by_category(request, 'category', Category),
                'videos_by_subjects' : get_videos_by_category(request, 'subject', Subjects),
                'videos_in_likes' : current_user_videos(Likes, request.user),
                'videos_in_mylist' : current_user_videos(MyList, request.user),
                'search_results' : search_results,
                
            }

            return render(request, 'videos/index.html', context)

        # If a user doesn't have subscription so
        # redirecting to the subscription's plans page
        else:
            return redirect(reverse('cards'))

    else:
        return redirect(reverse('account_login'))    


# A single video page function
def single_video(request, video_id):

    if request.user.is_authenticated:
        
        videos = Videos.objects.all()

        single_video = get_object_or_404(Videos, pk=video_id)

        same_videos = videos.filter(subjects = single_video.subjects)

        context = {
            'single_video' : single_video,
            'same_videos' : same_videos,
            'videos_in_likes' : current_user_videos(Likes, request.user),
            'videos_in_mylist' : current_user_videos(MyList, request.user),
        }
        
        return render(request, 'videos/single_video.html', context)
    else:
        return redirect(reverse('account_login'))


# This function makes a likes and
# adds a vidoe in the user's mylist
def action_buttons(request):
    # Checking a user's authentication status
    if request.user.is_authenticated:
        
        # If ther is a GET
        if request.GET:
            if request.GET['action']:
                # Getting a action description
                action = request.GET['action']
                # Getting a current video ID
                video_id = request.GET['video_id']
                # Getting the current user
                user = request.user 
                # Gettiing the current vidoe from videos
                current_video = get_object_or_404(Videos, pk=video_id)
                

                # If a action is a like
                if action == 'like':
                    # Getting all videos from likes
                    likes = Likes.objects.all()
                
                    # Chekcing current video in likes
                    current_post = likes.filter(user=user.id, video=current_video.id)
                    
                    # If there is not current video so adding in the Likes table
                    if not current_post:  
                        create_video = Likes(user=user, video=current_video)
                        create_video.save()

                        # Updating the like filed's value in Videos module
                        liked_video = get_object_or_404(Videos, id=video_id)
                        if liked_video.liked is not None:
                            liked_video.liked  = liked_video.liked + 1
                        else:
                            liked_video.liked = 1

                        liked_video.save()
                   
                    


                # Adding a  video to the user's list
                if action == 'mylist':

                    # Getting all videos from mylist
                    mylists = MyList.objects.all()

                    # Chekcing current video in likes
                    current_post = mylists.filter(user=user.id, video=current_video.id)
                    
                    # If there is not current video so adding in the Likes table
                    if not current_post:  
                        create_video = MyList(user=user, video=current_video)
                        create_video.save()
                          

            # Returnig a page back
            if request.GET['page_url']:
                page_url = request.GET['page_url']
                return redirect(page_url)

    else:
        return redirect(reverse('account_login')) 



""" Heliping Functions """

# Getting Videos from Likes and MyList module
# for current user
def current_user_videos(obj, user):
    # Get all videos likes
    user_videos = obj.objects.filter(user=user)
    user_videos_list = []
    for user_video in user_videos:
        user_videos_list.append(user_video.video)
    return user_videos_list


# Grabbing videos by category and subjects
def get_videos_by_category(request, categories_list, obj, without_get=False):

    categorased = None
    videos_by_categories = None

    # Getting a videos by a category
    if request.GET:
        if categories_list in request.GET:
            categorased = request.GET[categories_list].split(',')
            # videos = videos.filter(category__name__in=categorased)
            videos_by_categories = obj.objects.filter(name__in=categorased)
            
    # If query comes without GET request
    if without_get:
        categories_list = categories_list
        videos_by_categories = Videos.objects.filter(category__name__in=categories_list)


    return videos_by_categories
    






    