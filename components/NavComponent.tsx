import { APP_NAME } from '@/lib/models/globals';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import SignOutComponent from './SignOutComponent';
import { useSession } from 'next-auth/react';

export default function Nav() {
  const { data: session, status } = useSession();

  const user = session?.user!;
  const isLoggedIn = !!user;

  return (
    <nav className="p-4 bg-primary shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-4xl text-white font-bold mr-4 logo">{APP_NAME}</a>
        </div>
        <div>
          {isLoggedIn ? (
            <SignOutComponent />
          ) : (
            <>
              <Button href="/login" as={Link} className="mr-4 p-2 bg-tertiary rounded-lg text-md text-[#6D3AFA] font-medium shadow-md">Login</Button>
              <Button href="/signup" as={Link} className="mr-4 p-2 bg-tertiary rounded-lg text-md text-[#6D3AFA] font-medium shadow-md">Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
};
