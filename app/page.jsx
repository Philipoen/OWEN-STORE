'use client';

import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { getFeaturedProducts, categories } from '@/lib/products';

export const metadata = {
  title: 'OWEN - Luxury Women\'s Fashion',
  description: 'Discover premium lingerie and women\'s fashion at OWEN',
};

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Header />
      <main className="bg-dark min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gold/10 to-transparent py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-gold mb-4 uppercase tracking-widest">
              OWEN
            </h1>
            <p className="text-xl text-gray-300 mb-8">Luxury Women's Fashion Collection</p>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Utforska vår exklusiva kollektion av premium lingerie och kvinnokläder. Elegans, kvalitet och stil.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gold mb-12 uppercase tracking-widest">KATEGORIER</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="bg-darkGray rounded-lg p-6 text-center hover:bg-gold/10 transition-all transform hover:scale-105 border border-gold/20 hover:border-gold"
                >
                  <div className="text-4xl mb-3">👗</div>
                  <h3 className="text-white font-bold hover:text-gold transition-colors">{category}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 border-t border-gold/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gold mb-12 uppercase tracking-widest">DESTACADE PRODUKTER</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {featured.map((product) => {
                const category = categories.find((cat) =>
                  Object.values({ BH: '', Trosor: '', Träningskläder: '', Kjolar: '', Tajts: '', Stockings: '' })
                );
                return (
                  <div key={product.id} className="lg:col-span-2">
                    <ProductCard product={product} category="" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-gold/20 bg-gradient-to-t from-gold/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Upptäck Luxury Fashion</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Skapa din perfekta stil med vår handpickade kollektion av premium lingerie och kvinnokläder.
            </p>
            <Link
              href="/category/bh"
              className="inline-block bg-gold text-dark px-12 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
            >
              HANDLA NU
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}