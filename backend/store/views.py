from rest_framework import viewsets, permissions , generics
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer, OrderCreateSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]  # public read

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]  # only logged-in


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]  # require login

    def get_serializer_context(self):
        # ensures request is in serializer.context so we can get request.user
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context