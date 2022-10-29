"""
    Checking if a user has already subscribed and
    displaying a links Subscription or videos in the top main manu accordingly
"""

# Importing necessary modules
from django import template
from subscription.models import Subscription


# Registering django template library
register = template.Library()


# Checking to see if a logged in user
# already has subscription
@register.simple_tag
def check_subscription(user_id):
    subscribed = None
    subscription =  Subscription.objects.filter(user=int(user_id)) 
    for sub in subscription:
        subscribed = sub.subscribed
    return subscribed


@register.simple_tag
def current_page(url=""): 
    if "/" in url:
        current_page = url.strip("/").split("/")[-1]
        return current_page
