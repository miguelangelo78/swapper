'use client';
import Separator from '@/components/SeparatorComponent';
import SignOutComponent from '@/components/SignOutComponent';
import { SwapperButton } from '@/components/SwapperButton';
import { SwapperUser } from '@/lib/models/SwapperUser.types';

export type MatcherPageClientProps = {
  user: SwapperUser;
}

function onClickRestartSetup() {
  window.location.href = '/setup';
}

export default function MatcherPageClient(
  { user }: MatcherPageClientProps,
) {
  return (
    <div className="flex flex-col items-center mt-5">
      <div className='justify-start'>
        <div className="text-3xl font-bold">Your matches for:</div>
        <div className="text-4xl font-black text-primary text-center drop-shadow underline">{user.destination.province}</div>
        {user.destination.subprovince && (
          <div className="text-2xl font-medium text-primary text-center drop-shadow">{user.destination.subprovince}</div>
        )}
        <section className='mb-10'>
          <Separator />
        </section>
      </div>

      <div className="text-2xl font-black mb-10">TODO</div>

      <SwapperButton onClick={onClickRestartSetup} text="Restart Setup" styleType="primary" useSpinner={true} />
      <br />
      <SignOutComponent />
    </div>
  )
}
