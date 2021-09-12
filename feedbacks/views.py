from django.shortcuts import render, redirect, reverse
from django.contrib import messages
from .models import Feedbacks
import datetime


# Create your views here.
def add(request):
    # If  the user is authenticated
    if request.user.is_authenticated:
        # If POST method exists
        if request.POST:
            # Catching feedback's text
            feedback_text = request.POST['feedback_text']
            # Defining feedbacks model
            feedbacks = Feedbacks(
                user=request.user,
                text=feedback_text,
                date=datetime.datetime.now(),
                avatar='',
            )
            # Saving  feedbacks model
            feedbacks.save()

            # Giving a successfully message to the user
            messages.success(request, 'Thank you! Your feedback has been added successfully')

        return redirect(reverse('leave_feedbacks'))

    else:
        return redirect(reverse('account_login'))

