'use client';

import Header from '@/components/Header';
import ProductDetail from '@/components/ProductDetail';
import { getProductById } from '@/lib/products';
import Link from 'next/link';

export default function ProductPage({ params }) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <>
        <Header />
        <main className="bg-dark min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Produkt inte funnen</h1>
            <Link href="/" className="text-gold hover:text-yellow-400 font-semibold">
              ← Tillbaka till hemssidan
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-dark min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-gold hover:text-yellow-400 font-semibold mb-6 inline-block">
            ← Tillbaka
          </Link>
          <ProductDetail product={product} />
        </div>
      </main>
    </>
  );
}