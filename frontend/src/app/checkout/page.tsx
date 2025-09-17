'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Layout from '@/components/Layout';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const body = {
        address,
        items: cart.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
      };

      console.log('Posting order:', body);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log('Order response:', res.status, data);

      if (!res.ok) {
        throw new Error(data.detail || 'Failed to create order');
      }

      setMessage(`Order #${data.id} placed successfully!`);
      clearCart();
    } catch (err: any) {
      setMessage(err.message || 'Error placing order');
    } finally {
      setLoading(false);
    }
  };

  // compute total for display
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="divide-y">
            {cart.map((item) => (
              <li key={item.productId} className="py-2 flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <div className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <p className="mt-3 text-right font-semibold">
            Total: ${total.toFixed(2)}
          </p>
        )}
      </div>

      {/* Checkout form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Shipping Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || cart.length === 0}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Placing order…' : 'Place Order'}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
    </Layout>
  );
}
