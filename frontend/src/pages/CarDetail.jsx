import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Fuel, Settings, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { getCarByIdAPI, createBookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CarDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ pickupDate: '', returnDate: '', pickupLocation: '' });

  const locations = ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Nha Trang', 'Da Lat'];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCarByIdAPI(id);
        setCar(data);
      } catch (err) { console.error(err); }
      setLoading(false);
    })();
  }, [id]);

  const days = booking.pickupDate && booking.returnDate
    ? Math.max(1, Math.ceil((new Date(booking.returnDate) - new Date(booking.pickupDate)) / 86400000))
    : 0;
  const totalPrice = car ? days * car.pricePerDay : 0;

  const handleBook = async () => {
    if (!user) { toast.error('Please login first'); navigate('/login'); return; }
    if (!booking.pickupDate || !booking.returnDate || !booking.pickupLocation) { toast.error('Please fill all fields'); return; }
    try {
      await createBookingAPI({ car: id, ...booking, totalPrice });
      toast.success('Booking created successfully!');
      navigate('/my-bookings');
    } catch (err) { toast.error(err.response?.data?.error || 'Booking failed'); }
  };

  if (loading) return <div className="min-h-screen pt-24 flex items-center justify-center text-gray-500">Loading...</div>;
  if (!car) return <div className="min-h-screen pt-24 flex items-center justify-center text-gray-500">Car not found</div>;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition mb-8">
          <ArrowLeft className="w-5 h-5" /> Back to Cars
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Car Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative rounded-3xl overflow-hidden">
              <img src={car.imageUrl} alt={car.name} className="w-full h-[400px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold flex items-center gap-1">
                <Star className="w-4 h-4" fill="currentColor" /> {car.rating}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[{ icon: <Users />, label: `${car.seats} Seats` }, { icon: <Settings />, label: car.transmission }, { icon: <Fuel />, label: car.fuelType }].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-yellow-400 flex justify-center mb-2">{item.icon}</div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="bg-yellow-400/10 text-yellow-400 px-4 py-1.5 rounded-full text-sm font-medium">{car.type}</span>
            <h1 className="text-4xl font-black mt-4 mb-2">{car.name}</h1>
            <p className="text-gray-500 mb-6">{car.description}</p>

            <div className="text-3xl font-black mb-8">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">${car.pricePerDay}</span>
              <span className="text-sm text-gray-500 font-normal"> /day</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
              <h3 className="font-bold text-lg">Book This Car</h3>

              <div>
                <label className="text-sm text-gray-400 mb-1 block flex items-center gap-1"><MapPin className="w-4 h-4" /> Pickup Location</label>
                <select value={booking.pickupLocation} onChange={(e) => setBooking({...booking, pickupLocation: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50">
                  <option value="" className="bg-gray-900">Select location</option>
                  {locations.map(l => <option key={l} value={l} className="bg-gray-900">{l}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block flex items-center gap-1"><Calendar className="w-4 h-4" /> Pickup Date</label>
                  <input type="date" value={booking.pickupDate} onChange={(e) => setBooking({...booking, pickupDate: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block flex items-center gap-1"><Calendar className="w-4 h-4" /> Return Date</label>
                  <input type="date" value={booking.returnDate} onChange={(e) => setBooking({...booking, returnDate: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50" />
                </div>
              </div>

              {days > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>${car.pricePerDay} × {days} day{days > 1 ? 's' : ''}</span>
                    <span className="text-white font-bold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black">
                    <span>Total</span>
                    <span className="text-yellow-400">${totalPrice}</span>
                  </div>
                </motion.div>
              )}

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleBook}
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-4 rounded-xl font-bold text-lg shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition">
                Book Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
