"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import Layout from "@/components/Layout";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  rating?: number;
  reviews_count?: number;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // unwrap the promise (Next 15+)
  const { id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"description" | "ingredients">("description");

  // fetch product once
  useEffect(() => {
    (async () => {
      try {
        const apiUrl ="http://127.0.0.1:8000/api";
        const res = await fetch(`${apiUrl}/products/${id}/`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="p-4">Loading…</p>;
  if (!product) return <p className="p-4 text-red-500">Product not found</p>;
  
  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
    alert(product.name + " added to cart!");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-8 flex flex-col md:flex-row gap-12 bg-white rounded-lg shadow-md">
        {/* Product Image */}
        <div className="flex-1 flex items-start justify-center">
      {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="rounded-lg shadow w-80 h-80 object-cover"
            />
          )}
        </div>
        {/* Product Details */}
        <div className="flex-1 min-w-[320px]">
          <h1 className="text-2xl text-gray-900 sm:text-3xl font-bold mb-2 flex items-center gap-2">
            {product.name}
            <span className="text-pink-400 text-base font-normal flex items-center gap-1">
              
              4.6
              <span className="text-xs text-gray-500">(429)</span>
            </span>
          </h1>
          <div className="text-sm text-gray-500 mb-1">
            {product.description}
          </div>
          <div className="text-xs text-pink-400 mb-2 font-semibold">
            Limited stock!
          </div>
          <div className="text-2xl font-bold mb-1 text-gray-900">
            KSh {product.price}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            or 4 interest-free payments of ksh{(product.price / 4).toFixed(2)}{" "}
            with{" "}
            <span className="bg-gray-100 px-2 py-0.5 rounded text-teal-600 font-semibold">
              afterpay
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-blue-700">FAST SHIPPING</span>{" "}
            <span className="text-gray-600">
              - Orders ship within 2 business days
            </span>
            <br />
            <span className="font-semibold text-blue-700">FREE</span>{" "}
            <span className="text-gray-600">shipping on orders KSh 75+</span>
          </div>
          <div className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="purchase"
                defaultChecked
                className="accent-pink-400"
              />
              <span className="text-gray-900">
                One-time purchase:{" "}
                <span className="font-semibold">
                  KSh {product.price}
                </span>
              </span>
            </label>
            <label className="flex items-center gap-2 mt-1 text-gray-900">
              <input type="radio" name="purchase" className="accent-pink-400" />
              <span>
                Subscribe &amp; Save (15%):{" "}
                <span className="font-semibold">
                  KSh {(product.price * 0.85).toFixed(2)}
                </span>
              </span>
            </label>
            <div className="text-xs text-gray-400 ml-6 mt-1">
              Subscription details
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium mb-1 text-gray-900"
            >
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-3 py-2 w-24 focus:outline-pink-400 text-gray-900"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
      <button
        onClick={handleAdd}
            className="w-full bg-green-200 hover:bg-pink-300 text-gray-800 font-semibold py-3 rounded transition mb-4 text-lg"
          >
            Add to cart
          </button>
          <div className="flex gap-6 border-b mt-6">
            <button
              className={`py-2 px-1 border-b-2 ${
                tab === "description"
                  ? "border-pink-400 text-pink-500 font-semibold"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setTab("description")}
            >
              Description
            </button>
            <button
              className={`py-2 px-1 border-b-2 ${
                tab === "ingredients"
                  ? "border-pink-400 text-pink-500 font-semibold"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setTab("ingredients")}
            >
              Ingredients
      </button>
          </div>
          <div className="mt-4">
            {tab === "description" && (
              <div>
                <div className="font-bold mb-2 text-gray-900">
                  {product.name}
                </div>
                <div className="text-gray-700 text-sm leading-relaxed">
                  {product.description}
                </div>
              </div>
            )}
            {tab === "ingredients" && (
              <div className="text-gray-700 text-sm">
                Ingredients info coming soon.
              </div>
            )}
          </div>
        </div>
    </div>
    </Layout>
  );
}
