from django.shortcuts import redirect, render, get_object_or_404
from django.contrib import messages
from django.views.generic import View, ListView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
from .models import Order, OrderItem
from gallery.models import Book

from django.utils import timezone
# Create your views here.


class OrderSummaryView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            context = {
                'object': order
            }
            return render(self.request, 'gallery/shoppingcart.html', context)
        except ObjectDoesNotExist:
            messages.warning(self.request, "شما سبد خرید فعال ندارید")
            return redirect("/")


class OrderedCartList(LoginRequiredMixin, ListView):
    model = Order
    def get_queryset(self):
        ordereds = Order.objects.filter(ordered=True)
        return ordereds
    
    ordering = ['start_date']
    template_name = 'gallery/ordered_list.html'


@login_required
def add_to_cart(request, id):
    item = get_object_or_404(Book, id=id)
    order_item, created = OrderItem.objects.get_or_create(
        item=item,
        user=request.user,
        ordered=False
    )
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item.quantity += 1
            order_item.save()
            messages.info(request, "تعداد این آیتم آپدیت شد.")
            return redirect("gallery:shoppingcart")
        else:
            order.items.add(order_item)
            messages.info(request, "این آیتم به سبد خرید شما اضافه شد.")
            return redirect("gallery:shoppingcart")
    else:
        ordered_date = timezone.now()
        order = Order.objects.create(
            user=request.user, ordered_date=ordered_date)
        order.items.add(order_item)
        messages.info(request, "این آیتم به سبد خرید شما اضافه شد.")
        return redirect("gallery:shoppingcart")


@login_required
def remove_from_cart(request, id):
    item = get_object_or_404(Book, id=id)
    slug = item.slug
    order_qs = Order.objects.filter(
        user=request.user,
        ordered=False
    )
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=slug).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            order.items.remove(order_item)
            order_item.delete()
            messages.info(request, "این آیتم از سبد خرید شما حذف شد.")
            return redirect("gallery:shoppingcart")
        else:
            messages.info(request, "این آیتم در سبد خرید شما موجود نمیباشد.")
            return redirect("gallery:detail", slug=slug)
    else:
        messages.info(request, "شما سبد خرید فعال ندارید.")
        return redirect("gallery:detail", slug=slug)


@login_required
def remove_single_item_from_cart(request, id):
    item = get_object_or_404(Book, id=id)
    slug = item.slug
    order_qs = Order.objects.filter(
        user=request.user,
        ordered=False
    )
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=slug).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            if order_item.quantity > 1:
                order_item.quantity -= 1
                order_item.save()
            else:
                order.items.remove(order_item)
            messages.info(request, "تعداد این آیتم آپدیت شد.")
            return redirect("gallery:shoppingcart")
        else:
            messages.info(request, "این آیتم در سبد خرید شما موجود نمیباشد")
            return redirect("gallery:detail", slug=slug)
    else:
        messages.info(request, "شما سبد خرید فعال ندارید.")
        return redirect("gallery:detail", slug=slug)
