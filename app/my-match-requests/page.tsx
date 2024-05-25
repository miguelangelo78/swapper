import { getUserById } from '@/lib/db/user_db';
import { MatchResult } from '@/lib/models/Match.types';
import { getSwapperUser } from '@/lib/services/server/user.service';
import MyMatchRequestsClient from './page.client';
import Layout from '@/components/layout/LayoutServer';
import { getMatchRequestsFromMe } from '@/lib/db/match_request_db';

export default async function MyMatchRequestsPage() {
  const user = await getSwapperUser();

  const requestsFromMe = await getMatchRequestsFromMe(user!.id!);
  const matchResults: MatchResult[] = [];

  for (const match of requestsFromMe.filter((r) => r.status === 'PENDING')){
    const otherSwapperUser = (await getUserById(match.otherUserId))!;
    matchResults.push({ otherSwapperUser, matchRequest: match });
  }

  return (
    <Layout>
      <MyMatchRequestsClient myMatchRequests={matchResults} user={user!} />
    </Layout>
  );
}
