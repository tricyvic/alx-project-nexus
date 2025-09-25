from rest_framework import serializers
from .models import Product, Order, OrderItem, Category

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='name', queryset=Category.objects.all(), allow_null=True, required=False)
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'address', 'items', 'created_at']  # no user field here

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        # automatically attach the logged-in user from the view context
        user = self.context['request'].user
        order = Order.objects.create(user=user, **validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

class OrderItemCreateSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product'
    )

    class Meta:
        model = OrderItem
        fields = ['product_id', 'quantity']

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemCreateSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        order = Order.objects.create(user=user, **validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order