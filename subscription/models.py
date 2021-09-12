from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Subscription(models.Model):
    sub_number = models.CharField(max_length=32, null=False, editable=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='subscriptions')
    card = models.ForeignKey('Cards', on_delete=models.SET_NULL, null=True, blank=True)
    full_name = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(max_length=254, null=False, blank=False)
    phone_number = models.CharField(max_length=20, null=False, blank=False)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    subscribed = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, default=0)

    def __str__(self):
        return self.email


# Subscription plans model
class Cards(models.Model):
    duration = models.CharField(max_length=20, null=True, blank=True)
    currency = models.CharField(max_length=10, null=True, blank=True, default='EUR')
    description = models.CharField(max_length=100, null=False, blank=False)
    stripe_plan_id = models.CharField(max_length=254, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=0, null=False, blank=False, default=0)
    saving = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, default=0)
    offering = models.BooleanField(default=False)
    tab_class = models.CharField(max_length=20, null=True, blank=True)
    tab_aria = models.CharField(max_length=30, null=True, blank=True)

    def __str__(self):
        return self.duration

