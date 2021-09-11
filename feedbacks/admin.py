from django.contrib import admin
from .models import Feedbacks

# Register your models here.

class FeedbacksAdmin(admin.ModelAdmin):
    fields = ('user', 'text', 'date', 'avatar')

    list_display = ('date', 'user', 'text', 'avatar')

    ordering = ('date',)


admin.site.register(Feedbacks, FeedbacksAdmin)
