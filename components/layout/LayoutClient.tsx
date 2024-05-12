'use client';
import { NextUIProvider } from '@nextui-org/react';
import Footer from '../FooterComponent';
import { SessionProvider } from 'next-auth/react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import Nav from '../NavComponent';

export default function LayoutClient({ children, swapperUser, ignoreFooter = false }: { children: React.ReactNode, swapperUser: SwapperUser | null | undefined, ignoreFooter?: boolean }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <div className="flex flex-col min-h-screen">
          <Nav swapperUser={swapperUser} />
          <main className="flex flex-col flex-grow">{children}</main>
          {!ignoreFooter &&
            <Footer />
          }
        </div>
      </SessionProvider>
    </NextUIProvider>
  );
}
