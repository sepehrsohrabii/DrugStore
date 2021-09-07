from django.urls import path
from . import views as gallery_view
from account import views as account_view
from cart import views as cart_view

app_name = 'gallery'

urlpatterns = [
    
    path('', gallery_view.CategoryList.as_view(), name='index'),
    path('about', gallery_view.about, name='about'),
    path('rahnama', gallery_view.rahnama, name='rahnama'),
    path('offer', gallery_view.OfferList.as_view(), name='offer'),
    path('books/<slug:cat_slug>', gallery_view.BookList.as_view(), name='books'),
    path('books/<slug:cat_slug>/<str:filter>', gallery_view.FilterResultsView.as_view(), name='books_filter'),
    path('search', gallery_view.SearchResultsView.as_view(), name='search_results'),

    path('login', account_view.Login.as_view(), name='login'),
    path('logout', account_view.Logout.as_view(), name='logout'),
    path('register', account_view.Register.as_view(), name='register'),

    path('api/<int:pk>/like_or_dislike', gallery_view.like_or_dislike, name='like_or_dislike'),
    path('api/<int:pk>/comment', gallery_view.comment, name='comment'),
    path('api/<int:pk>/star/<int:score>', gallery_view.star, name='star'),

    path('book/<slug:slug>', gallery_view.BookDetail.as_view(), name='detail'),

    path('shoppingcart', cart_view.OrderSummaryView.as_view(), name='shoppingcart'),
    path('cart/add/<int:id>/', cart_view.add_to_cart, name='cart_add'),
    
    path('cart/item_clear/<int:id>/', cart_view.remove_from_cart, name='item_clear'),

    path('cart/item_increment/<int:id>/', cart_view.add_to_cart, name='item_increment'),
    path('cart/item_decrement/<int:id>/', cart_view.remove_single_item_from_cart, name='item_decrement'),
    path('cart/cart-detail/', cart_view.OrderSummaryView.as_view(), name='cart_detail'),

    path('cart/history/', cart_view.OrderedCartList.as_view(), name='history'),


    path('request/', gallery_view.send_request, name='request'),
    path('verify/', gallery_view.verify, name='verify'),
]