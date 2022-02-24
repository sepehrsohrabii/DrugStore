from django.forms import ModelForm
from django import forms
from eshop_order.models import ShopCart, PostWay


class ShopCartForm(ModelForm):
    quantity = forms.CharField(widget=forms.NumberInput(), required=False)

    class Meta:
        model = ShopCart
        fields = ['quantity']


class PostWayForm(forms.Form):
    class Meta:
        model = PostWay
        fields = ['way']


class PayWayForm(forms.Form):
    pay_way = forms.CharField(widget=forms.RadioSelect)

class CouponForm(forms.Form):
    coupon_code = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'ثبت کد تخفیف', 'class': "cart-promo"}),
        label='کد تخفیف',
        required=False
    )