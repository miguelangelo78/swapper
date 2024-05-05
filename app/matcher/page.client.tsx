'use client';
import { SwapperUser } from '@/lib/models/SwapperUser.types';

export type MatcherPageClientProps = {
  user: SwapperUser;
}

export default function MatcherPageClient(
  { user }: MatcherPageClientProps,
) {
  return (
    <div className="flex flex-col items-center mt-5">
      <div className='justify-center'>
        <div className="text-2xl font-bold text-center">Your matches for:</div>
        <div className="text-3xl font-black text-primary text-center drop-shadow underline">{user.destination.province}</div>
        {user.destination.subprovince && (
          <div className="text-xl font-medium text-primary text-center drop-shadow">{user.destination.subprovince}</div>
        )}
        <section className='mb-10'>
        </section>
      </div>

    </div>
  )
}
