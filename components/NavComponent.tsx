'use client';
import { APP_NAME } from '@/lib/models/globals';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import SignOutButton from './SignOutButtonComponent';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import NavAvatar from './NavAvatarComponent';
import { useEffect } from 'react';
import { refreshLastLogin } from '@/lib/services/client/user.service';

export default function Nav({ swapperUser, notificationsCount, matchCount, myMatchRequestsCount }: { swapperUser: SwapperUser | null | undefined, notificationsCount: number, matchCount: number, myMatchRequestsCount: number }) {
  useEffect(() => {
    if (swapperUser) {
      refreshLastLogin();
    }
  }, [swapperUser]);
  
  if (!swapperUser) {
    return (
      <nav className="p-4 bg-primary shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-4xl text-white font-bold mr-4 logo">{APP_NAME}</a>
        </div>
        <div>
          <>
            <Button href="/login" as={Link} className="mr-4 p-2 bg-tertiary rounded-lg text-md text-[#6D3AFA] font-medium shadow-md">Login</Button>
            <Button href="/signup" as={Link} className="mr-4 p-2 bg-tertiary rounded-lg text-md text-[#6D3AFA] font-medium shadow-md">Sign Up</Button>
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
          <a href="/" className="text-4xl text-white font-bold mr-4 logo">{APP_NAME}</a>
        </div>
        <div>
          {swapperUser.setupComplete ? (
            <>
              <NavAvatar user={swapperUser} notificationsCount={notificationsCount} matchCount={matchCount} myMatchRequestsCount={myMatchRequestsCount} />
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
