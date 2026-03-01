import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar({ current }) {
  const { itemCount } = useCart();

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-slate-800">
          Store
        </Link>
        <nav className="flex gap-4 items-center">
          <Link
            to="/"
            className={`${current === 'products' ? 'font-medium' : ''} text-slate-600 hover:text-slate-900`}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className={`${current === 'cart' ? 'font-medium' : ''} text-slate-600 hover:text-slate-900 flex items-center gap-1`}
          >
            Cart
            {itemCount > 0 && (
              <span className="bg-slate-800 text-white text-xs px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
