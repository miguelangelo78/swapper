'use client';
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
    <div className="flex flex-col items-center justify-center py-2">
    <div className="text-4xl font-black mb-10">Welcome, {user.firstName}!</div>
    <img src={user.picture} alt="Profile" className="w-40 h-40 rounded-full object-cover object-center mb-10" />
    <div className="text-lg mb-10 text-primary justify-center font-medium">You have successfully completed your setup.</div>
    <div className="text-xl mb-10 text-primary justify-center font-medium">Start matching now!</div>

    <div className="text-primary justify-center mb-6">
      <div className="justify-center mb-2 text-black font-bold">
        Here&apos;s the data you provided:
      </div>
      <div className="text-lg">Origin: {user.origin.province}, {user.origin.subprovince}</div>
      <div className="text-lg">Destination: {user.destination.province}, {user.destination.subprovince}</div>
      <div className="text-lg">Major: {user.origin.major}</div>
      <div className="text-lg">Contact: {user.contact.email}</div>
    </div>

    <SwapperButton onClick={onClickRestartSetup} text="Restart Setup" styleType="primary" useSpinner={true} />
  </div>
  )
}
