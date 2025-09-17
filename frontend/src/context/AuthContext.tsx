'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    // load from localStorage on mount
    const t = localStorage.getItem('access_token');
    if (t) setTokenState(t);
  }, []);

  const setToken = (t: string | null) => {
    if (t) {
      localStorage.setItem('access_token', t);
    } else {
      localStorage.removeItem('access_token');
    }
    setTokenState(t);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
