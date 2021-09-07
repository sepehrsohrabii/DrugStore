from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import CreateView, ListView, DeleteView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from account.forms import RegisterForm
from account.mixins import LoggedInRedirectMixin, AccessUserMixin

from gallery.models import Book


from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


class Login(LoggedInRedirectMixin, LoginView):
    pass

class Logout(LoginRequiredMixin, LogoutView):
    pass

class Register(LoggedInRedirectMixin, CreateView):
    form_class = RegisterForm
    template_name = 'registration/register.html'
    success_url = reverse_lazy('gallery:login')
