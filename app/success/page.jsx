import Header from '@/components/Header';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="bg-dark min-h-screen flex items-center justify-center py-12">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-4xl font-bold text-gold mb-4">Tack för din beställning!</h1>
          <p className="text-gray-300 text-lg mb-8">
            Din betalning har mottagits och din beställning kommer snart att skickas.
          </p>
          <Link
            href="/"
            className="inline-block bg-gold text-dark py-3 px-8 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
          >
            Fortsätt handla
          </Link>
        </div>
      </main>
    </>
  );
}