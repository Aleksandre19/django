from django.urls import path
from . import views

urlpatterns = [
    path('', views.users_profile, name='users_profile'),
    path('', views.profile_events, name='profile_events'),
    path('', views.liked_videos, name='liked_videos'),
    path('', views.watched_videos, name='watched_videos'),
    path('', views.playlists, name='playlists'),
    path('', views.profile_account, name='profile_account'),
    path('', views.profile_subscription, name='profile_subscription'),
    path('', views.user_logout, nema='user_logout'),
]
