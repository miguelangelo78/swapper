'use server';
import { getSwapperUser } from '@/lib/services/server/user.service';
import LayoutClient from './LayoutClient';
import { sessionUser } from '@/lib/services/session.service';
import { getMatchRequestsForMe, getMatchRequestsFromMe } from '@/lib/db/match_request_db';
import React from 'react';
import { MatchContext } from '@/lib/models/Match.types';

export default async function Layout({ children, ignoreFooter = false }: { children: React.ReactNode, ignoreFooter?: boolean }) {
  const session = await sessionUser();

  const swapperUser = session ? await getSwapperUser(session) : null;
  const incomingMatchRequests = swapperUser ? await getMatchRequestsForMe(swapperUser.id!) : [];
  const outgoingMatchRequests = swapperUser ? await getMatchRequestsFromMe(swapperUser.id!) : [];

  const matchContext: MatchContext = {
    received: {
      matchRequests: incomingMatchRequests,
      notifications: incomingMatchRequests.filter(match => match.status === 'PENDING' || match.status === 'ACCEPTED'),
      pending: incomingMatchRequests.filter(match => match.status === 'PENDING'),
      accepted: incomingMatchRequests.filter(match => match.status === 'ACCEPTED'),
    },
    sent: {
      matchRequests: outgoingMatchRequests,
      pending: outgoingMatchRequests.filter(match => match.status === 'PENDING'),
      accepted: outgoingMatchRequests.filter(match => match.status === 'ACCEPTED'),
    },
  };

  return (
    <LayoutClient swapperUser={swapperUser} matchContext={matchContext} ignoreFooter={ignoreFooter} >
      {children}
    </LayoutClient>
  );
}
