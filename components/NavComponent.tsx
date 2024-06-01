'use client';
import { APP_NAME } from '@/lib/models/globals';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import SignOutButton from './SignOutButtonComponent';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import NavAvatar from './NavAvatarComponent';
import { useEffect } from 'react';
import { refreshLastLogin } from '@/lib/services/client/user.service';

export default function Nav({ swapperUser }: { swapperUser: SwapperUser | null | undefined }) {
  const earlyVersionChip = <span className='inline-block ml-2 bg-tertiary text-primary font-bold text-base px-2 rounded-md shadow-xl select-none'>Beta</span>;

  useEffect(() => {
    if (swapperUser) {
      refreshLastLogin();
    }
  }, [swapperUser]);
  
  if (!swapperUser) {
    return (
      <nav className="p-4 bg-primary shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className='w-3/6'>
            <a href="/" className="text-4xl text-white font-bold logo">{APP_NAME}</a>
            {earlyVersionChip}
          </div>
          <div className='flex gap-1'>
            <>
              <Button href="/login" as={Link} className="p-2 bg-tertiary rounded-lg text-md text-[#6D3AFA] font-medium shadow-md">Login</Button>
              <Button href="/signup" as={Link} className="p-2 bg-tertiary rounded-lg text-md text-[#6D3AFA] font-medium shadow-md">Sign Up</Button>
            </>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="p-4 bg-primary shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-4xl text-white font-bold logo">{APP_NAME}</a>
          {earlyVersionChip}
        </div>
        <div>
          {swapperUser.setupComplete ? (
            <>
              <NavAvatar user={swapperUser} />
            </>
          ) : (
            <>
              <SignOutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  )
};
