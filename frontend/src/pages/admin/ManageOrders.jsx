import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import {
  ShoppingBag,
  RefreshCw,
  Clock,
  CheckCircle2,
  PackageCheck,
  AlertCircle,
  TrendingUp,
  User,
  Filter,
} from 'lucide-react';

export const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const { success, error } = useToast();

  const statuses = ['All', 'Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

  const fetchOrders = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const params = {};
      if (filterStatus !== 'All') params.status = filterStatus;

      const res = await api.get('/orders', { params });
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);
    return () => clearInterval(interval);
  }, [filterStatus]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      if (res.data.success) {
        success(res.data.message);
        fetchOrders();
      }
    } catch (err) {
      error(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Preparing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Ready':
        return 'bg-orange-500 text-white font-black animate-pulse';
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Cancelled':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Manage Student Orders
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Track kitchen preparation, transition order statuses, and fulfill tokens
          </p>
        </div>
        <button
          onClick={() => fetchOrders(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm font-bold hover:bg-slate-700 transition-colors w-fit"
        >
          <RefreshCw className={`w-4 h-4 text-orange-400 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterStatus === st
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-slate-800/60 p-6 rounded-2xl animate-pulse h-56 border border-slate-700"></div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-slate-800/80 rounded-2xl p-12 text-center border border-slate-700 text-slate-400">
          No orders found matching the selected status.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`bg-slate-800/90 rounded-2xl border p-5 space-y-4 shadow-lg transition-all ${
                order.status === 'Ready'
                  ? 'border-orange-500 ring-2 ring-orange-500/30'
                  : 'border-slate-700/80'
              }`}
            >
              {/* Header: Token, Student & Status */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-400 font-mono font-black text-sm border border-orange-500/30">
                    Token #{order.tokenNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">
                      {order.studentName}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {order.studentEmail}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-2">
                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Ordered Items
                </p>
                <div className="bg-slate-900/60 rounded-xl p-3 divide-y divide-slate-800 text-xs">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-1.5 first:pt-0 last:pb-0 flex justify-between items-center text-slate-300">
                      <span className="font-medium">
                        {item.name} <span className="text-orange-400 font-bold">× {item.quantity}</span>
                      </span>
                      <span className="font-bold text-white">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <p className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 p-2 rounded-lg">
                    <span className="font-bold">Instructions:</span> {order.notes}
                  </p>
                )}
              </div>

              {/* Amount & Time */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div>
                  <span>Payment: </span>
                  <span className="font-bold text-slate-200">{order.paymentMethod}</span>
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    order.paymentStatus === 'Paid'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 mr-1.5">Total:</span>
                  <span className="text-base font-black text-white">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>

              {/* Action Buttons to Transition Status */}
              <div className="pt-3 border-t border-slate-700/80 flex flex-wrap gap-2">
                {order.status === 'Pending' && (
                  <button
                    onClick={() => handleUpdateStatus(order._id, 'Preparing')}
                    disabled={updatingId === order._id}
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Accept & Prepare</span>
                  </button>
                )}

                {order.status === 'Preparing' && (
                  <button
                    onClick={() => handleUpdateStatus(order._id, 'Ready')}
                    disabled={updatingId === order._id}
                    className="flex-1 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>Mark Ready for Pickup</span>
                  </button>
                )}

                {order.status === 'Ready' && (
                  <button
                    onClick={() => handleUpdateStatus(order._id, 'Completed')}
                    disabled={updatingId === order._id}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Completed</span>
                  </button>
                )}

                {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                  <button
                    onClick={() => handleUpdateStatus(order._id, 'Cancelled')}
                    disabled={updatingId === order._id}
                    className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 font-bold text-xs transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
