'use client';

import { useCart } from '@/lib/store';
import Link from 'next/link';

export default function Cart() {
  const { items, removeItem, updateQuantity } = useCart();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-white mb-4">Din varukorg är tom</h2>
        <p className="text-gray-400 mb-8">Börja handla för att lägga till produkter</p>
        <Link href="/" className="inline-block bg-gold text-dark px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
          FORTSÄTT HANDLA
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gold mb-8 uppercase tracking-widest">VARUKORG</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-darkGray rounded-lg p-6 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Färg: {item.color} | Storlek: {item.size}
                </p>
                <p className="text-gold font-bold">{item.price} kr</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-dark rounded-lg px-3 py-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="text-gold hover:text-yellow-400 font-bold"
                  >
                    −
                  </button>
                  <span className="text-white font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gold hover:text-yellow-400 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-400 font-bold"
                >
                  RADERA
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-darkGray rounded-lg p-8 h-fit">
          <h2 className="text-2xl font-bold text-white mb-6">SAMMANFATTNING</h2>
          <div className="space-y-4 mb-6 border-b border-gold/20 pb-6">
            <div className="flex justify-between text-gray-400">
              <span>Produkter:</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Summa:</span>
              <span>{totalPrice} kr</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Frakt:</span>
              <span>{totalPrice > 500 ? 'GRATIS' : '49 kr'}</span>
            </div>
          </div>
          <div className="flex justify-between text-gold text-xl font-bold mb-8">
            <span>TOTALT:</span>
            <span>{totalPrice + (totalPrice > 500 ? 0 : 49)} kr</span>
          </div>
          <Link
            href="/checkout"
            className="block w-full bg-gold text-dark py-4 rounded-lg font-bold text-center hover:bg-yellow-500 transition-colors mb-4"
          >
            GÅ TILL BETALNING
          </Link>
          <Link
            href="/"
            className="block w-full text-gold text-center hover:text-yellow-400 font-semibold"
          >
            ← FORTSÄTT HANDLA
          </Link>
        </div>
      </div>
    </div>
  );
}