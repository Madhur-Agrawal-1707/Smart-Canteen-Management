import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Heart, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                Campus<span className="text-orange-500">Bites</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Next-generation smart canteen ordering system designed for college campuses. Order in seconds, skip the queues, and enjoy hot food.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Canteen Kitchen Open
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-orange-400 transition-colors">
                  Today's Full Menu
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-orange-400 transition-colors">
                  My Food Basket
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-orange-400 transition-colors">
                  Live Order Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Canteen Hours & Info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide">Canteen Hours</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Mon - Sat: 8:00 AM – 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Ground Floor, Central Student Block</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Canteen Helpdesk: Ext. 402</span>
              </div>
            </div>
          </div>

          {/* Presentation & Demo Badge */}
          <div className="space-y-3 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>College Mini Project 2026</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full-Stack MERN Architecture with RESTful APIs, JWT Authentication, and Real-Time Order Lifecycle Tracking.
            </p>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700">
              Admin: admin@canteen.com<br />
              Student: student@canteen.com
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CampusBites Smart Canteen System. Built for Academic Presentation.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for College Students
          </p>
        </div>
      </div>
    </footer>
  );
};
