from django.urls import path
from . import views

urlpatterns = [
    path('cards/', views.cards, name='cards'),
    path('checkout/', views.checkout, name='checkout'),
    path('success/', views.sub_success, name='success'),
    path('cancel/', views.sub_cancel, name='cancel'),
]