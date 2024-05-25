'use client';
import { NextUIProvider } from '@nextui-org/react';
import Footer from '../FooterComponent';
import { SessionProvider } from 'next-auth/react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import Nav from '../NavComponent';
import { MatchContext } from '@/lib/models/Match.types';
import React, { createContext, useContext } from 'react';

const LayoutContext = createContext({ matchContext: {} as MatchContext });

export function useLayoutContext() {
  return useContext(LayoutContext);
}

export default function LayoutClient({ children, swapperUser, matchContext, ignoreFooter = false }
  : { children: React.ReactNode, swapperUser: SwapperUser | null | undefined, matchContext: MatchContext, ignoreFooter?: boolean }) {

  return (
    <LayoutContext.Provider value={{ matchContext }}>
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
    </LayoutContext.Provider>
  );
}
