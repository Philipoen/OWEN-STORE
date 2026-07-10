import Header from '@/components/Header';
import './layout.css';
import '@/globals.css';

export const metadata = {
  title: 'OWEN - Luxury Women\'s Fashion',
  description: 'Discover premium lingerie and women\'s fashion at OWEN',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body>
        {children}
        <footer className="bg-darkGray border-t border-gold/30 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-gold font-bold text-lg mb-4">OM OWEN</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-gold transition">Om oss</a></li>
                  <li><a href="#" className="hover:text-gold transition">Kontakt</a></li>
                  <li><a href="#" className="hover:text-gold transition">Karriär</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gold font-bold text-lg mb-4">KUNDSERVICE</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-gold transition">Frakt & Returner</a></li>
                  <li><a href="#" className="hover:text-gold transition">Vanliga frågor</a></li>
                  <li><a href="#" className="hover:text-gold transition">Stöd</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gold font-bold text-lg mb-4">JURIDISK</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-gold transition">Villkor</a></li>
                  <li><a href="#" className="hover:text-gold transition">Integritet</a></li>
                  <li><a href="#" className="hover:text-gold transition">Cookies</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gold font-bold text-lg mb-4">FÖLJ OSS</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-gold transition">Instagram</a></li>
                  <li><a href="#" className="hover:text-gold transition">Facebook</a></li>
                  <li><a href="#" className="hover:text-gold transition">TikTok</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gold/20 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2024 OWEN. Alla rättigheter förbehållna.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}