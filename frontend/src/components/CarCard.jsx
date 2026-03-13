import { motion } from 'framer-motion';
import { Star, Users, Fuel, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" fill="currentColor" /> {car.rating}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-white">{car.type}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1">{car.name}</h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{car.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {car.seats}</span>
          <span className="flex items-center gap-1"><Settings className="w-3.5 h-3.5" /> {car.transmission}</span>
          <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" /> {car.fuelType}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">${car.pricePerDay}</span>
            <span className="text-xs text-gray-500">/day</span>
          </div>
          <Link to={`/cars/${car._id}`} className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-5 py-2 rounded-full text-xs font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all">
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
