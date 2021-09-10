""""
    After clicking on the links located in the sidebar of the video's page,
    catching URL of that and parssing it to get clear subject name.
    Using this clear subject name in the side menu to hilight current subject's name
    which was clicked. 
"""

# Importing template library
from django import template


# Installing template library
register = template.Library()


# Creating a simple tag and parssing a current URL
@register.simple_tag
def current_subj_name(url=''):
    if "=" in url:
        subject_url = url.split('=')[1]
        return subject_url

