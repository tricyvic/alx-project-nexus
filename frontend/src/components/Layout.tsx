'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('jwt');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-amber-300 shadow sticky text-black top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            🕒 WatchStore
          </Link>
          <nav className="space-x-4">
            
            
            { !isLoggedIn ? (
              <>
              <Link href="/profile" className="hover:text-blue-600">
                Profile
              </Link>
              <button className="hover:text-blue-600" onClick={() => {/* handle logout */}}>
                Logout
              </button>
              </>
            ) : (
              <>
              <Link href="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link href="/register" className="hover:text-blue-600">
                Register
              </Link>
              </>
            )}

            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/cart" className="hover:text-blue-600">
              Cart ({cart.length})
            </Link>
            <Link href="/checkout" className="hover:text-blue-600">
              Checkout
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-gray-50 text-black">{children}</main>
      <footer className="bg-gray-900 text-gray-200 text-center py-4">
        © {new Date().getFullYear()} WatchStore – Built with Next.js + Django
      </footer>
    </div>
  );
}
