from django.contrib import admin
from .models import OrderItem, Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ['user',
                    'ordered',
                    'being_delivered',
                    'received',
                    'ordered_price',
                    'start_date',
                    ]
    list_display_links = [
        'user',
        'ordered_price',
    ]
    list_filter = ['ordered',
                   'start_date',
                   'being_delivered',
                   'received',
                   'ordered_price',
    ]
    search_fields = [
        'user__username',
    ]


admin.site.register(OrderItem)
admin.site.register(Order, OrderAdmin)
