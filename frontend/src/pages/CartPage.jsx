import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('Pay at Canteen Counter');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const tax = 0; // Canteen student rate: no extra tax
  const grandTotal = subtotal + tax;

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      error('Please sign in or create an account to place your order.');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      error('Your cart is empty!');
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          foodItemId: item.foodItemId,
          quantity: item.quantity,
        })),
        paymentMethod,
        notes,
      };

      const res = await api.post('/orders', orderPayload);

      if (res.data.success) {
        success(`Order #${res.data.order.tokenNumber} placed successfully!`);
        clearCart();
        navigate('/orders');
      }
    } catch (err) {
      console.error('Order error:', err);
      error(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">Your Basket is Empty</h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base font-medium">
          Looks like you haven't added anything to your cart yet. Explore our delicious campus menu and treat yourself!
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all"
        >
          <span>Explore Food Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Review Your Order
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            {totalItems} item{totalItems > 1 ? 's' : ''} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Basket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={item.foodItemId}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                {/* Thumbnail & Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-100 shrink-0 shadow-xs"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">
                      ₹{item.price} each
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Item Total */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <div className="flex items-center bg-slate-100 rounded-xl text-slate-800 font-bold overflow-hidden border border-slate-200">
                    <button
                      onClick={() => updateQuantity(item.foodItemId, -1)}
                      className="p-1.5 sm:px-2.5 sm:py-1.5 hover:bg-slate-200 transition-colors"
                      title="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs sm:text-sm font-bold min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.foodItemId, 1)}
                      className="p-1.5 sm:px-2.5 sm:py-1.5 hover:bg-slate-200 transition-colors"
                      title="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[60px]">
                    <span className="text-base sm:text-lg font-black text-slate-900 block">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.foodItemId)}
                    className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cooking Instructions / Special Request */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra napkins, less spicy, no onions, hot coffee..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30"
              maxLength={150}
            />
          </div>
        </div>

        {/* Right: Payment & Summary Column */}
        <div className="space-y-6">
          {/* Payment Method Selector */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Select Payment Method</h3>
            <div className="space-y-2.5">
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'Pay at Canteen Counter'
                    ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Pay at Canteen Counter'}
                  onChange={() => setPaymentMethod('Pay at Canteen Counter')}
                  className="mt-1 text-orange-500 focus:ring-orange-500 accent-orange-500"
                />
                <div>
                  <p className="font-bold text-slate-900 text-sm">Pay at Canteen Counter</p>
                  <p className="text-xs text-slate-500">Pay cash/card when collecting with your token</p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'UPI / Online Simulated'
                    ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'UPI / Online Simulated'}
                  onChange={() => setPaymentMethod('UPI / Online Simulated')}
                  className="mt-1 text-orange-500 focus:ring-orange-500 accent-orange-500"
                />
                <div>
                  <p className="font-bold text-slate-900 text-sm">UPI / Online (Instant Simulation)</p>
                  <p className="text-xs text-slate-500">Simulated instant approval for demo presentation</p>
                </div>
              </label>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Order Summary</h3>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Campus Student Discount</span>
                <span>FREE Kitchen Service</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Packaging / Taxes</span>
                <span>₹0</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <span className="font-black text-slate-900 text-base">To Pay</span>
                <span className="font-black text-2xl text-orange-600">₹{grandTotal}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Order Token...</span>
                </>
              ) : (
                <>
                  <span>Place Order • ₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Direct Kitchen Dispatch System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
