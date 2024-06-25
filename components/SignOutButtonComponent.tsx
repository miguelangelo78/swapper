'use client';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
    <button onClick={handleLogout} className='mr-4 p-2 bg-tertiary rounded-lg text-md text-[#6D3AFA] font-medium shadow-md'>
      Logout
    </button>
  );
};
