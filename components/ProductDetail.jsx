'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="bg-gradient-to-b from-gold/10 to-transparent rounded-lg h-96 flex items-center justify-center">
        <div className="text-9xl">👗</div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
        <p className="text-gold text-3xl font-bold mb-6">{product.price} kr</p>
        <p className="text-gray-400 text-lg mb-8">{product.material}</p>

        {/* Color Selection */}
        <div className="mb-8">
          <h3 className="text-white font-bold text-lg mb-4">FÄRG</h3>
          <div className="flex gap-3 flex-wrap">
            {product.color.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedColor === color
                    ? 'bg-gold text-dark border-2 border-gold'
                    : 'bg-darkGray text-white border-2 border-gold/30 hover:border-gold'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-8">
          <h3 className="text-white font-bold text-lg mb-4">STORLEK</h3>
          <div className="flex gap-3 flex-wrap">
            {product.size.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedSize === size
                    ? 'bg-gold text-dark border-2 border-gold'
                    : 'bg-darkGray text-white border-2 border-gold/30 hover:border-gold'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-8">
          <h3 className="text-white font-bold text-lg mb-4">ANTAL</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gold text-dark w-12 h-12 rounded-lg font-bold hover:bg-yellow-500 transition"
            >
              −
            </button>
            <span className="text-white text-2xl font-bold w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gold text-dark w-12 h-12 rounded-lg font-bold hover:bg-yellow-500 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-gold text-dark hover:bg-yellow-500'
          }`}
        >
          {added ? '✓ TILLAGD I VARUKORG' : 'LÄGG I VARUKORG'}
        </button>

        {/* Product Details */}
        <div className="mt-12 border-t border-gold/20 pt-8">
          <h3 className="text-white font-bold text-lg mb-4">PRODUKTDETALJER</h3>
          <ul className="text-gray-400 space-y-2">
            <li>✓ Material: {product.material}</li>
            <li>✓ Tillgängliga färger: {product.color.join(', ')}</li>
            <li>✓ Tillgängliga storlekar: {product.size.join(', ')}</li>
            <li>✓ Fri frakt över 500 kr</li>
            <li>✓ 30 dagars returrätt</li>
          </ul>
        </div>
      </div>
    </div>
  );
}