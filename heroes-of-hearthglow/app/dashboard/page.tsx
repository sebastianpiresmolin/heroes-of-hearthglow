'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

export default function Dashboard() {
  const router = useRouter();
  const { isLoggedIn, setLoggedIn } = useAuth();

  const logout = async (event: any) => {
    event.preventDefault();
    try {
      await axios.get('/api/users/logout');
      setLoggedIn(false);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <a onClick={logout}>'logga ut'</a>
    </div>
  );
}
