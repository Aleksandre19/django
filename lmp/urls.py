"""lmp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from usersprofile import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('', include('home.urls')),
    path('videos/', include('videos.urls')),
    path('single/', include('videos.urls')),
    path('usersprofile/', views.users_profile, name='users_profile'),
    path('profileevents/', views.profile_events, name='profile_events'),
    path('likedvideos/', views.liked_videos, name='liked_videos'),
    path('watchedvideos/', views.watched_videos, name='watched_videos'),
    path('playlists/', views.playlists, name='playlists'),
    path('profileaccount/', views.profile_account, name='profile_account'),
    path('profilesubscription/', views.profile_subscription, name='profile_subscription'),
    path('contact/', include('contact.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
