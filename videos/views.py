from django.shortcuts import render, redirect, reverse, get_object_or_404
from .models import Videos, Category, Subjects, Likes, MyList
from django.db.models import Count, Sum
from django.contrib.auth.models import User
import math
# from django.views.generic.edit import CreateView

# Create your views here.

def videos(request):

    ''' Checking to see if user is already athenticcated '''
    if request.user.is_authenticated:  
        # All Videos
        videos = Videos.objects.all()
        # All Subjects
        subjects = Subjects.objects.all().annotate(posts_count=Count('videos'))
        # All Categories
        categories = Category.objects.all()
        
        # Defining variables
        categorased = None
        videos_by_subjects = None
        videos_by_categories = None
   

        if request.GET:
            # Getting a videos by a category
            if 'category' in request.GET:
                categorased = request.GET['category'].split(',')
                # videos = videos.filter(category__name__in=categorased)
                videos_by_categories = Category.objects.filter(name__in=categorased)

            # Getting a videos by a Subjects
            if 'subject' in request.GET:
                categorased = request.GET['subject'].split(',')
                # videos = videos.filter(subjects__name__in=categorased)
                videos_by_subjects = Subjects.objects.filter(name__in=categorased)


        context = {
            'videos' : videos,
            'categories' : categories,
            'subjects' : subjects,
            'videos_by_categories' : videos_by_categories,
            'videos_by_subjects' : videos_by_subjects,
            'videos_in_likes' : current_user_videos(Likes, request.user),
            'videos_in_mylist' : current_user_videos(MyList, request.user),
            
        }

        return render(request, 'videos/index.html', context)
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






    