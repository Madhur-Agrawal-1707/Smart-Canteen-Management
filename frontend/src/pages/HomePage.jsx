import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FoodCard } from '../components/common/FoodCard';
import {
  Search,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  ShieldCheck,
  Zap,
  Coffee,
  Pizza,
  UtensilsCrossed,
  Layers,
} from 'lucide-react';

export const HomePage = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get('/foods');
        if (res.data.success) {
          setFoods(res.data.foods);
        }
      } catch (err) {
        console.error('Error fetching home foods:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  const specials = foods.filter((f) => f.isSpecial);
  const popular = foods.filter((f) => f.isPopular);

  const categories = [
    { name: 'Snacks', icon: '🥟', desc: 'Samosas & Sandwiches' },
    { name: 'Meals', icon: '🍛', desc: 'Thali & Dosas' },
    { name: 'Beverages', icon: '☕', desc: 'Chai & Cold Coffee' },
    { name: 'Fast Food', icon: '🍔', desc: 'Burgers & Pizzas' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-2xl">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-orange-300 text-xs sm:text-sm font-bold mb-6">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Fast, Fresh & Pocket-Friendly Campus Dining</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight sm:leading-none mb-6">
            Order Your Canteen Food <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Without Waiting in Lines
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg mb-10 leading-relaxed font-medium">
            Browse today’s fresh menu, customize your order, and receive a digital token. Pick up your meal hot and ready right from the counter.
          </p>

          {/* Interactive Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto flex items-center bg-white rounded-2xl p-2 shadow-2xl border border-white/20 text-slate-800"
          >
            <div className="flex items-center gap-3 px-3 flex-1">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search burgers, dosas, cold coffee, pasta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Feature Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-4xl mx-auto pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Instant Order</p>
                <p className="text-xs text-slate-400">Digital Token System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Real-Time Prep</p>
                <p className="text-xs text-slate-400">5-15 Mins Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">100% Hygienic</p>
                <p className="text-xs text-slate-400">Quality Checked</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Student Friendly</p>
                <p className="text-xs text-slate-400">Subsidized Prices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore Food Categories
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Browse through our fresh morning, afternoon, and evening selections
            </p>
          </div>
          <Link
            to="/menu"
            className="flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${cat.name}`}
              className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-50 group-hover:bg-orange-500 text-3xl flex items-center justify-center transition-colors duration-300 mb-4 shadow-inner">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's Special Section */}
      {specials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Today's Chef Specials
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  Specially prepared by our head canteen chef for today
                </p>
              </div>
            </div>
            <Link
              to="/menu"
              className="hidden sm:flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700"
            >
              <span>See Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specials.slice(0, 4).map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Dishes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Most Popular on Campus
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Top rated dishes loved by students and faculty alike
              </p>
            </div>
          </div>
          <Link
            to="/menu"
            className="flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            <span>Browse All Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse h-72"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(popular.length > 0 ? popular : foods).slice(0, 8).map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 uppercase tracking-wider">
              Student Advantage
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Pre-Order Before Your Next Lecture Breaks!
            </h3>
            <p className="text-orange-100 text-sm sm:text-base font-medium">
              Save 15 minutes of cafeteria line waiting. Place your order now, check the status on your phone, and collect when ready.
            </p>
          </div>
          <Link
            to="/menu"
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 whitespace-nowrap"
          >
            Order Food Now
          </Link>
        </div>
      </section>
    </div>
  );
};
