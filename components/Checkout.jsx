'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';
import Link from 'next/link';

export default function Checkout() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleStripeCheckout = async () => {
    if (!email || !name) {
      alert('Vänligen fyll i alla fält');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email,
          name,
          totalPrice,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Något gick fel, försök igen');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">BETALNING</h1>

      {/* Order Summary */}
      <div className="bg-darkGray rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Orderöversikt:</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between mb-3 pb-3 border-b border-gold/20">
            <div>
              <p className="text-white font-semibold">{item.name}</p>
              <p className="text-gray-400 text-sm">
                {item.color} | {item.size} | x{item.quantity}
              </p>
            </div>
            <p className="text-gold font-bold">{item.price * item.quantity} kr</p>
          </div>
        ))}
        <div className="pt-4 mt-4 border-t border-gold">
          <div className="flex justify-between">
            <span className="text-white font-bold text-lg">Totalt:</span>
            <span className="text-gold font-bold text-2xl">{totalPrice} kr</span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-darkGray rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Dina uppgifter:</h2>
        
        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">Namn:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-dark text-white border border-gold/30 rounded px-4 py-2 focus:outline-none focus:border-gold"
            placeholder="Ditt namn"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">E-post:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-dark text-white border border-gold/30 rounded px-4 py-2 focus:outline-none focus:border-gold"
            placeholder="din@email.com"
          />
        </div>
      </div>

      {/* Stripe Button */}
      <button
        onClick={handleStripeCheckout}
        disabled={loading}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
          loading
            ? 'bg-gray-600 text-white cursor-not-allowed'
            : 'bg-gold text-dark hover:bg-yellow-500'
        }`}
      >
        {loading ? 'Bearbetar...' : 'BETALA MED STRIPE'}
      </button>

      <Link href="/cart" className="mt-4 block text-center text-gold hover:text-yellow-400 font-semibold">
        ← Tillbaka till varukorg
      </Link>
    </div>
  );
}
