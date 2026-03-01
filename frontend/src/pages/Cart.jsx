import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function Cart() {
  const { items, totalPrice, updateQuantity, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar current="cart" />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-slate-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-lg shadow p-4 flex gap-4 items-center"
              >
                <div className="w-20 h-20 shrink-0 bg-slate-200 rounded overflow-hidden flex items-center justify-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-2xl">📦</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${item.productId}`}
                    className="font-medium text-slate-800 hover:text-slate-600 truncate block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-slate-600">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium"
                  >
                    +
                  </button>
                </div>
                <p className="font-medium text-slate-800 w-24 text-right shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:text-red-700 shrink-0 p-1"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <span className="text-lg font-bold text-slate-800">Total</span>
              <span className="text-xl font-bold text-slate-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              className="block w-full py-3 px-6 bg-slate-800 text-white text-center rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
