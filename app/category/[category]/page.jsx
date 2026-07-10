'use client';

import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/products';

export default function CategoryPage({ params }) {
  const category = decodeURIComponent(params.category);
  const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);
  const products = getProductsByCategory(categoryCapitalized);

  return (
    <>
      <Header />
      <main className="bg-dark min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gold mb-2 uppercase tracking-widest">
            {categoryCapitalized}
          </h1>
          <p className="text-gray-400 mb-12">
            Utforska vår exklusiva kollektion av {category.toLowerCase()}
          </p>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Ingen produkt hittad i denna kategori</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}