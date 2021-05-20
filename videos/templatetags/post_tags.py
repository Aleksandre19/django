from django.shortcuts import render, redirect
from django import template
from django.http import HttpRequest
# from ..models import Subjects
# import requests


register = template.Library()


@register.simple_tag
def current_subj_name(url=''):
    if "=" in url:
        subject_url = url.split('=')[1]
        return subject_url
    


# Grabbing a subject's title from get request
# to change a style for current selected title
# @register.inclusion_tag('post_tags.html')
# def subjects_url(full_link=''):
#     subject_url = full_link.split('=')[1]
#     subjects = Subjects.objects.all()
#     context = {
#         'subject_url' : subject_url,
#         'subjects' : subjects,
#     }
#     return context