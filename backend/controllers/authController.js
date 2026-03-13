const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: user.id, name: user.name, email: user.email, role: user.role,
      token: generateToken(user.id, user.role)
    });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.status === 'Locked') {
      return res.status(403).json({ message: 'Account is locked by admin' });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user.id, user.role)
      });
    } else { res.status(401).json({ message: 'Invalid credentials' }); }
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// Admin user management
exports.getUsers = async (req, res) => {
  try { const users = await User.find().select('-password'); res.json(users); }
  catch (error) { res.status(500).json({ error: error.message }); }
};
exports.deleteUser = async (req, res) => {
  try { await User.findByIdAndDelete(req.params.id); res.json({ message: 'User deleted' }); }
  catch (error) { res.status(500).json({ error: error.message }); }
};
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = user.status === 'Active' ? 'Locked' : 'Active';
    await user.save();
    res.json(user);
  } catch (error) { res.status(500).json({ error: error.message }); }
};
