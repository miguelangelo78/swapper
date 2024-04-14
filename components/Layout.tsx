'use client';
import { NextUIProvider } from '@nextui-org/react';
import Footer from './FooterComponent';
import Nav from './NavComponent';
import { User } from 'next-auth';

export default function Layout({ user, children }: { user?: User, children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div className="flex flex-col min-h-screen">
        <Nav user={user} />
        <main className="flex flex-col flex-grow">{children}</main>
        <Footer />
      </div>
    </NextUIProvider>
  );
}
