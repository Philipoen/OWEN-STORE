'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';
import Link from 'next/link';

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.color[0]);
  const [selectedSize, setSelectedSize] = useState(product.size[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Bilder */}
      <div>
        <div className="bg-darkGray rounded-lg h-96 flex items-center justify-center text-gold text-8xl mb-4">
          👗
        </div>
        <div className="grid grid-cols-3 gap-4">
          {product.models?.map((model, idx) => (
            <div key={idx} className="bg-darkGray rounded-lg h-24 flex items-center justify-center text-gold text-4xl cursor-pointer hover:opacity-70">
              📸
            </div>
          ))}
        </div>
      </div>

      {/* Detaljer */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
        <p className="text-gold text-3xl font-bold mb-4">{product.price} kr</p>

        <div className="mb-6 pb-6 border-b border-gold/30">
          <p className="text-gray-400 mb-2">Material:</p>
          <p className="text-white font-semibold">{product.material}</p>
        </div>

        {/* Färg */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-3">Välj Färg:</label>
          <div className="flex gap-3 flex-wrap">
            {product.color.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded font-semibold transition-all ${
                  selectedColor === color
                    ? 'bg-gold text-dark'
                    : 'bg-darkGray text-white hover:bg-gold/30'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Storlek */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-3">Välj Storlek:</label>
          <div className="flex gap-3 flex-wrap">
            {product.size.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded font-semibold transition-all ${
                  selectedSize === size
                    ? 'bg-gold text-dark'
                    : 'bg-darkGray text-white hover:bg-gold/30'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Antal */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-3">Antal:</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-darkGray text-gold px-4 py-2 rounded hover:bg-gold/30"
            >
              −
            </button>
            <span className="text-white text-2xl font-bold w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-darkGray text-gold px-4 py-2 rounded hover:bg-gold/30"
            >
              +
            </button>
          </div>
        </div>

        {/* Lägg till i varukorg */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-4 rounded font-bold text-lg transition-all ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-gold text-dark hover:bg-yellow-500'
          }`}
        >
          {added ? '✓ Lagd i varukorg!' : 'LÄGG TILL I VARUKORG'}
        </button>

        <Link href="/cart" className="mt-4 block text-center text-gold hover:text-yellow-400 font-semibold">
          Gå till varukorg →
        </Link>
      </div>
    </div>
  );
}
