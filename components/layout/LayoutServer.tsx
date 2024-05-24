'use server';
import { getSwapperUser } from '@/lib/services/server/user.service';
import LayoutClient from './LayoutClient';
import { sessionUser } from '@/lib/services/session.service';
import { getMatchRequestsForMe, getMatchRequestsFromMe } from '@/lib/db/match_request_db';

export default async function Layout({ children, ignoreFooter = false }: { children: React.ReactNode, ignoreFooter?: boolean }) {
  const session = await sessionUser();
  const swapperUser = session ? await getSwapperUser(session) : null;
  const incomingMatchResults = swapperUser ? await getMatchRequestsForMe(swapperUser.id!) : [];
  const outgoingMatchResults = swapperUser ? await getMatchRequestsFromMe(swapperUser.id!) : [];

  return (
    <LayoutClient swapperUser={swapperUser} ignoreFooter={ignoreFooter} incomingMatchResults={incomingMatchResults} outgoingMatchResults={outgoingMatchResults}>
      {children}
    </LayoutClient>
  );
}
