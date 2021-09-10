from django import forms
from .models import Subscription

""""
    This code is copied from Boutique Ado project
    and it is modified.
"""

class SubForm(forms.ModelForm):
    class Meta:
        model = Subscription
        fields = ('full_name', 'email', 'phone_number')
                    
        

        def __init__(self, *args, **kwargs):

            """
            Add placeholders and classes, remove auto-generated
            labels and set autofocus on first field
            """    
            
            super().__init__(*args, **kwargs)
            placeholders = {
                'full_name': 'Full Name',
                'email': 'Email Address',
                'phone_number': 'Phone Number',
            }

            self.fields['full_name'].widget.attrs['autofocus'] = True
            for field in self.fields:
                if field != 'country':
                    if self.fields[field].required:
                        placeholder = f'{placeholders[field]} *'
                    else:
                        placeholder = placeholders[field]
                    self.fields[field].widget.attrs['placeholder'] = placeholder
                self.fields[field].widget.attrs['class'] = 'stripe-style-input'
                self.fields[field].label = False