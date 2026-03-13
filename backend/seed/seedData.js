require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Car = require('../models/Car');
const User = require('../models/User');
const Booking = require('../models/Booking');

const cars = [
  { name: 'Tesla Model 3', brand: 'Tesla', pricePerDay: 120, type: 'Electric', description: 'Experience the future of driving with the all-electric Tesla Model 3. Autopilot included.', imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80', seats: 5, transmission: 'Auto', fuelType: 'Electric', rating: 4.9 },
  { name: 'BMW M4', brand: 'BMW', pricePerDay: 200, type: 'Coupe', description: 'The BMW M4 delivers thrilling power, precision handling, and aggressive styling for the ultimate driving machine.', imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', seats: 4, transmission: 'Auto', fuelType: 'Gasoline', rating: 4.8 },
  { name: 'Mercedes C300', brand: 'Mercedes', pricePerDay: 150, type: 'Sedan', description: 'Luxury meets performance in the elegant Mercedes-Benz C300. Premium comfort awaits.', imageUrl: 'https://images.unsplash.com/photo-1629897048514-3dd7414bc7eb?w=800&q=80', seats: 5, transmission: 'Auto', fuelType: 'Gasoline', rating: 4.7 },
  { name: 'Audi A6', brand: 'Audi', pricePerDay: 160, type: 'Sedan', description: 'The Audi A6 blends progressive design with advanced technology for an exceptional ride.', imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80', seats: 5, transmission: 'Auto', fuelType: 'Gasoline', rating: 4.8 },
  { name: 'Lamborghini Huracan', brand: 'Lamborghini', pricePerDay: 800, type: 'Supercar', description: 'Unleash your wild side with the naturally aspirated V10 Lamborghini Huracan.', imageUrl: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80', seats: 2, transmission: 'Auto', fuelType: 'Gasoline', rating: 5.0 },
  { name: 'Porsche 911', brand: 'Porsche', pricePerDay: 400, type: 'Sports', description: 'The iconic Porsche 911. Timeless design, unmatched driving dynamics.', imageUrl: 'https://images.unsplash.com/photo-1503376712341-ea080dd55e09?w=800&q=80', seats: 4, transmission: 'Auto', fuelType: 'Gasoline', rating: 4.9 },
  { name: 'Toyota Camry', brand: 'Toyota', pricePerDay: 70, type: 'Sedan', description: 'Reliable, comfortable, and efficient. The Toyota Camry is your perfect daily companion.', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?w=800&q=80', seats: 5, transmission: 'Auto', fuelType: 'Hybrid', rating: 4.5 },
  { name: 'Honda Civic', brand: 'Honda', pricePerDay: 60, type: 'Sedan', description: 'Sporty and exciting, the Honda Civic is designed to turn heads wherever you go.', imageUrl: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?w=800&q=80', seats: 5, transmission: 'Auto', fuelType: 'Gasoline', rating: 4.6 },
  { name: 'Ford Mustang', brand: 'Ford', pricePerDay: 130, type: 'Sports', description: 'The legend lives on. Experience the roar of the Ford Mustang V8.', imageUrl: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42a5?w=800&q=80', seats: 4, transmission: 'Manual', fuelType: 'Gasoline', rating: 4.7 },
  { name: 'Range Rover Sport', brand: 'Land Rover', pricePerDay: 250, type: 'SUV', description: 'Command the road in absolute luxury and capability with the Range Rover Sport.', imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80', seats: 5, transmission: 'Auto', fuelType: 'Gasoline', rating: 4.8 },
  { name: 'Nissan GTR', brand: 'Nissan', pricePerDay: 350, type: 'Supercar', description: 'Godzilla has arrived. The ultimate track machine built for the streets.', imageUrl: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80', seats: 4, transmission: 'Auto', fuelType: 'Gasoline', rating: 4.9 },
  { name: 'Toyota Fortuner', brand: 'Toyota', pricePerDay: 100, type: 'SUV', description: 'Tough, spacious, and reliable. The Fortuner is ready for any family adventure.', imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=800&q=80', seats: 7, transmission: 'Auto', fuelType: 'Diesel', rating: 4.6 }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');

    await Car.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const users = await User.insertMany([
      { name: 'Admin VIP', email: 'admin@vip.com', password: adminPassword, role: 'admin' },
      { name: 'Customer VIP', email: 'user@vip.com', password: userPassword, role: 'customer' }
    ]);

    await Car.insertMany(cars);

    console.log('Data Imported successfully! 🚗');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
