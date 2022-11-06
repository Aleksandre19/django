from django.db import models
# Create your models here.

class ProfileCategories(models.Model):
    name = models.CharField(max_length=254, null=True, blank=True)
    icon = models.CharField(max_length=254, null=True, blank=True)

    def __str__(self):
        return self.name


class ProfileLinks(models.Model):
    name = models.CharField(max_length=254, null=True, blank=True)
    page = models.CharField(max_length=254, null=True, blank=True)
    icon = models.CharField(max_length=254, null=True, blank=True)
    slider_id = models.CharField(max_length=254, null=True, blank=True)
    show_home_page = models.BooleanField(default=False)
    category = models.ForeignKey('ProfileCategories', null=True, blank=True, on_delete=models.SET_NULL)
    

    def __str__(self):
        return self.name
