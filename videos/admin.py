from django.contrib import admin
from .models import Category, Videos

# Register your models here.

class VideosAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'content',
        'description',
        'watched',
        'published',
        'platform',
        'my_list_section',
        'new_video',
        'by_anatomy',
        'by_diseases',
        'by_subjects',
        'by_projects',
        'welcoming',

    )

    ordering = ('title',)


class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'friendly_name',
        'name',
    )

admin.site.register(Category, CategoryAdmin)
admin.site.register(Videos, VideosAdmin)
