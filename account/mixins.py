from django.shortcuts import redirect, get_object_or_404
from django.http import Http404

from gallery.models import Book

class LoggedInRedirectMixin():
	def dispatch(self, request, *args, **kwargs):
		if request.user.is_authenticated:
			return redirect('gallery:index')
		return super().dispatch(request, *args, **kwargs)


class AccessUserMixin():
	def dispatch(self, request, pk, *args, **kwargs):
		book = get_object_or_404(Book, pk=pk)
		if book.user == request.user:
			return super().dispatch(request, *args, **kwargs)
		else:
			raise Http404("You can't see this page")