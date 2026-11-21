import React from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Minus, Clock, Star, ShoppingBag, Check } from 'lucide-react';

export const FoodCard = ({ food }) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { success, error } = useToast();

  const quantity = getItemQuantity(food._id);

  const handleAdd = () => {
    if (!food.available) {
      error(`Sorry, ${food.name} is currently out of stock!`);
      return;
    }
    addToCart(food);
    success(`Added ${food.name} to cart!`);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-100">
        <img
          src={food.image}
          alt={food.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            !food.available ? 'grayscale opacity-75' : ''
          }`}
          loading="lazy"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
            {food.category}
          </span>
          {food.isSpecial && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500 text-white shadow-sm animate-pulse">
              Today's Special
            </span>
          )}
        </div>

        {/* Availability Pill */}
        <div className="absolute top-3 right-3">
          {food.available ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/90 backdrop-blur-md text-white shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              Available
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800/90 backdrop-blur-md text-white shadow-sm">
              Out of Stock
            </span>
          )}
        </div>

        {/* Rating and Prep Time bottom bar */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-white text-xs font-bold">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{food.rating || 4.5}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-white text-xs font-medium">
            <Clock className="w-3 h-3 text-slate-300" />
            <span>{food.preparationTime || '10 mins'}</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
              {food.name}
            </h3>
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {food.description}
          </p>
        </div>

        {/* Footer: Price & Add to Cart button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Price
            </span>
            <span className="text-xl font-black text-slate-900">
              ₹{food.price}
            </span>
          </div>

          <div>
            {!food.available ? (
              <span className="text-xs font-bold text-slate-400 px-3 py-2 bg-slate-100 rounded-xl block">
                Unavailable
              </span>
            ) : quantity > 0 ? (
              <div className="flex items-center bg-orange-500 rounded-xl text-white font-bold shadow-md shadow-orange-500/30 overflow-hidden">
                <button
                  onClick={() => updateQuantity(food._id, -1)}
                  className="px-2.5 py-1.5 hover:bg-orange-600 transition-colors"
                  title="Decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-2 text-sm font-black min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(food._id, 1)}
                  className="px-2.5 py-1.5 hover:bg-orange-600 transition-colors"
                  title="Increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-4 py-2 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white font-bold text-sm rounded-xl border border-orange-200 hover:border-orange-500 shadow-xs hover:shadow-md transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
