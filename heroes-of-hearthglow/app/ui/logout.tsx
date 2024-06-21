'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

export default function logout() {
  const router = useRouter();
  const { setLoggedIn } = useAuth();

  const logout = async (event: any) => {
    event.preventDefault();
    try {
      await axios.get('/api/auth/logout');
      setLoggedIn(false);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <a onClick={logout}>logga ut</a>
    </div>
  );
}
