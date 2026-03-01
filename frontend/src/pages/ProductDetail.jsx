import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProduct(Number(id))
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || 'Product not found'}</p>
        <Link to="/" className="text-slate-600 hover:text-slate-900 underline">
          Back to products
        </Link>
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6"
        >
          ← Back to products
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 aspect-square bg-slate-200 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-slate-400 text-8xl">📦</span>
            )}
          </div>
          <div className="md:w-1/2 p-8 flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800">{product.name}</h1>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              ${product.price.toFixed(2)}
            </p>
            {product.description && (
              <p className="text-slate-600 mt-4">{product.description}</p>
            )}
            <p className="text-slate-500 text-sm mt-2">
              In stock: {product.stock}
            </p>
            <div className="mt-auto pt-6">
              <button
                onClick={() => addToCart(product)}
                className="w-full py-3 px-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
