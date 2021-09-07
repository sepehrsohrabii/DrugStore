from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from zeep import Client
from .models import Book, Comment, Star, Category
from cart.models import Order

from django.shortcuts import render
# from django.views.generic import ListView
from django.db.models import Q

# Create your views here.


class SearchResultsView(ListView):
    model = Book
    template_name = 'gallery/search.html'
    context_object_name = 'products'

    def get_queryset(self):
        query = self.request.GET.get('search')
        products=Book.objects.filter(Q(name__icontains=query)|Q(author__icontains=query)|Q(description__icontains=query))
        return products
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["search"] = self.request.GET.get('search')
        return context
    ordering = ['-created']
    paginate_by = 12


class FilterResultsView(ListView):
    model = Book
    template_name = 'gallery/book_list_filter.html'

    def get_queryset(self):
        global cat
        global filter_name
        slug = self.kwargs.get('cat_slug')
        filter_name = self.kwargs.get('filter')
        cat = get_object_or_404(Category, slug=slug)

        if filter_name == 'newest':
            cat_filter_books = Book.objects.filter(category=cat).order_by('-created')
        elif filter_name == 'cheapest':
            cat_filter_books = sorted(Book.objects.filter(category=cat), key=lambda a: a.get_book_offer_price)
        elif filter_name == 'starest':
            cat_filter_books = sorted(Book.objects.filter(category=cat), key=lambda a: a.get_avg_stars_percent, reverse=True)
        return cat_filter_books

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["category"] = cat
        context["filter"] = filter_name
        return context
    
    paginate_by = 12


# def items(request):
#     items = Book.objects.all()
#     return items


def about(request):
    return render(request, 'gallery/about.html')

def rahnama(request):
    return render(request, 'gallery/rahnama.html')

class CategoryList(ListView):
    model = Category
    template_name = 'gallery/index.html'


# class AboutList(ListView):
#     model = Category
#     template_name = 'gallery/about.html'


# class RahnamaList(ListView):
#     model = Category
#     template_name = 'gallery/rahnama.html'

# class ShoppingCart(ListView):
#     model = Book
#     template_name = 'gallery/shoppingcart.html'


class OfferList(ListView):
    model = Book
    template_name = 'gallery/offer.html'
    def get_queryset(self):
        offer_books = Book.objects.filter(Q(offer=True)|Q(percent__gt=0))
        return offer_books
    paginate_by = 12
    ordering = ['-created']


class BookList(ListView):
    model = Book

    def get_queryset(self):
        global cat
        slug = self.kwargs.get('cat_slug')
        cat = get_object_or_404(Category, slug=slug)
        cat_books = Book.objects.filter(category=cat)
        return cat_books

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["category"] = cat
        return context

    paginate_by = 12
    ordering = ['-created']


class BookDetail(DetailView):

    def get_object(self):
        slug = self.kwargs.get('slug')
        return get_object_or_404(Book, slug=slug)


# @login_required
def like_or_dislike(request, pk):
    # print(request.resolver_match)
    user = request.user
    comment = get_object_or_404(Comment, pk=pk)
    comment_likes_users = comment.likes.all()
    count = comment_likes_users.count()

    if user.is_anonymous:
        return JsonResponse({
            'likes': count,
            'status': 'not_login',
        })

    if user in comment_likes_users:
        comment.likes.remove(user)
        count -= 1
        user_in_likes = False
    else:
        comment.likes.add(user)
        count += 1
        user_in_likes = True

    return JsonResponse({
        'status': user.is_authenticated,
        'likes': count,
        'user_in_likes': user_in_likes,
    })


def comment(request, pk):
    # print(request.resolver_match)
    user = request.user
    book = get_object_or_404(Book, pk=pk)

    # print(request)

    if user.is_anonymous:
        return JsonResponse({
            'status': 'not_login',
        })
    content = request.POST.get('content')
    if content == '':
        return JsonResponse({
            'status': 'bad_content',
        })
    Comment.objects.create(
        user=user,
        book=book,
        content=content
    )
    book_comments = book.comments.all()
    count = book_comments.count()

    all_comments = []
    for cmmnt in book_comments:
        likers = cmmnt.likes.all()
        like_count = likers.count()
        user_in_likes = user in likers
        all_comments.append({'created': cmmnt.created_date, 'username': cmmnt.user.username, 'content': cmmnt.content,
                             'like_count': like_count, 'user_in_likes': user_in_likes, 'pk': cmmnt.pk})

    return JsonResponse({
        'status': user.is_authenticated,
        'count': count,
        'user': user.username,
        'book_comments': all_comments
    })


def star(request, pk, score):
    # print(request.resolver_match)
    user = request.user
    book = get_object_or_404(Book, pk=pk)

    book_stars = Star.objects.filter(book=book)
    book_stars_users = [bs.user for bs in book_stars]
    book_stars_scores = [bs.score for bs in book_stars]

    if len(book_stars) == 0:
        avg = 0
    else:
        avg = sum(book_stars_scores) / len(book_stars)
    avg = int((avg / 5) * 100)

    if user.is_anonymous:
        return JsonResponse({
            'avg': avg,
            'status': 'not_login',
        })
    if score not in [0, 1, 2, 3, 4, 5]:
        return JsonResponse({
            'avg': avg,
            'status': 'bad_content',
        })

    user_in_stars = True
    if user in book_stars_users:
        user_index = book_stars_users.index(user)
        book_stars_scores[user_index] = score
        Star.objects.filter(user=user, book=book).update(score=score)
    else:
        Star.objects.create(
            user=user,
            book=book,
            score=score
        )
        book_stars_users.append(user)
        book_stars_scores.append(score)

    avg = sum(book_stars_scores) / len(book_stars_users)
    avg = int((avg / 5) * 100)
    return JsonResponse({
        'status': user.is_authenticated,
        'avg': avg,
        'user_in_stars': user_in_stars,
        'user_score': score
    })


###zarinpal###

MERCHANT = 'aaaaasssdfghjkliuytrfghhbhnhgfdsdedf'
client = Client('https://sandbox.zarinpal.com/pg/services/WebGate/wsdl')
#amount = 1000  # Toman / Required

description = "توضیحات مربوط به تراکنش را در این قسمت وارد کنید"  # Required
email = 'email@example.com'  # Optional
mobile = '09123456789'  # Optional
CallbackURL = 'http://localhost:8000/verify/' # Important: need to edit for realy server.

@login_required
def send_request(request):
    cart_id = int(request.POST.get('cart_id'))
    order = get_object_or_404(Order, pk=cart_id)
    amount = order.get_total()
    email = request.user.email
    result = client.service.PaymentRequest(MERCHANT, amount, description, email, mobile, '{}?cartid={}'.format(CallbackURL, cart_id))
    if result.Status == 100:
        return redirect('https://sandbox.zarinpal.com/pg/StartPay/' + str(result.Authority))
    else:
        return HttpResponse('Error code: ' + str(result.Status))

@login_required
def verify(request):
    print(request.GET)
    cart_id = int(request.GET.get('cartid'))
    order = get_object_or_404(Order, pk=cart_id)
    amount = order.get_total()
    if request.GET.get('Status') == 'OK':
        result = client.service.PaymentVerification(MERCHANT, request.GET['Authority'], amount)
        if result.Status == 100:
            order.ordered = True
            order.ordered_price = amount
            order.save()
            return render(request, 'gallery/verify.html', context={'result': str(result.RefID), 'status': True})
        elif result.Status == 101:
            return render(request, 'gallery/verify.html', context={'result': str(result.Status), 'status': False})
        else:
            return render(request, 'gallery/verify.html', context={'result': str(result.Status), 'status': False})
    else:
        return render(request, 'gallery/verify.html')
