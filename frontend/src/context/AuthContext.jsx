import { createContext, useContext, useState } from 'react';

const AUTH_KEY = 'store_auth';

const AuthContext = createContext(null);

function loadStoredUser() {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    localStorage.removeItem(AUTH_KEY);
  }
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);

  const login = (username, password, role) => {
    const data = { username, password, role };
    setUser(data);
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
