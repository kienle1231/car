import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Car, MapPin, DollarSign } from 'lucide-react';
import { getMyBookingsAPI } from '../services/api';

const statusColors = {
  Pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
  Approved: 'bg-green-400/10 text-green-400 border-green-400/30',
  Cancelled: 'bg-red-400/10 text-red-400 border-red-400/30',
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMyBookingsAPI();
        setBookings(data);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-black mb-8">
          My <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Bookings</span>
        </motion.h1>

        {loading ? (
          <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />)}</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 text-gray-500"><p className="text-xl">No bookings yet. Start by browsing our cars!</p></div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <motion.div key={b._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-yellow-500/30 transition">
                {b.car && <img src={b.car.imageUrl} alt={b.car.name} className="w-full md:w-48 h-32 object-cover rounded-xl" />}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold flex items-center gap-2"><Car className="w-5 h-5 text-yellow-400" /> {b.car?.name || 'Unknown'}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[b.status]}`}>{b.status}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-400">
                    <p className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(b.pickupDate).toLocaleDateString()}</p>
                    <p className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(b.returnDate).toLocaleDateString()}</p>
                    <p className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {b.pickupLocation}</p>
                  </div>
                  <div className="mt-3 text-lg font-bold"><DollarSign className="w-5 h-5 inline text-yellow-400" /> <span className="text-yellow-400">${b.totalPrice}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
