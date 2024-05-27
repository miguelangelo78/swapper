import { getUserById } from '@/lib/db/user_db';
import { MatchResult } from '@/lib/models/Match.types';
import { getSwapperUser } from '@/lib/services/server/user.service';
import MyMatchesClient from './page.client';
import Layout from '@/components/layout/LayoutServer';
import { getMatchRequestsForMe, getMatchRequestsFromMe } from '@/lib/db/match_request_db';

export default async function MyMatchesPage() {
  const user = await getSwapperUser();

  const requestsForMe = await getMatchRequestsForMe(user!.id!);
  const requestsFromMe = await getMatchRequestsFromMe(user!.id!);
  let allRequests = [...requestsForMe, ...requestsFromMe];
  // Remove reverse duplicates
  allRequests = allRequests.filter((r) => {
    const reverseRequest = allRequests.find((rr) => rr.myUserId === r.otherUserId && rr.otherUserId === r.myUserId);
    return !reverseRequest || r.createdAt > reverseRequest.createdAt;
  });

  const matchResults: MatchResult[] = [];

  for (const match of allRequests.filter((r) => r.status === 'ACCEPTED')) {
    const otherUserId = match.myUserId === user!.id ? match.otherUserId : match.myUserId;
    const otherSwapperUser = (await getUserById(otherUserId))!;
    matchResults.push({ otherSwapperUser, matchRequest: match });
  }

  return (
    <Layout>
      <MyMatchesClient myMatches={matchResults} user={user!} />
    </Layout>
  );
}
