import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Car, Calendar, DollarSign, Trash2, Lock, Unlock, Check, X, BarChart3, UserCog, CarFront, BookOpen } from 'lucide-react';
import { getStatsAPI, getUsersAPI, deleteUserAPI, toggleUserStatusAPI, getCarsAPI, createCarAPI, deleteCarAPI, getAllBookingsAPI, updateBookingStatusAPI } from '../services/api';
import toast from 'react-hot-toast';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'users', label: 'Users', icon: <UserCog className="w-4 h-4" /> },
  { id: 'cars', label: 'Cars', icon: <CarFront className="w-4 h-4" /> },
  { id: 'bookings', label: 'Bookings', icon: <BookOpen className="w-4 h-4" /> },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAddCar, setShowAddCar] = useState(false);
  const [newCar, setNewCar] = useState({ name:'', brand:'', pricePerDay:'', type:'Sedan', description:'', imageUrl:'', seats:5, transmission:'Auto', fuelType:'Gasoline', rating:4.5 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, usersRes, carsRes, bookingsRes] = await Promise.all([
        getStatsAPI(), getUsersAPI(), getCarsAPI(), getAllBookingsAPI()
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setCars(carsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) { console.error(err); }
  };

  const handleDeleteUser = async (id) => { await deleteUserAPI(id); toast.success('User deleted'); loadData(); };
  const handleToggleUser = async (id) => { await toggleUserStatusAPI(id); toast.success('Updated'); loadData(); };
  const handleDeleteCar = async (id) => { await deleteCarAPI(id); toast.success('Car removed'); loadData(); };
  const handleBookingStatus = async (id, status) => { await updateBookingStatusAPI(id, status); toast.success(`Booking ${status}`); loadData(); };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      await createCarAPI({ ...newCar, pricePerDay: Number(newCar.pricePerDay), seats: Number(newCar.seats), rating: Number(newCar.rating) });
      toast.success('Car added!'); setShowAddCar(false); loadData();
      setNewCar({ name:'', brand:'', pricePerDay:'', type:'Sedan', description:'', imageUrl:'', seats:5, transmission:'Auto', fuelType:'Gasoline', rating:4.5 });
    } catch (err) { toast.error('Failed to add car'); }
  };

  const statCards = [
    { icon: <Users className="w-6 h-6" />, label: 'Total Users', value: stats.totalUsers || 0, color: 'from-blue-500 to-blue-600' },
    { icon: <Car className="w-6 h-6" />, label: 'Total Cars', value: stats.totalCars || 0, color: 'from-emerald-500 to-emerald-600' },
    { icon: <Calendar className="w-6 h-6" />, label: 'Total Bookings', value: stats.totalBookings || 0, color: 'from-purple-500 to-purple-600' },
    { icon: <DollarSign className="w-6 h-6" />, label: 'Revenue', value: `$${stats.revenue || 0}`, color: 'from-yellow-400 to-amber-500' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-black mb-8">
          Admin <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Dashboard</span>
        </motion.h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition ${tab === t.id ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* DASHBOARD TAB */}
          {tab === 'dashboard' && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 shadow-lg`}>{s.icon}</div>
                    <p className="text-sm text-gray-500">{s.label}</p>
                    <p className="text-3xl font-black mt-1">{s.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* USERS TAB */}
          {tab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/10 text-gray-400">
                    <th className="py-4 px-6 text-left">Name</th><th className="py-4 px-6 text-left">Email</th><th className="py-4 px-6">Role</th><th className="py-4 px-6">Status</th><th className="py-4 px-6">Actions</th>
                  </tr></thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="py-4 px-6 font-medium">{u.name}</td>
                        <td className="py-4 px-6 text-gray-400">{u.email}</td>
                        <td className="py-4 px-6 text-center"><span className={`px-3 py-1 rounded-full text-xs ${u.role === 'admin' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-white/10 text-gray-400'}`}>{u.role}</span></td>
                        <td className="py-4 px-6 text-center"><span className={`px-3 py-1 rounded-full text-xs ${u.status === 'Active' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>{u.status}</span></td>
                        <td className="py-4 px-6 text-center space-x-2">
                          <button onClick={() => handleToggleUser(u._id)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition" title={u.status === 'Active' ? 'Lock' : 'Unlock'}>
                            {u.status === 'Active' ? <Lock className="w-4 h-4 text-yellow-400" /> : <Unlock className="w-4 h-4 text-green-400" />}
                          </button>
                          <button onClick={() => handleDeleteUser(u._id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition"><Trash2 className="w-4 h-4 text-red-400" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* CARS TAB */}
          {tab === 'cars' && (
            <motion.div key="cars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={() => setShowAddCar(!showAddCar)} className="mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-yellow-500/30 transition">
                + Add New Car
              </button>

              {showAddCar && (
                <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onSubmit={handleAddCar}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['name','brand','pricePerDay','type','description','imageUrl'].map(field => (
                    <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={newCar[field]} onChange={(e) => setNewCar({...newCar, [field]: e.target.value})} required
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-yellow-400/50 focus:outline-none" />
                  ))}
                  <button type="submit" className="md:col-span-3 bg-yellow-400 text-black py-3 rounded-xl font-bold">Add Car</button>
                </motion.form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map(c => (
                  <div key={c._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                    <img src={c.imageUrl} alt={c.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold">{c.name}</h3>
                      <p className="text-sm text-gray-500">{c.brand} · ${c.pricePerDay}/day</p>
                      <button onClick={() => handleDeleteCar(c._id)} className="mt-3 flex items-center gap-1 text-red-400 text-sm hover:text-red-300"><Trash2 className="w-4 h-4" /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BOOKINGS TAB */}
          {tab === 'bookings' && (
            <motion.div key="bookings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="space-y-4">
                {bookings.map(b => (
                  <div key={b._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold flex items-center gap-2"><Car className="w-5 h-5 text-yellow-400" /> {b.car?.name || 'Unknown'}</h3>
                      <p className="text-sm text-gray-500 mt-1">Customer: {b.user?.name || 'Unknown'} ({b.user?.email})</p>
                      <p className="text-sm text-gray-500">Pickup: {new Date(b.pickupDate).toLocaleDateString()} → Return: {new Date(b.returnDate).toLocaleDateString()}</p>
                      <p className="text-yellow-400 font-bold mt-1">${b.totalPrice}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${b.status === 'Pending' ? 'bg-yellow-400/10 text-yellow-400' : b.status === 'Approved' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>{b.status}</span>
                      {b.status === 'Pending' && (
                        <>
                          <button onClick={() => handleBookingStatus(b._id, 'Approved')} className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20"><Check className="w-4 h-4 text-green-400" /></button>
                          <button onClick={() => handleBookingStatus(b._id, 'Cancelled')} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20"><X className="w-4 h-4 text-red-400" /></button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && <p className="text-center text-gray-500 py-10">No bookings yet</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
