import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Car, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginAPI(form);
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate(data.role === 'admin' ? '/admin' : '/cars');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <Car className="w-8 h-8 text-black" />
            </div>
          </div>
          <h2 className="text-3xl font-black">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-2">Sign in to your LUXERIDE account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type={showPw ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition disabled:opacity-50">
            {loading ? 'Logging in...' : 'Sign In'}
          </motion.button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account? <Link to="/register" className="text-yellow-400 font-semibold hover:underline">Create one</Link>
        </p>

        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-xs text-gray-500 text-center mb-2">Demo Accounts</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button onClick={() => setForm({ email: 'admin@vip.com', password: 'admin123' })} className="bg-yellow-400/10 text-yellow-400 rounded-lg py-2 hover:bg-yellow-400/20 transition">Admin</button>
            <button onClick={() => setForm({ email: 'user@vip.com', password: 'user123' })} className="bg-white/10 text-white rounded-lg py-2 hover:bg-white/20 transition">Customer</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
