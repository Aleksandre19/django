from django.contrib import admin
from .models import Subscription, Cards

# Register your models here.

class SubscriptionAdmin(admin.ModelAdmin):
    

    readonly_fields = ('sub_number',)


    fields = ('sub_number', 'user', 'card', 'price',
              'email', 'phone_number', 'start_date',
              'end_date', 'subscribed')


    list_display = ('email', 'user', 'sub_number',
                    'start_date', 'end_date', 'subscribed')
    

    ordering = ('email',)


class CardsAdmin(admin.ModelAdmin):
    fields = ('duration', 'price', 'saving', 'currency',
             'stripe_plan_id', 'description', 'offering','tab_class',
             'tab_aria',)


admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(Cards, CardsAdmin)
