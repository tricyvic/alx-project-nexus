import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
    next: { revalidate: 60 },
  });
  const products = await res.json();

  return (
    <Layout>
      <main className="p-8 text-black">
      <h1 className="text-3xl font-bold mb-6 " >Watches</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="block border rounded-lg p-4 hover:shadow-lg"
          >
            {p.image && (
              <div className="mb-3">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={400}
                  height={300}
                  className="rounded"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">Ksh {p.price}</p>
          </Link>
        ))}
      </div>
    </main>
    </Layout>
    
  );
}
