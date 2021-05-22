from django.shortcuts import render, redirect, reverse, get_object_or_404
from .models import Videos, Category, Subjects
from django.db.models import Count

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
                videos = videos.filter(category__name__in=categorased)
                videos_by_categories = Category.objects.filter(name__in=categorased)
            # Getting a videos by a Subjects
            if 'subject' in request.GET:
                categorased = request.GET['subject'].split(',')
                videos = videos.filter(subjects__name__in=categorased)
                videos_by_subjects = Subjects.objects.filter(name__in=categorased)


        context = {
            'videos' : videos,
            'categories' : categories,
            'subjects' : subjects,
            'videos_by_categories' : videos_by_categories,
            'videos_by_subjects' : videos_by_subjects,
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
        }
        
        return render(request, 'videos/single_video.html', context)
    else:
        return redirect(reverse('account_login'))








    