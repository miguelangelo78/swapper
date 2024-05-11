'use client';
import { NextUIProvider } from '@nextui-org/react';
import Footer from '../FooterComponent';
import { SessionProvider } from 'next-auth/react';

export default function LayoutClient({ children, nav, ignoreFooter = false }: { children: React.ReactNode, nav: React.ReactNode, ignoreFooter?: boolean }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <div className="flex flex-col min-h-screen">
          {nav}
          <main className="flex flex-col flex-grow">{children}</main>
          {!ignoreFooter &&
            <Footer />
          }
        </div>
      </SessionProvider>
    </NextUIProvider>
  );
}
