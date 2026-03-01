import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { verifyCredentials } from '../api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { role } = await verifyCredentials({ username, password });
      login(username, password, role);
      navigate(state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Login
      </h1>
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
            htmlFor="username"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent text-base"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent text-base"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Spinner className="h-5 w-5 border-2" />
              Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>
      <p className="mt-4 text-center text-slate-500 text-sm">
        <Link to="/" className="text-slate-600 hover:text-slate-900 underline">
          Back to products
        </Link>
      </p>
    </div>
  );
}
