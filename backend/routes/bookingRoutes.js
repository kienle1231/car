const express = require('express');
const { createBooking, getMyBookings, getAllBookings, updateBookingStatus, deleteBooking, getStats } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Public/Customer Routes
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);

// Admin Routes
router.get('/admin/stats', protect, adminOnly, getStats);
router.get('/admin', protect, adminOnly, getAllBookings);
router.put('/admin/:id', protect, adminOnly, updateBookingStatus);
router.delete('/admin/:id', protect, adminOnly, deleteBooking);

module.exports = router;
