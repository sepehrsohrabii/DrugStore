from django.contrib import admin
from django.urls import path, include

from didikala import settings
from django.conf.urls.static import static

from didikala.views import home_page, header, footer
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from azbankgateways.urls import az_bank_gateways_urls
from eshop_payments.views import go_to_gateway_view, callback_gateway_view

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('header', header, name="header"),
    path('footer', footer, name="footer"),
    path('', home_page, name='home'),

    path('', include('eshop_account.urls')),
    path('', include('eshop_contact.urls')),
    path('', include('eshop_order.urls')),
    path('', include('eshop_setting.urls')),
    path('', include('eshop_product.urls')),


    # REST FRAMEWORK URLS
    path('api/', include('eshop_product.api.urls')),
    path('api/', include('eshop_order.api.urls')),
    path('api/', include('eshop_account.api.urls')),
    path('api/', include('eshop_comment.api.urls')),
    path('api/', include('eshop_contact.api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    # path('api/account/', include('eshop_account.api.urls')),
    # path('api-auth/', include('rest_framework.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # dargah Pardakht
    path('bankgateways/', az_bank_gateways_urls()),
    path('go-to-gateway/', go_to_gateway_view, name="go-to-gateway"),
    path('callback-gateway/', callback_gateway_view),

]

if settings.DEBUG:
    # add root static files
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # add media static files
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
