'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [error, setError] = React.useState('');
  const { isLoggedIn, setLoggedIn } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    username: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.post('/api/auth/login', user);
      setLoggedIn(true);
      console.log('isLoggedIn', isLoggedIn);
      router.push('/dashboard');
    } catch (error: any) {
      setError('Invalid email or password. Please try again.');
      console.log('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn);
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        onLogin();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [onLogin]);

  return (
    <main className="max-w-full w-screen min-h-screen bg-zinc-800 ">
      <div className="flex lg:hidden justify-center items-center h-[100vh]">
        <div className="max-w-[350px] md:max-w-none flex-col justify-center items-center text-trueGray-50 text-xl font-regular h-fit w-fit m-auto p-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 outline-solid rounded-lg bg-neutral-900 ">
          <h2>Please use a desktop screen to access the dashboard</h2>
        </div>
      </div>
      <div className="lg:flex justify-center max-w-screen items-center min-h-screen hidden">
        <div
          className="flex flex-col items-center justify-center py-2 bg-gray-300 w-[375px] h-[500px]
        drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] rounded-lg 2xl:w-[500px] 2xl:h-[700px]"
        >
          <Image
            src="/images/home.png"
            width={100}
            height={100}
            alt=""
            className="w-40 2xl:w-60"
          ></Image>
          <h1 className="text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 2xl:text-4xl 2xl: p-4">
            {loading ? 'Processing' : 'Welcome'}
          </h1>
          <input
            className="p-2 my-2 text-black focus:outline-red-700 rounded-md 2xl:w-[300px] 2xl:h-[50px]"
            id="email"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="email"
            required
          />

          <input
            className="p-2 my-2 text-black rounded-md focus:outline-red-700 2xl:w-[300px] 2xl:h-[50px]"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            required
          />
          <p className="text-red-700">{error}</p>
          <button
            className="bg-red-900 hover:bg-red-800 text-white antialiased font-bold py-2 px-4 rounded m-1 w-[200px] 2xl:w-[300px] 2xl:h-[50px]"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
