import { useEffect, useState, Fragment } from 'react';
import { getOrders } from '../api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Admin() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const credentials = { username: user.username, password: user.password };
    getOrders(credentials)
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user.username, user.password]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 gap-4">
        <Spinner />
        <p className="text-slate-500 text-sm">Loading orders…</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Admin Panel
      </h1>
      <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
        All orders
      </p>

      <div className="bg-white rounded-lg shadow overflow-hidden -mx-4 sm:mx-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50">
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th scope="col" className="px-3 sm:px-4 py-2 sm:py-3 w-10" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-slate-500 text-sm sm:text-base"
                  >
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <Fragment key={order.id}>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-800">
                        {order.id}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-slate-600">
                        {order.customerName}
                      </td>
                      <td className="hidden md:table-cell px-4 py-3 text-sm text-slate-600">
                        {order.customerEmail}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium text-slate-800">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800">
                          {order.status}
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-3 text-sm text-slate-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">
                        {order.items?.length > 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedId(expandedId === order.id ? null : order.id)
                            }
                            className="text-slate-500 hover:text-slate-700 p-1 rounded"
                            aria-expanded={expandedId === order.id}
                          >
                            {expandedId === order.id ? '▼' : '▶'}
                          </button>
                        ) : null}
                      </td>
                    </tr>
                    {expandedId === order.id && order.items?.length > 0 && (
                      <tr>
                        <td colSpan={7} className="px-3 sm:px-4 py-3 bg-slate-50">
                          <div className="text-sm">
                            <p className="font-medium text-slate-700 mb-2">
                              Items
                            </p>
                            <ul className="space-y-1">
                              {order.items.map((item) => (
                                <li
                                  key={item.id}
                                  className="flex justify-between text-slate-600"
                                >
                                  <span>
                                    {item.productName} × {item.quantity}
                                  </span>
                                  <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
