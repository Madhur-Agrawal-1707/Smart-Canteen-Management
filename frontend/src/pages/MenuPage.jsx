import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { FoodCard } from '../components/common/FoodCard';
import {
  Search,
  SlidersHorizontal,
  X,
  Filter,
  Check,
  UtensilsCrossed,
} from 'lucide-react';

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', 'Snacks', 'Meals', 'Beverages', 'Fast Food'];

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (search.trim()) params.search = search.trim();
        if (availableOnly) params.available = true;

        const res = await api.get('/foods', { params });
        if (res.data.success) {
          setFoods(res.data.foods);
        }
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [selectedCategory, search, availableOnly]);

  // Sort foods
  const sortedFoods = [...foods].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // default
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearch('');
    setAvailableOnly(false);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
            Campus Dining Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-2 mb-3">
            Today's Fresh Canteen Menu
          </h1>
          <p className="text-orange-100 text-sm sm:text-base font-medium">
            Explore freshly cooked snacks, full meals, cold beverages, and chef specials prepared with hygiene.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        {/* Row 1: Search bar + Sort selector */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by food name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
            >
              <option value="popular">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Available only toggle */}
            <label className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 cursor-pointer select-none hover:bg-slate-100">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="rounded text-orange-500 focus:ring-orange-500 w-4 h-4 accent-orange-500"
              />
              <span className="whitespace-nowrap">Available Only</span>
            </label>
          </div>
        </div>

        {/* Row 2: Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}

          {(selectedCategory !== 'All' || search || availableOnly) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1 transition-colors ml-auto shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Food Items Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-slate-500">
            Showing <span className="text-slate-900">{sortedFoods.length}</span> items
            {selectedCategory !== 'All' && <span> in {selectedCategory}</span>}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse h-80"
              ></div>
            ))}
          </div>
        ) : sortedFoods.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No Food Items Found</h3>
            <p className="text-sm text-slate-500">
              We couldn't find any dish matching your current search or category filter.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-sm shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
