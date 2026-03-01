import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading products…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link to={`/products/${product.id}`}>
                <div className="aspect-square bg-slate-200 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-4xl">📦</span>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-slate-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-lg font-bold text-slate-900 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="w-full py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
