'use client';
import FindMatchChip from '@/components/FindMatchChipComponent';
import { MatchResult } from '@/lib/models/Match.types';
import { SwapperUser } from '@/lib/models/SwapperUser.types';

export default async function MyMatchRequestsClient({ myMatchRequests, user }: { myMatchRequests: MatchResult[], user: SwapperUser }) {
  return (
    <div className='flex flex-col items-center mt-5'>
      <div className='justify-center'>
        <div className='text-2xl font-bold text-center'>Your match requests:</div>
        {myMatchRequests.length === 0 && (
          <>
            <div className='text-center'>No match requests sent</div>
            <br />
            <a className='text-center text-tertiary bg-primary p-3 rounded-lg font-semibold' href='/matcher'>Click here to find more matches</a>
          </>
        )}

        {myMatchRequests.map((match) => (
          <FindMatchChip key={match.otherSwapperUser.id} user={user!} match={match} />
        ))}
      </div>
    </div>
  );
}
