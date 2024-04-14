import { APP_NAME } from '@/lib/models/globals';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function Nav({ goHome = false }: { goHome?: boolean }) {
  return (
    <>
      <nav className="p-4 bg-primary shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="text-4xl text-white font-bold mr-4 logo">{APP_NAME}</a>
            {
              goHome ? (
                <Link href="/" className="p-2 bg-primary rounded-lg">Home</Link>
              ) : null
            }
          </div>
          <div>
            <Button href="/login" as={Link} className="mr-4 p-2 bg-tertiary rounded-lg text-md text-[#6D3AFA] font-medium shadow-md">Login</Button>
            <Button href="/signup" as={Link} className="mr-4 p-2 bg-tertiary rounded-lg text-md text-[#6D3AFA] font-medium shadow-md">Signup</Button>
          </div>
        </div>
      </nav>
    </>
  )
};
