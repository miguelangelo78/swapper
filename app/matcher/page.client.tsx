'use client';
import FindMatchChip from '@/components/FindMatchChipComponent';
import Info from '@/components/InfoComponent';
import { useLayoutContext } from '@/components/layout/LayoutClient';
import { MatchRequestStatus, MatchResult } from '@/lib/models/Match.types';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { ENABLE_BLUR_NOTICE } from '@/lib/models/globals';
import { findMatchesForUser } from '@/lib/services/client/matcher.service';
import { Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export type MatcherPageClientProps = {
  user: SwapperUser;
}

export default function MatcherPageClient(
  { user }: MatcherPageClientProps,
) {
  const { matchContext } = useLayoutContext();

  // Load matches from API using useState:
  const [matches, setMatches] = useState<MatchResult[] | undefined>(undefined);
  const [searchDone, setSearchDone] = useState(false);

  const subLocation = !user.destination.subprovince && !user.destination.educationArea ? 'All areas and subprovinces' 
    : user.destination.subprovince ? user.destination.subprovince : user.destination.educationArea;

  useEffect(() => {
    if (searchDone) {
      return;
    }

    findMatchesForUser().then((matches) => {
      // Sort matches first. This is the sorting logic:
      // 1: Match invitations for me
      // 2: Match requests from me that are pending
      // 3: Successful matches
      // 4: Potential matches

      const matchInvitationsForMe = matches.filter((match) => {
        const requestForMe = matchContext.received.matchRequests.find((mr) => mr.otherUserId === user.id && mr.myUserId === match.otherSwapperUser.id);
        return requestForMe?.status === MatchRequestStatus.PENDING;
      });

      const matchRequestsFromMe = matches.filter((match) => {
        const requestFromMe = matchContext.sent.matchRequests.find((mr) => mr.otherUserId === match.otherSwapperUser.id && mr.myUserId === user.id);
        return requestFromMe?.status === MatchRequestStatus.PENDING;
      });

      const successfulMatches = matches.filter((match) => {
        const requestFromMe = [...matchContext.sent.matchRequests, ...matchContext.received.matchRequests].find((mr) => (mr.otherUserId === user.id && mr.myUserId === match.otherSwapperUser.id)
          || (mr.otherUserId === match.otherSwapperUser.id && mr.myUserId === user.id));
        return requestFromMe?.status === MatchRequestStatus.ACCEPTED;
      });
      
      // Everything else goes into potentialMatches:
      const potentialMatches = matches.filter((match) => {
        return !matchInvitationsForMe.includes(match) && !matchRequestsFromMe.includes(match) && !successfulMatches.includes(match);
      });

      const sortedMatches = [
        ...matchInvitationsForMe,
        ...matchRequestsFromMe,
        ...successfulMatches,
        ...potentialMatches,
      ]

      setMatches(sortedMatches);
      setSearchDone(true); // Mark the search as done
    });
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className='justify-center'>
        <div className="text-2xl font-bold text-center">Your search results for:</div>
        <div className="text-3xl font-black text-primary text-center drop-shadow underline">{user.destination.province}</div>
        <div className="text-xl font-medium text-primary text-center drop-shadow">{subLocation}</div>
        <div className="text-xl font-medium text-primary text-center drop-shadow">{user.origin.major}</div>
        <section className='mb-10 justify-center items-center'>
          {/** Display matches **/}
          {/** Loading **/}
          {matches === undefined && (
            <Spinner className='w-full mt-5' size='lg' />
          )}
          {/** No matches **/}
          {matches?.length === 0 && (
            <div className="text-center text-2xl font-bold">No matches found</div>
          )}
          {/** Matches found **/}
          {matches && matches?.length > 0 && (
            <div className="w-96 mt-5">
              {(!user?.isAdmin && ENABLE_BLUR_NOTICE) &&
                <Info header='NOTE' message='personal information will be blurred during early Swapper' />
              }
              {matches!.map((match) => (
                <FindMatchChip key={match.otherSwapperUser.id} user={user} match={match} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
