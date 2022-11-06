from django import template

register = template.Library()

@register.simple_tag
def slider_id(id):
    slider_id = None
    if id == "My List":
        slider_id = "my-list"
    elif id == "Liked Videos":
        slider_id = "diseases"
    return slider_id
