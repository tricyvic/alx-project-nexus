"use client";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
// Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url?: string | null;
  quantity: number;
  category?: string | null;
  status?: "Available" | "Disabled";
  date?: string;
}
const x =
  "http://127.0.0.1:8000/media/products/Screenshot_from_2025-07-29_16-09-36_nQvpzGA.png";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = "http://127.0.0.1:8000/api";
        const res = await fetch(`${apiUrl}/allproducts/`);
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
        {/* Search and actions */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for watches, brands, or categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Search
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="border-2 border-gray-200 px-6 py-3 rounded-xl bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium">
                  Filter
                </button>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium">
                  Sort
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Product grid */}
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
                    {p.image_url ? (
                      <Image
                        src={p.image_url ?? x}
                        alt={p.name}
                        width={220}
                        height={120}
                        className="w-full rounded-lg object-contain max-h-32"
                        unoptimized
                      />
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
                      KSh{" "}
                      {parseFloat(p.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  {/* Selected checkmark (optional, demo) */}
                  {idx === 6 && status === "Available" && (
                    <span className="absolute right-4 bottom-4 text-green-500 text-xl">
                      {/* Checkmark icon could go here */}
                    </span>
                  )}
                </Link>
              );
              //add a button that paginates to page 2 by calling "http://localhost:8000/api/products/?page=2"
            })}
          </div>
        )}
        <div className="col-span-full flex justify-center mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            onClick={async () => {
              setLoading(true);
              try {
                const res = await fetch(
                  "http://localhost:8000/api/products/?page=2"
                );
                if (!res.ok) throw new Error("Failed to fetch page 2");
                const data = await res.json();
                setProducts(Array.isArray(data) ? data : data.results);
              } catch (e) {
                setProducts([]);
              } finally {
                setLoading(false);
              }
            }}
          >
            Next Page
          </button>
        </div>
      </main>
    </Layout>
  );
}
