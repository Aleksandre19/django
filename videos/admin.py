from django.contrib import admin
from .models import Category, Videos, Subjects, Likes, MyList

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
        'welcoming',

    )

    ordering = ('title',)


class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'friendly_name',
        'name',
    )


class SubjectsAdmin(admin.ModelAdmin):
    list_display = (
        'friendly_name',
        'name',
    )


class LikesAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'video',
    )


class MyListAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'video',
    )


admin.site.register(Category, CategoryAdmin)
admin.site.register(Videos, VideosAdmin)
admin.site.register(Subjects, SubjectsAdmin)
admin.site.register(Likes, LikesAdmin)
admin.site.register(MyList, MyListAdmin)
