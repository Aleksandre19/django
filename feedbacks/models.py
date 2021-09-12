from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Feedbacks(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    text = models.TextField()
    date = models.DateTimeField()
    avatar = models.CharField(max_length=255, default='')

    def __str__(self):
        return self.user.username

