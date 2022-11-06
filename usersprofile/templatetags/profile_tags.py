from django import template
from videos.views import Likes, MyList


register = template.Library()

@register.simple_tag
def current_page(url=''):
    if '=' in url:
        current_url = url.split('=')[1]
        return current_url


@register.simple_tag
def slider_id(id):
    slider_id = None
    if id == "My List":
        slider_id = "my-list"
    elif id == "Liked Videos":
        slider_id = "diseases"
    return slider_id


@register.simple_tag
def counted_videos(page='', user=None):
    counted = None
    if page != '':
        if page == 'liked':
            counted = Likes.objects.filter(user=user)
        if page == 'mylist':
            counted = MyList.objects.filter(user=user)
        return counted