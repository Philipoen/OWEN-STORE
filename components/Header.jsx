'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';
import { useState } from 'react';

export default function Header() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ['BH', 'Trosor', 'Träningskläder', 'Kjolar', 'Tajts', 'Stockings'];

  return (
    <header className="bg-dark border-b border-gold sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Logo och Meny */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-4xl font-bold text-gold tracking-widest">
            OWEN
          </Link>
          <Link href="/cart" className="relative">
            <div className="bg-gold text-dark rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {cartCount}
            </div>
          </Link>
        </div>

        {/* Kategorier */}
        <nav className="flex justify-center gap-8 flex-wrap">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="text-white hover:text-gold transition-colors font-semibold text-sm uppercase tracking-wide"
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
