'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, category }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-darkGray rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-gold/50 transition-all cursor-pointer transform hover:scale-105">
        <div className="relative h-64 bg-gradient-to-b from-darkGray to-dark">
          <div className="w-full h-full flex items-center justify-center text-gold text-6xl">
            🛍️
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
          <p className="text-gold font-bold text-xl mb-2">{product.price} kr</p>
          <div className="flex gap-2 flex-wrap">
            {product.color.slice(0, 3).map((color) => (
              <span key={color} className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
