from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from store.views import ProductViewSet, OrderViewSet, OrderCreateView, CategoryViewSet,AllProductsViewSet
from django.conf import settings
from django.conf.urls.static import static
from store.views_auth import RegisterView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # API Endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/orders/', OrderCreateView.as_view(), name='order-list-create'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('api/allproducts/', AllProductsViewSet.as_view({'get': 'list'}), name='all-products'),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

