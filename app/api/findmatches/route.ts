import { findMatchesForUser } from '@/lib/db/user_db';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { verifyLoggedUser } from '../utils';
import { getMatchRequestsFromMe } from '@/lib/db/match_request_db';
import { MatchResult } from '@/lib/models/Match.types';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const user = await verifyLoggedUser();
  if (user instanceof Response) {
    return user;
  }

  const possibleMatches = await findMatchesForUser(user);
  const myMatches = await getMatchRequestsFromMe(user.id!);

  // Combine userMatches and myMatches into a single array
  const matches: MatchResult[] = possibleMatches.map((possibleMatch) => {
    return {
      otherSwapperUser: possibleMatch,
      matchRequest: myMatches.find((myMatch) => myMatch.otherUserId === possibleMatch.id),
    };
  });

  return Response.json(matches);
}
