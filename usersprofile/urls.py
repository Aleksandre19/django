from django.urls import path
from . import views

urlpatterns = [
    path('', views.users_profile, name='users_profile'),
    path('', views.profile_events, name='profile_events'),
    path('', views.liked_videos, name='liked_videos'),
    path('', views.watched_videos, name='watched_videos'),
    path('', views.playlists, name='playlists'),
]
