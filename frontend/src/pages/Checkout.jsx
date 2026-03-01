import { useState } from 'react';
import { Link } from 'react-router-dom';
import { placeOrder } from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

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
      <div className="min-h-screen bg-slate-50">
        <Navbar current="checkout" />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Order Confirmed
            </h1>
            <p className="text-slate-600 mb-6">
              Thank you for your order. Your order ID is{' '}
              <span className="font-semibold text-slate-800">{orderId}</span>.
            </p>
            <Link
              to="/"
              className="inline-block py-2 px-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar current="checkout" />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Checkout</h1>
          <p className="text-slate-500 mb-4">Your cart is empty.</p>
          <Link
            to="/cart"
            className="text-slate-600 hover:text-slate-900 underline"
          >
            View cart
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar current="checkout" />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Checkout</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="font-semibold text-slate-800 mb-4">Order Summary</h2>
          <ul className="space-y-2 mb-4">
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
          <p className="font-bold text-slate-800 text-lg border-t border-slate-200 pt-4">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-4"
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
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Placing order…' : 'Place Order'}
          </button>
        </form>
      </main>
    </div>
  );
}
