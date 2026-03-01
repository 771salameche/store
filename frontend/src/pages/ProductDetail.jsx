import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../api';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

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
      <div className="flex items-center justify-center py-16 sm:py-24">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <ErrorMessage
        message={error || 'Product not found'}
        backTo="/"
      />
    );
  }

  return (
    <div className="max-w-4xl">
      <Link
        to="/"
        className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4 sm:mb-6 text-sm sm:text-base"
      >
        ← Back to products
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row">
        <div className="sm:w-1/2 aspect-square bg-slate-200 flex items-center justify-center shrink-0">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-slate-400 text-6xl sm:text-8xl">📦</span>
          )}
        </div>
        <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            {product.name}
          </h1>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            ${product.price.toFixed(2)}
          </p>
          {product.description && (
            <p className="text-slate-600 mt-4 text-sm sm:text-base">
              {product.description}
            </p>
          )}
          <p className="text-slate-500 text-sm mt-2">
            In stock: {product.stock}
          </p>
          <div className="mt-auto pt-6">
            <button
              onClick={() => addToCart(product)}
              className="w-full py-3 px-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium text-base sm:text-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
