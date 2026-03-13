const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { car, pickupDate, returnDate, pickupLocation, totalPrice } = req.body;
    const booking = await Booking.create({
      user: req.user.id, car, pickupDate, returnDate, pickupLocation, totalPrice
    });
    res.status(201).json(booking);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('car');
    res.json(bookings);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// Admin handlers
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').populate('car', 'name brand');
    res.json(bookings);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    );
    res.json(booking);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.deleteBooking = async (req, res) => {
  try { await Booking.findByIdAndDelete(req.params.id); res.json({ message: 'Booking deleted' }); }
  catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const approvedBookings = await Booking.find({ status: 'Approved' });
    const revenue = approvedBookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
    
    // Quick Hack to avoid circular import, importing User/Car here for admin stats
    const User = require('../models/User');
    const Car = require('../models/Car');
    const totalUsers = await User.countDocuments();
    const totalCars = await Car.countDocuments();

    res.json({ totalBookings, totalUsers, totalCars, revenue });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
