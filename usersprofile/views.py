from django.shortcuts import render

# Create your views here.


def users_profile(request):
    return render(request, 'users_profile.html')


def profile_events(request):
    return render(request, 'events_profile.html')


def liked_videos(request):
    return render(request, 'liked_videos.html')


def watched_videos(request):
    return render(request, 'watched_videos.html')


def playlists(request):
    return render(request, 'playlists.html')

