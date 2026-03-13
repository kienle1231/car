const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  type: { type: String, required: true }, // SUV, Sedan, Sports, etc.
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, default: 5.0 },
  seats: { type: Number, required: true },
  transmission: { type: String, required: true }, // Auto, Manual
  fuelType: { type: String, required: true }, // Electric, Gas, Hybrid
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
