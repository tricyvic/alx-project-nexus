"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
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

  // fetch product once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}/`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="p-4">Loading…</p>;
  if (!product) return <p className="p-4 text-red-500">Product not found</p>;
  
  const handleAdd = () => {
    alert(product.name + " added to cart!");
    
    
    addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      {product.image && (
        <img src={product.image} alt={product.name} className="mb-4 w-80" />
      )}
      <p className="text-lg mb-2">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
