from django.urls import path
from . import views

urlpatterns = [
    path('videos/', views.videos, name="videos"),
    path('singlevideo/<video_id>/', views.single_video, name="single_video"),
    path('action_buttons', views.action_buttons, name='action_buttons'),
]
