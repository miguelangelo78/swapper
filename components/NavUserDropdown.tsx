import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function NavUserDropdown({ user }: { user: SwapperUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full object-cover object-center cursor-pointer mx-10 border border-secondary" />
      </button>

      {/** Display the div below on image click: */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
          <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
          <a href="" onClick={async () => await signOut({ redirect: true, callbackUrl: '/' })} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
        </div>
      )}
    </div>
  );
}
