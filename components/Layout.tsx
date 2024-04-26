'use client';
import { NextUIProvider } from '@nextui-org/react';
import Footer from './FooterComponent';
import Nav from './NavComponent';
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children, ignoreFooter = false }: { children: React.ReactNode, ignoreFooter?: boolean }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex flex-col flex-grow">{children}</main>
          {!ignoreFooter &&
            <Footer />
          }
        </div>
      </SessionProvider>
    </NextUIProvider>
  );
}
