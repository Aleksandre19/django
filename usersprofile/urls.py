from django.urls import path
from . import views

urlpatterns = [
    path('usersprofile/', views.users_profile, name='users_profile'),
    path('profileaccount/', views.profile_account, name='profile_account'),
    path('profilesubscription/', views.profile_subscription, name='profile_subscription'),
    path('userlogout/', views.user_logout, name="user_logout"),
    path('leavefeedbacks',  views.leave_feedbacks, name='leave_feedbacks'),
]
