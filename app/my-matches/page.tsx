import { getUserById } from '@/lib/db/user_db';
import { MatchResult } from '@/lib/models/Match.types';
import { getSwapperUser } from '@/lib/services/server/user.service';
import MyMatchesClient from './page.client';
import Layout from '@/components/layout/LayoutServer';
import { getMatchRequestsForMe } from '@/lib/db/match_request_db';

export default async function MyMatchesPage() {
  const user = await getSwapperUser();

  const requestsForMe = await getMatchRequestsForMe(user!.id!);
  const matchResults: MatchResult[] = [];

  for (const match of requestsForMe.filter((r) => r.status === 'ACCEPTED')){
    const otherSwapperUser = (await getUserById(match.myUserId))!;
    matchResults.push({ otherSwapperUser, matchRequest: match });
  }

  return (
    <Layout>
      <MyMatchesClient myMatches={matchResults} user={user!} />
    </Layout>
  );
}
