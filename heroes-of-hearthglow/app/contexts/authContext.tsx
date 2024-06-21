'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return !!Cookies.get('isLoggedIn');
  });

  useEffect(() => {
    if (isLoggedIn) {
      Cookies.set('isLoggedIn', 'true');
    } else {
      Cookies.remove('isLoggedIn');
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
