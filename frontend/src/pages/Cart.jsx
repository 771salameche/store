import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-slate-800">
            Store
          </Link>
          <nav className="flex gap-4">
            <Link to="/" className="text-slate-600 hover:text-slate-900">
              Products
            </Link>
            <Link to="/cart" className="text-slate-600 hover:text-slate-900 font-medium">
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-slate-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
              >
                <span className="font-medium">{product.name}</span>
                <span className="text-slate-600">
                  {quantity} × ${product.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
