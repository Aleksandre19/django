from django.urls import path
from . import views

urlpatterns = [
    path('cards/', views.cards, name='cards'),
    path('checkout', views.checkout, name='checkout'),
]