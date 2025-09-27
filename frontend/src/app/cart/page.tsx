'use client';

import Layout from '@/components/Layout';
import { useCart } from '../../context/CartContext';


export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // You can compute totals here
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <Layout><p className="p-6 text-center">Your cart is empty.</p></Layout>;
  }

  return (
    <Layout>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <ul className="divide-y">
        {cart.map((item) => (
          <li key={item.productId} className="py-4 flex justify-between items-center">
            <div>
                
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">
                KSh {item.price} × {item.quantity}
              </p>
            </div>
            <div>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <p className="text-xl font-semibold">Total: KSh {total.toFixed(2)}</p>
        <div className="space-x-3">
          <button
            onClick={clearCart}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Clear Cart
          </button>
          <button
            onClick={() => window.location.href = '/checkout'}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
}
