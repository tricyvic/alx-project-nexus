import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}/`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return notFound();
  }

  const product = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      {product.image && (
        <div className="mb-4">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            className="rounded"
          />
        </div>
      )}
      <p className="text-gray-700 mb-2">Price: Ksh {product.price}</p>
      <p className="text-gray-600">{product.description}</p>

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </main>
  );
}
