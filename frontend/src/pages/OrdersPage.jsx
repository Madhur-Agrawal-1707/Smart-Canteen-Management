import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  PackageCheck,
  Flame,
  ArrowRight,
} from 'lucide-react';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await api.get('/orders/my-orders');
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error('Failed to fetch my orders:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Poll every 10 seconds for real-time status updates during demo
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            Order Pending
          </span>
        );
      case 'Preparing':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Preparing in Kitchen
          </span>
        );
      case 'Ready':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white shadow-md shadow-orange-500/25 flex items-center gap-1.5 animate-bounce">
            <PackageCheck className="w-3.5 h-3.5" />
            Ready for Pickup!
          </span>
        );
      case 'Completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Canteen Orders
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Live order tracker • Updates dynamically as kitchen prepares your food
          </p>
        </div>
        <button
          onClick={() => fetchOrders(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors w-fit"
        >
          <RefreshCw className={`w-4 h-4 text-orange-500 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse h-48"></div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No Orders Placed Yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            When you place an order from the canteen menu, its status and token number will show up here.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-sm shadow-md"
          >
            <span>Order Something Delicious</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                order.status === 'Ready'
                  ? 'border-orange-500 ring-2 ring-orange-500/20'
                  : 'border-slate-200/80'
              }`}
            >
              {/* Order Card Header */}
              <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-slate-900 text-white font-mono font-black text-sm rounded-xl">
                    Token #{order.tokenNumber}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Order ID: {order._id.substring(order._id.length - 8)}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Items List */}
              <div className="p-4 sm:p-5 divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-100 shrink-0"
                        />
                      )}
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Qty: <span className="font-semibold text-slate-700">{item.quantity}</span> × ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-slate-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}

                {order.notes && (
                  <div className="pt-3 text-xs text-slate-500 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50 mt-2">
                    <span className="font-bold text-amber-900">Note:</span> {order.notes}
                  </div>
                )}
              </div>

              {/* Footer with Total and Payment Status */}
              <div className="p-4 sm:p-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span>Payment: </span>
                  <span className="font-bold text-slate-700">{order.paymentMethod}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                    order.paymentStatus === 'Paid'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400 mr-2">Total Amount</span>
                  <span className="text-lg font-black text-orange-600">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
