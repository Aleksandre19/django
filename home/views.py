from django.shortcuts import render, get_object_or_404
from videos.models import Videos

# Create your views here.


def index(request):

    
    welcoming_videos = Videos.objects.filter(welcoming=True)[:3]
    new_video = Videos.objects.filter(new_video=True)[:1]

    context = {
        'welcoming_videos' : welcoming_videos,
        'new_video' : new_video,
    }

    return render(request, 'home/index.html', context)
