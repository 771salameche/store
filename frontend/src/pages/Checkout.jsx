import { Link } from 'react-router-dom';

export default function Checkout() {
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
            <Link to="/cart" className="text-slate-600 hover:text-slate-900">
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800">Checkout</h1>
        <p className="text-slate-500 mt-2">Checkout page coming soon.</p>
      </main>
    </div>
  );
}
