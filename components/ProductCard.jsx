'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';
import { useState } from 'react';

export default function ProductCard({ product, category }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color[0],
      size: product.size[0],
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-darkGray rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="bg-gradient-to-b from-gold/10 to-transparent h-48 flex items-center justify-center">
        <div className="text-6xl">👗</div>
      </div>
      <div className="p-6">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-white hover:text-gold transition-colors mb-2 cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-gold text-2xl font-bold mb-4">{product.price} kr</p>
        <p className="text-gray-400 text-sm mb-4">{product.material}</p>
        
        <div className="flex gap-2 mb-4">
          {product.color.slice(0, 3).map((color) => (
            <div
              key={color}
              className="w-6 h-6 rounded-full border-2 border-gold/50 hover:border-gold cursor-pointer"
              title={color}
              style={{
                backgroundColor: color === 'Svart' ? '#000' : color === 'Vit' ? '#fff' : color === 'Röd' ? '#dc2626' : color === 'Lila' ? '#a855f7' : color === 'Guld' ? '#d4af37' : '#666'
              }}
            />
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-lg font-bold transition-colors ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-gold text-dark hover:bg-yellow-500'
          }`}
        >
          {added ? '✓ TILLAGD' : 'LÄGG I VARUKORG'}
        </button>
      </div>
    </div>
  );
}