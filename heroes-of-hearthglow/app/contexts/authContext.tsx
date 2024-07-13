'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void; // Setter function
}

const AuthContext = createContext<IAuthContext>({
  // Create context with default value
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  // Provider component
  children,
}) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return !!Cookies.get('isLoggedIn');
  });

  useEffect(() => {
    // Update cookie when isLoggedIn changes
    if (isLoggedIn) {
      Cookies.set('isLoggedIn', 'true');
    } else {
      Cookies.remove('isLoggedIn');
    }
  }, [isLoggedIn]);

  return (
    // Provide value to children
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
