"use client";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

// Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string | null;
  quantity: number;
  category?: string | null;
  status?: "Available" | "Disabled";
  date?: string;
}
let x = "http://127.0.0.1:8000/media/products/Screenshot_from_2025-07-29_16-09-36_nQvpzGA.png";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = "http://127.0.0.1:8000/api";
        const res = await fetch(`${apiUrl}/products/`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.results);
      } catch (e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by search
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description &&
        p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 bg-white"
          />
          <div className="flex gap-2">
            <button className="border px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100">
              Actions
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-20">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p, idx) => {
              const status = p.quantity > 0 ? "Available" : "Disabled";
              const statusColor =
                status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-500";
              return (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className={`relative group border rounded-2xl bg-white p-4 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col h-full ${
                    status === "Available"
                      ? "hover:border-green-400"
                      : "opacity-70"
                  }`}
                >
                  {/* Status badge */}
                  <span
                    className={`absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                  >
                    {status}
                  </span>
                  {/* Select dot */}
                  <span className="absolute right-4 top-4 w-3 h-3 rounded-full border border-gray-200 bg-gray-100"></span>
                  {/* Product image */}
                  <div className="w-full h-24 flex-1 flex items-center justify-center mb-4">
                    {p.image ? (
                      <img src={p.image ?? ""} alt={p.name} width={220} height={120} className="w-full rounded-lg object-contain max-h-32"/>
                    ) : (
                      <div className="w-40 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  {/* Product info */}
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-base text-gray-900 truncate ">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {p.date || "12.09.20"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {p.category || "Watches"}
                    </div>
                    <div className="font-bold text-gray-800 text-base">
                      $
                      {parseFloat(p.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  {/* Selected checkmark (optional, demo) */}
                  {idx === 6 && status === "Available" && (
                    <span className="absolute right-4 bottom-4 text-green-500 text-xl">
                      
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </Layout>
  );
}
