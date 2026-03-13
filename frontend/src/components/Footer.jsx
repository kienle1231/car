import { Car } from 'lucide-react';

const Footer = () => (
  <footer className="bg-black/80 border-t border-white/10 py-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2 text-xl font-extrabold mb-4">
          <Car className="w-6 h-6 text-yellow-400" />
          <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">LUXERIDE</span>
        </div>
        <p className="text-gray-500 text-sm">Experience luxury on every road. Premium car rentals crafted for discerning drivers.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3">Quick Links</h4>
        <div className="space-y-2 text-sm text-gray-500">
          <p className="hover:text-yellow-400 transition cursor-pointer">Home</p>
          <p className="hover:text-yellow-400 transition cursor-pointer">Browse Cars</p>
          <p className="hover:text-yellow-400 transition cursor-pointer">About Us</p>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3">Contact</h4>
        <div className="space-y-2 text-sm text-gray-500">
          <p>📍 123 Luxury Ave, Ho Chi Minh City</p>
          <p>📞 +84 123 456 789</p>
          <p>✉️ hello@luxeride.vn</p>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-gray-600">
      © 2026 LUXERIDE. All rights reserved.
    </div>
  </footer>
);

export default Footer;
