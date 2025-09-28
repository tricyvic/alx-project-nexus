"use client";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect, useState, useRef } from "react";
const SLIDER_IMAGES = [
  "https://imgs.search.brave.com/b9FxaDQzJQLG1bFt5h9wV6KD0q-uS8fvndmFdVAC93Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/Nzg5OTgzMjM4NzAt/ODNhOWEzZDYwOWU1/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1UaDhmSGR5/YVhOMGQyRjBZMmg4/Wlc1OE1IeDhNSHg4/ZkRBPQ",
  "https://imgs.search.brave.com/d01F4srkI634mF5wfBMasvpGQQlrfZ5_LyoGWLzEn-k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxMy8w/Ny8xMS8xNS8zMC9t/YWxlLXdhdGNoLTE0/NDY0OF82NDAuanBn",
  "https://imgs.search.brave.com/ksngL0ranl_KhdkP0S7op6Hy6w9guc7kPrquKWS4Pio/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE3/MDg2NTExNDU0MDEt/NmJlODA0Y2QwMmQ0/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1UVjhmSGRo/ZEdOb0pUSXdkMkZz/YkhCaGNHVnlmR1Z1/ZkRCOGZEQjhmSHd3",
  "https://imgs.search.brave.com/_fkfmSzpHmhqlcQF7luSHZoK96tE-7AA_0u46rA9_NI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg2LzU4LzE3/LzM2MF9GXzg2NTgx/NzYwXzZ0NHVXSWw4/cXlPenA3cFJzWGFl/dERwNnFyTk9OU2lK/LmpwZw",
];
const SLIDER_TEXTS = [
  "Timeless elegance that elevates your every look.",
  "Crafted for precision, designed for style.",
  "Experience the perfect blend of function and fashion.",
  "Make every moment memorable with our exclusive collection.",
];

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
let x =
  "http://127.0.0.1:8000/media/products/Screenshot_from_2025-07-29_16-09-36_nQvpzGA.png";

export default function HomePage() {
  // Hero slider state
  const [slide, setSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance slider
  useEffect(() => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [slide]);
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
        {/* Hero/Banner Slider */}
        <div className="w-full max-w-7xl mx-auto mb-12">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 md:h-96 lg:h-[500px] flex items-center justify-center bg-gray-200">
            <img
              src={SLIDER_IMAGES[slide]}
              alt={SLIDER_TEXTS[slide]}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            <div className="relative z-10 text-white p-8 md:p-12 max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {SLIDER_TEXTS[slide]}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                Discover our premium collection of watches crafted for the modern lifestyle
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            {/* Slider controls */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow"
              onClick={() =>
                setSlide(
                  (slide - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length
                )
              }
              aria-label="Previous slide"
            >
              &#8592;
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow"
              onClick={() => setSlide((slide + 1) % SLIDER_IMAGES.length)}
              aria-label="Next slide"
            >
              &#8594;
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {SLIDER_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full border-2 ${
                    i === slide
                      ? "bg-white border-green-500"
                      : "bg-gray-300 border-white"
                  } transition`}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
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
                    className="w-full border-2 border-gray-200 rounded-xl px-6 py-4 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
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
                <img
                  src={p.image_url}
                  alt={p.name}
                        width={220}
                        height={120}
                        className="w-full rounded-lg object-contain max-h-32"
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
                      KSh {parseFloat(p.price).toLocaleString(undefined, {
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
            })}
      </div>
        )}
    </main>
    </Layout>
  );
}
