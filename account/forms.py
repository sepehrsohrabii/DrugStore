
from django import forms
from django.contrib.auth.forms import UserCreationForm


from .models import User


class RegisterForm(UserCreationForm):
    name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    address = forms.CharField(max_length=30, required=False, help_text='Optional.')
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')

    class Meta:
        model = User
        fields = ('username', 'name', 'address', 'email', 'password1', 'password2',)
