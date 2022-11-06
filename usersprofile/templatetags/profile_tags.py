from django import template
from videos.views import Likes, MyList


register = template.Library()


@register.simple_tag
def counted_videos(page='', user=None):
    counted = None
    if page != '':
        if page == 'liked':
            counted = Likes.objects.filter(user=user)
        if page == 'mylist':
            counted = MyList.objects.filter(user=user)
        return counted