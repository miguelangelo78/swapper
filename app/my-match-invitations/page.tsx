import { getUserById } from '@/lib/db/user_db';
import { MatchResult } from '@/lib/models/Match.types';
import { getSwapperUser } from '@/lib/services/server/user.service';
import MyMatchRequestsClient from './page.client';
import Layout from '@/components/layout/LayoutServer';
import { getMatchRequestsForMe } from '@/lib/db/match_request_db';

export default async function MyMatchInvitationsPage() {
  const user = await getSwapperUser();

  const requestsForMe = await getMatchRequestsForMe(user!.id!);
  const matchResults: MatchResult[] = [];

  for (const match of requestsForMe.filter((r) => r.status === 'PENDING')){
    const otherSwapperUser = (await getUserById(match.myUserId))!;
    matchResults.push({ otherSwapperUser, matchRequest: match });
  }

  return (
    <Layout>
      <MyMatchRequestsClient myMatchInvitations={matchResults} user={user!} />
    </Layout>
  );
}
