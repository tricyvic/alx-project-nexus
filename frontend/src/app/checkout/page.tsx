'use client';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    const items = cart.map(c => ({
      product_id: c.productId,
      quantity: c.quantity,
    }));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });

    if (res.ok) {
      clearCart();
      router.push('/orders'); // or show success
    } else {
      alert('Checkout failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-blue-600 text-white p-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
