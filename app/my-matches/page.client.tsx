'use client';
import FindMatchChip from '@/components/FindMatchChipComponent';
import { MatchResult } from '@/lib/models/Match.types';
import { SwapperUser } from '@/lib/models/SwapperUser.types';

export default async function MyMatchesClient({ myMatches, user }: { myMatches: MatchResult[], user: SwapperUser }) {
  return (
    <div className='flex flex-col items-center mt-5'>
      <div className='justify-center'>
        <div className='text-2xl font-bold text-center'>Your matches:</div>
        {myMatches.length === 0 && (
          <>
            <div className='text-center'>You have 0 matches.</div>
            <br />
            <a className='text-center text-tertiary bg-primary p-3 rounded-lg font-semibold' href='/matcher'>Click here to find more matches</a>
          </>
        )}

        {myMatches.map((match) => (
          <FindMatchChip key={match.otherSwapperUser.id} user={user!} match={match} />
        ))}
      </div>
    </div>
  );
}
