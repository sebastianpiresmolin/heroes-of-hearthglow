'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { Divider } from '@nextui-org/divider';

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
      setError('Invalid username or password.');
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
        <div
          className="max-w-[350px] md:max-w-none flex-col justify-center items-center text-trueGray-50 text-xl
         font-regular h-fit w-fit m-auto p-10 shadow-lg shadow-black outline outline-1 outline-zinc-700
         outline-solid rounded-lg bg-neutral-900 "
        >
          <h2>Please use a desktop screen to access the dashboard</h2>
        </div>
      </div>
      <div className="lg:flex justify-center max-w-screen items-center min-h-screen hidden">
        <div
          className="flex flex-col items-center justify-center py-2 bg-neutral-900 w-[375px] h-[500px]
        shadow-lg shadow-black outline outline-1 outline-zinc-700 rounded-lg 2xl:w-[500px] 2xl:h-[700px] text-trueGray-50
        "
        >
          <h1 className="text-4xl text-trueGray-50 p-3">
            {loading ? 'Processing' : 'Welcome'}
          </h1>
          <p className="text-sm text-zinc-400 text-center pb-3">
            Enter your username and password below to login
          </p>
          <input
            className="p-2 my-2 text-trueGray-50 focus:outline-trueGray-50 outline-1 rounded-md 2xl:w-[300px] 2xl:h-[50px]
            bg-zinc-800"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
            required
          />
          <Divider className="my-1 w-2/3 bg-zinc-700 " />
          <input
            className="p-2 my-2 text-trueGray-50 focus:outline-trueGray-50 rounded-md 2xl:w-[300px] 2xl:h-[50px]
            bg-zinc-800"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            required
          />
          <p className="text-red-500">{error}</p>
          <button
            className="bg-trueGray-50 hover:bg-trueGray-200 text-black antialiased py-2 px-4 rounded-md 
            m-1 w-[200px] 2xl:w-[300px] 2xl:h-[50px] mt-2 "
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
