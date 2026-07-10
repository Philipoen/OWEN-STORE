'use client';

import Header from '@/components/Header';
import { useCart } from '@/lib/store';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, categories, products } from '@/lib/products';

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-dark min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-gold mb-4 tracking-widest">OWEN</h1>
            <p className="text-xl text-gray-300">LUXURY WOMEN'S FASHION</p>
          </div>

          {/* Featured Products */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">
              UTVALDA PRODUKTER
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFeaturedProducts().map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Categories Section */}
          {categories.map((category) => (
            <section key={category} className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white uppercase tracking-wide">{category}</h2>
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  className="text-gold hover:text-yellow-400 font-semibold text-lg"
                >
                  SE ALLA →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products[category]?.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} category={category} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
