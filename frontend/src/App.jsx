import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Student Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { OrdersPage } from './pages/OrdersPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Admin Components & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageFood } from './pages/admin/ManageFood';
import { ManageOrders } from './pages/admin/ManageOrders';

// Layout wrapper for Student and Public pages
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public & Student Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Student Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/orders" element={<OrdersPage />} />
                </Route>
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute requireAdmin={true} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="food" element={<ManageFood />} />
                  <Route path="orders" element={<ManageOrders />} />
                </Route>
              </Route>

              {/* Catch-all 404 */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex items-center justify-center p-6 text-center">
                    <div className="space-y-4">
                      <h1 className="text-6xl font-black text-orange-500">404</h1>
                      <h2 className="text-2xl font-bold text-slate-800">Page Not Found</h2>
                      <p className="text-slate-500">The page you requested does not exist.</p>
                      <a
                        href="/"
                        className="inline-block px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl"
                      >
                        Back to Home
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
