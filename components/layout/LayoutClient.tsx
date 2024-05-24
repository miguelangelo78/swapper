'use client';
import { NextUIProvider } from '@nextui-org/react';
import Footer from '../FooterComponent';
import { SessionProvider } from 'next-auth/react';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import Nav from '../NavComponent';
import { MatchRequest } from '@/lib/models/Match.types';

export default function LayoutClient({ children, swapperUser, incomingMatchResults, outgoingMatchResults, ignoreFooter = false }
  : { children: React.ReactNode, swapperUser: SwapperUser | null | undefined, incomingMatchResults: MatchRequest[], outgoingMatchResults: MatchRequest[], ignoreFooter?: boolean }) {
  const notifications = incomingMatchResults.filter(match => match.status === 'PENDING' || match.status === 'ACCEPTED');
  const acceptedMatches = incomingMatchResults.filter(match => match.status === 'ACCEPTED');
  const myMatchRequests = outgoingMatchResults.filter(match => match.status === 'PENDING');

  return (
    <NextUIProvider>
      <SessionProvider>
        <div className="flex flex-col min-h-screen">
          <Nav swapperUser={swapperUser} notificationsCount={notifications.length} matchCount={acceptedMatches.length} myMatchRequestsCount={myMatchRequests.length} />
          <main className="flex flex-col flex-grow">{children}</main>
          {!ignoreFooter &&
            <Footer />
          }
        </div>
      </SessionProvider>
    </NextUIProvider>
  );
}
