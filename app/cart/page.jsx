import Header from '@/components/Header';
import Cart from '@/components/Cart';

export const metadata = {
  title: 'Varukorg - OWEN',
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="bg-dark min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Cart />
        </div>
      </main>
    </>
  );
}
