'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

export default function SideNav() {
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
    <div className="flex h-full flex-col px-3 py-4 bg-zinc-800 text-center">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-neutral-900 md:block"></div>
        <button
          className="flex h-[48px] outline outline-1 outline-zinc-700 w-full grow items-center justify-center gap-2 rounded-md bg-neutral-900 p-3 text-sm 
          font-medium hover:bg-neutral-800 hover:text-trueGray-100 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={logout}
        >
          <PowerIcon className="w-6 text-trueGray-50" />
          <div className="hidden md:block text-trueGray-50">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
