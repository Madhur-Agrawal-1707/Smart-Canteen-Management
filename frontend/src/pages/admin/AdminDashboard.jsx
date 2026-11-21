import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import {
  ShoppingBag,
  IndianRupee,
  UtensilsCrossed,
  Clock,
  CheckCircle2,
  AlertCircle,
  PackageCheck,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Plus,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const { success, error } = useToast();

  const fetchStats = async () => {
    try {
      const res = await api.get('/orders/stats/dashboard');
      if (res.data.success) {
        setStats(res.data.stats);
        setRecentOrders(res.data.recentOrders || []);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      if (res.data.success) {
        success(`Order status updated to ${newStatus}`);
        fetchStats();
      }
    } catch (err) {
      error(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-slate-800/60 p-6 rounded-2xl animate-pulse h-32 border border-slate-700"></div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-400',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats?.totalRevenue || 0}`,
      icon: IndianRupee,
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-400',
    },
    {
      title: 'Active Food Items',
      value: stats?.totalFoodItems || 0,
      icon: UtensilsCrossed,
      color: 'from-orange-600 to-amber-600',
      textColor: 'text-orange-400',
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'from-amber-600 to-rose-600',
      textColor: 'text-amber-400',
      highlight: (stats?.pendingOrders || 0) > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Canteen Operations Overview
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Dynamic live metrics calculated directly from database records
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchStats}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
            <span>Refresh</span>
          </button>
          <Link
            to="/admin/food"
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Food Item</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg relative overflow-hidden transition-all ${
              card.highlight ? 'ring-2 ring-amber-500/50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {card.title}
                </p>
                <h3 className="text-3xl font-black text-white mt-1">
                  {card.value}
                </h3>
              </div>
              <div className={`p-3.5 rounded-2xl bg-gradient-to-tr ${card.color} text-white shadow-md`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status Distribution Bar */}
      <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
        <h3 className="text-base font-bold text-white tracking-wide">
          Live Order Status Distribution
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-300 font-medium">Pending</p>
              <p className="text-xl font-black text-amber-200">{stats?.pendingOrders || 0}</p>
            </div>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-300 font-medium">Preparing</p>
              <p className="text-xl font-black text-blue-200">{stats?.preparingOrders || 0}</p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>

          <div className="p-3.5 rounded-xl bg-orange-950/40 border border-orange-800/40 flex items-center justify-between">
            <div>
              <p className="text-xs text-orange-300 font-medium">Ready for Pickup</p>
              <p className="text-xl font-black text-orange-200">{stats?.readyOrders || 0}</p>
            </div>
            <PackageCheck className="w-5 h-5 text-orange-400" />
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-300 font-medium">Completed</p>
              <p className="text-xl font-black text-emerald-200">{stats?.completedOrders || 0}</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Recent Orders Table with Instant Status Updaters */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-hidden shadow-lg">
        <div className="p-6 border-b border-slate-700/80 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">
              Recent Student Orders
            </h3>
            <p className="text-xs text-slate-400">
              Update kitchen progress directly from this dashboard
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No orders found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/60 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3.5 px-6">Token & ID</th>
                  <th className="py-3.5 px-6">Student</th>
                  <th className="py-3.5 px-6">Items</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 font-medium">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-750/50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-400 font-mono font-bold text-xs border border-orange-500/30">
                          #{order.tokenNumber}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {order._id.slice(-6)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <p className="text-white font-bold text-sm">{order.studentName}</p>
                      <p className="text-xs text-slate-400 font-mono">{order.studentEmail}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs text-slate-300 max-w-xs truncate">
                        {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-bold text-white text-base">
                        ₹{order.totalAmount}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                          order.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : order.status === 'Preparing'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : order.status === 'Ready'
                            ? 'bg-orange-500 text-white font-bold animate-pulse'
                            : order.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {order.status === 'Pending' && (
                          <button
                            onClick={() => handleUpdateStatus(order._id, 'Preparing')}
                            disabled={updatingId === order._id}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            Start Prep
                          </button>
                        )}
                        {order.status === 'Preparing' && (
                          <button
                            onClick={() => handleUpdateStatus(order._id, 'Ready')}
                            disabled={updatingId === order._id}
                            className="px-3 py-1 bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            Mark Ready
                          </button>
                        )}
                        {order.status === 'Ready' && (
                          <button
                            onClick={() => handleUpdateStatus(order._id, 'Completed')}
                            disabled={updatingId === order._id}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {order.status === 'Completed' && (
                          <span className="text-xs text-slate-400 font-bold">Done</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
