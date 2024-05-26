'use client';
import FindMatchChip from '@/components/FindMatchChipComponent';
import { MatchResult } from '@/lib/models/Match.types';
import { SwapperUser } from '@/lib/models/SwapperUser.types';

export default async function MyMatchInvitationsClient({ myMatchInvitations, user }: { myMatchInvitations: MatchResult[], user: SwapperUser }) {
  return (
    <div className='flex flex-col items-center mt-5'>
      <div className='justify-center'>
        <div className='text-2xl font-bold text-center'>These people want to swap with you:</div>
        {myMatchInvitations.length === 0 && <div className='text-center'>No match invitations received</div>}

        {myMatchInvitations.map((match) => (
          <FindMatchChip key={match.otherSwapperUser.id} user={user!} match={match} />
        ))}
      </div>
    </div>
  );
}
