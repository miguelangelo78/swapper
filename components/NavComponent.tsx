import { APP_NAME } from '@/lib/models/globals';
import Link from 'next/link';

export default function Nav({ goHome = false }: { goHome?: boolean }) {
  return (
    <>
      <nav className="p-4 primary shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="text-3xl text-white font-bold mr-4">{APP_NAME}</a>
            {
              goHome ? (
                <Link href="/" className="p-2 primary rounded-lg">Home</Link>
              ) : null
            }
          </div>
          <div>
            <Link href="/login" className="mr-4 p-2 tertiary rounded-lg">Login</Link>
            <Link href="/signup" className="mr-4 p-2 tertiary rounded-lg">Signup</Link>
          </div>
        </div>
      </nav>
    </>
  )
};
