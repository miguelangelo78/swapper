'use server';
import { getSwapperUser } from '@/lib/services/server/user.service';
import LayoutClient from './LayoutClient';
import { sessionUser } from '@/lib/services/session.service';

export default async function Layout({ children, ignoreFooter = false }: { children: React.ReactNode, ignoreFooter?: boolean }) {
  const session = await sessionUser();
  const swapperUser = session ? await getSwapperUser(session) : null;

  return (
    <LayoutClient swapperUser={swapperUser} ignoreFooter={ignoreFooter}>
      {children}
    </LayoutClient>
  );
}
