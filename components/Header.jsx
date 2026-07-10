'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';
import { categories } from '@/lib/products';

export default function Header() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-darkGray border-b border-gold/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-3xl font-bold text-gold tracking-widest hover:text-yellow-400 transition">
            OWEN
          </Link>
          <Link
            href="/cart"
            className="relative bg-gold text-dark px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
          >
            🛒 VARUKORG
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Categories Navigation */}
        <nav className="flex flex-wrap gap-4 border-t border-gold/20 pt-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="text-gray-300 hover:text-gold transition-colors font-semibold uppercase text-sm tracking-wide"
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}