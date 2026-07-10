'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';

export default function Cart() {
  const { items, removeItem, updateQuantity } = useCart();
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-4">Din varukorg är tom</h1>
        <Link href="/" className="text-gold hover:text-yellow-400 font-semibold">
          ← Tillbaka till butiken
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">VARUKORG</h1>

      <div className="bg-darkGray rounded-lg overflow-hidden mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-6 border-b border-gold/20 last:border-b-0"
          >
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-400 text-sm">
                Färg: <span className="text-gold">{item.color}</span> | Storlek: <span className="text-gold">{item.size}</span>
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="bg-dark text-gold px-3 py-1 rounded hover:bg-gold/30"
                >
                  −
                </button>
                <span className="text-white font-bold w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-dark text-gold px-3 py-1 rounded hover:bg-gold/30"
                >
                  +
                </button>
              </div>

              <div className="text-gold font-bold text-lg w-24 text-right">
                {item.price * item.quantity} kr
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-400 font-bold px-4"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-darkGray rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center text-2xl font-bold">
          <span className="text-white">Totalt:</span>
          <span className="text-gold">{totalPrice} kr</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/" className="flex-1 bg-darkGray text-white py-4 rounded-lg font-bold text-center hover:bg-gold/20">
          ← Fortsätt handla
        </Link>
        <Link href="/checkout" className="flex-1 bg-gold text-dark py-4 rounded-lg font-bold text-center hover:bg-yellow-500">
          GÅ TILL BETALNING →
        </Link>
      </div>
    </div>
  );
}
