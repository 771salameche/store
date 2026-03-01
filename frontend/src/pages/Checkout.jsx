import { useState } from 'react';
import { Link } from 'react-router-dom';
import { placeOrder } from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';

export default function Checkout() {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const order = await placeOrder(
        {
          customerName,
          customerEmail,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        },
        { username: user.username, password: user.password }
      );
      setOrderId(order.id);
      clearCart();
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (orderId !== null) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            Order Confirmed
          </h1>
          <p className="text-slate-600 mb-6 text-sm sm:text-base">
            Thank you for your order. Your order ID is{' '}
            <span className="font-semibold text-slate-800">{orderId}</span>.
          </p>
          <Link
            to="/"
            className="inline-block py-2 px-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
          Checkout
        </h1>
        <p className="text-slate-500 mb-4 text-sm sm:text-base">
          Your cart is empty.
        </p>
        <Link
          to="/cart"
          className="text-slate-600 hover:text-slate-900 underline text-sm sm:text-base"
        >
          View cart
        </Link>
      </>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Checkout
      </h1>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="font-semibold text-slate-800 mb-4 text-sm sm:text-base">
          Order Summary
        </h2>
        <ul className="space-y-2 mb-4 text-sm sm:text-base">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex justify-between text-slate-600"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="font-bold text-slate-800 text-base sm:text-lg border-t border-slate-200 pt-4">
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-4"
      >
        {error && (
          <p className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        )}
        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Name
          </label>
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent text-base"
          />
        </div>
        <div>
          <label
            htmlFor="customerEmail"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Email
          </label>
          <input
            id="customerEmail"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent text-base"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Spinner className="h-5 w-5 border-2" />
              Placing order…
            </>
          ) : (
            'Place Order'
          )}
        </button>
      </form>
    </div>
  );
}
