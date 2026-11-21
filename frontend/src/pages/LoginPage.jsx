import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Utensils, LogIn, Shield, GraduationCap, Lock, Mail } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      error('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      success(`Welcome back, ${result.user.name}!`);
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(location.state?.from || '/');
      }
    } else {
      error(result.message);
    }
  };

  const handleDemoLogin = async (role) => {
    let demoEmail = '';
    let demoPass = '';

    if (role === 'student') {
      demoEmail = 'student@canteen.com';
      demoPass = 'student123';
    } else {
      demoEmail = 'admin@canteen.com';
      demoPass = 'admin123';
    }

    setEmail(demoEmail);
    setPassword(demoPass);

    setLoading(true);
    const result = await login(demoEmail, demoPass);
    setLoading(false);

    if (result.success) {
      success(`Logged in as demo ${result.user.role}!`);
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      error(result.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-orange-500/25">
            <Utensils className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Sign In to CampusBites
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Access your orders, quick food pickup, or canteen dashboard
          </p>
        </div>

        {/* 1-Click Demo Presentation Credentials Box */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-orange-800 tracking-wider">
              College Presentation 1-Click Login
            </span>
            <span className="text-[10px] font-bold bg-orange-200 text-orange-900 px-2 py-0.5 rounded-full">
              Instant Demo
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleDemoLogin('student')}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-orange-200 text-slate-800 font-bold text-xs hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-xs active:scale-95"
            >
              <GraduationCap className="w-4 h-4 text-orange-500" />
              <span>Student Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-orange-200 text-slate-800 font-bold text-xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-xs active:scale-95"
            >
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="student@canteen.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-orange-600 hover:text-orange-700">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
