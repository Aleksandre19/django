from django.contrib import admin
from .models import ProfileCategories, ProfileLinks

# Register your models here.
class ProfileCategoriesAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'icon',
    )


class ProfileLinksAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'page',
        'icon',
        'slider_id',
        'show_home_page',
    )


admin.site.register(ProfileCategories, ProfileCategoriesAdmin)
admin.site.register(ProfileLinks, ProfileLinksAdmin)
