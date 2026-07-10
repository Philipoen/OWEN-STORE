'use client';

import Header from '@/components/Header';
import Checkout from '@/components/Checkout';

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="bg-dark min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Checkout />
        </div>
      </main>
    </>
  );
}