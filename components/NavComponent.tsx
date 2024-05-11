'use server';
import { APP_NAME } from '@/lib/models/globals';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import SignOutComponent from './SignOutComponent';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import NavAvatar from './NavAvatarComponent';
import { refreshLastLogin } from '@/lib/services/server/user.service';

export default async function Nav({ swapperUser }: { swapperUser: SwapperUser | null | undefined}) {
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

  refreshLastLogin(swapperUser);

  return (
    <nav className="p-4 bg-primary shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-4xl text-white font-bold mr-4 logo">{APP_NAME}</a>
        </div>
        <div>
          {swapperUser.setupComplete ? (
            <>
              <NavAvatar user={swapperUser} />
            </>
          ) : (
            <>
              <SignOutComponent />
            </>
          )}
        </div>
      </div>
    </nav>
  )
};
