import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Star, Car } from 'lucide-react';

const Home = () => {
  const features = [
    { icon: <Shield className="w-8 h-8" />, title: 'Fully Insured', desc: 'Every car comes with comprehensive insurance coverage for peace of mind.' },
    { icon: <Clock className="w-8 h-8" />, title: '24/7 Support', desc: 'Round-the-clock customer service to assist you anytime, anywhere.' },
    { icon: <Star className="w-8 h-8" />, title: 'Premium Fleet', desc: 'Curated collection of the world\'s finest luxury and sports cars.' },
    { icon: <Car className="w-8 h-8" />, title: 'Easy Booking', desc: 'Reserve your dream car in just a few clicks with instant confirmation.' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-yellow-400 text-sm font-medium">Premium Car Rental Service</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Drive Your{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Dream Car
              </span>{' '}
              Today
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              Experience unparalleled luxury with our curated collection of premium vehicles. From sleek sports cars to elegant sedans.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cars">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 shadow-xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-shadow">
                  Browse Cars <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition">
                  Create Account
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-yellow-400 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary border-y border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '500+', label: 'Happy Clients' },
            { num: '50+', label: 'Premium Cars' },
            { num: '4.9', label: 'Average Rating' },
            { num: '24/7', label: 'Support' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">{s.num}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why Choose <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">LUXERIDE</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We're dedicated to providing an exceptional rental experience with premium vehicles and world-class service.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-yellow-500/40 transition-all group">
                <div className="text-yellow-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black mb-6">
            Ready to Hit the <span className="text-yellow-400">Road</span>?
          </motion.h2>
          <p className="text-gray-400 mb-8 text-lg">Join thousands of satisfied customers who trust LUXERIDE for their premium driving experience.</p>
          <Link to="/cars">
            <motion.button whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-yellow-500/25">
              Explore Our Fleet
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
