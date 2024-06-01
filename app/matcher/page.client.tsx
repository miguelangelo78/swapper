'use client';
import FindMatchChip from '@/components/FindMatchChipComponent';
import InfoComponent from '@/components/InfoComponent';
import { MatchResult } from '@/lib/models/Match.types';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { findMatchesForUser } from '@/lib/services/client/matcher.service';
import { Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export type MatcherPageClientProps = {
  user: SwapperUser;
}

export default function MatcherPageClient(
  { user }: MatcherPageClientProps,
) {
  // Load matches from API using useState:
  const [matches, setMatches] = useState<MatchResult[] | undefined>(undefined);

  const subLocation = !user.destination.subprovince && !user.destination.educationArea ? 'All areas and subprovinces' 
    : user.destination.subprovince ? user.destination.subprovince : user.destination.educationArea;

  useEffect(() => {
    findMatchesForUser().then(setMatches);
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
              {!user?.isAdmin &&
                <InfoComponent header='NOTE:' message='personal information will be hidden during the early version' />
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
