'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';
import Link from 'next/link';

export default function Checkout() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = totalPrice > 500 ? 0 : 49;
  const total = totalPrice + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email: formData.email,
          name: formData.name,
          totalPrice: total,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
        clearCart();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Något gick fel. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Din varukorg är tom</h2>
        <Link href="/" className="text-gold hover:text-yellow-400">
          ← Tillbaka till handla
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <form onSubmit={handleCheckout} className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-white mb-6">LEVERANSADRESS</h2>

        <div className="space-y-4 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Fullständigt namn"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-darkGray text-white px-4 py-3 rounded-lg border border-gold/30 focus:border-gold outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="E-postadress"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-darkGray text-white px-4 py-3 rounded-lg border border-gold/30 focus:border-gold outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Telefonnummer"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-darkGray text-white px-4 py-3 rounded-lg border border-gold/30 focus:border-gold outline-none"
          />
          <input
            type="text"
            name="address"
            placeholder="Gatuadress"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full bg-darkGray text-white px-4 py-3 rounded-lg border border-gold/30 focus:border-gold outline-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="Stad"
              value={formData.city}
              onChange={handleChange}
              required
              className="bg-darkGray text-white px-4 py-3 rounded-lg border border-gold/30 focus:border-gold outline-none"
            />
            <input
              type="text"
              name="zip"
              placeholder="Postnummer"
              value={formData.zip}
              onChange={handleChange}
              required
              className="bg-darkGray text-white px-4 py-3 rounded-lg border border-gold/30 focus:border-gold outline-none"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">BETALNING</h2>
        <p className="text-gray-400 mb-6">
          Du kommer omdirigeras till Stripe för att slutföra din betalning säkert.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-dark py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          {loading ? 'BEARBETAR...' : 'SLUTFÖR BESTÄLLNING'}
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-darkGray rounded-lg p-8 h-fit">
        <h3 className="text-2xl font-bold text-white mb-6">ORDERSAMMANFATTNING</h3>
        <div className="space-y-4 mb-6 border-b border-gold/20 pb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-300">
              <span>{item.name} x{item.quantity}</span>
              <span>{item.price * item.quantity} kr</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 mb-6 border-b border-gold/20 pb-6">
          <div className="flex justify-between text-gray-400">
            <span>Summa:</span>
            <span>{totalPrice} kr</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Frakt:</span>
            <span>{shipping === 0 ? 'GRATIS' : shipping + ' kr'}</span>
          </div>
        </div>
        <div className="flex justify-between text-gold text-xl font-bold">
          <span>TOTALT:</span>
          <span>{total} kr</span>
        </div>
      </div>
    </div>
  );
}