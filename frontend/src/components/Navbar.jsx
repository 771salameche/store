import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function getCurrent(pathname) {
  if (pathname === '/') return 'products';
  if (pathname.startsWith('/cart')) return 'cart';
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname.startsWith('/login')) return 'login';
  if (pathname.startsWith('/checkout')) return 'checkout';
  return null;
}

export default function Navbar() {
  const { pathname } = useLocation();
  const current = getCurrent(pathname);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', key: 'products' },
    {
      to: '/cart',
      label: 'Cart',
      key: 'cart',
      badge: itemCount > 0 ? itemCount : null,
    },
  ];
  if (user?.role === 'ADMIN') {
    navLinks.push({ to: '/admin', label: 'Admin', key: 'admin' });
  }

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link
            to="/"
            className="text-lg sm:text-xl font-semibold text-slate-800 shrink-0"
          >
            Store
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>

          <nav
            className={`absolute sm:relative top-14 left-0 right-0 sm:top-auto sm:left-auto sm:right-auto bg-white sm:bg-transparent border-b sm:border-0 border-slate-200 sm:flex sm:items-center sm:gap-4 ${
              mobileOpen ? 'flex flex-col pb-4' : 'hidden'
            }`}
          >
            {navLinks.map(({ to, label, key, badge }) => (
              <Link
                key={key}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`block sm:inline px-4 py-3 sm:py-0 ${
                  current === key ? 'font-medium' : ''
                } text-slate-600 hover:text-slate-900 flex items-center gap-1`}
              >
                {label}
                {badge != null && (
                  <span className="bg-slate-800 text-white text-xs px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="block sm:inline w-full sm:w-auto text-left sm:text-center px-4 py-3 sm:py-0 text-slate-600 hover:text-slate-900 font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className={`block sm:inline px-4 py-3 sm:py-0 ${
                  current === 'login' ? 'font-medium' : ''
                } text-slate-600 hover:text-slate-900`}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
