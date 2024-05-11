import Layout from '@/components/layout/LayoutServer';
import { SwapperButton } from '@/components/SwapperButton';
import { checkUserSetup, getSwapperUser } from '@/lib/services/server/user.service';
import { redirect } from 'next/navigation'

async function redirectToMatcher() {
  'use server';
  return redirect('/matcher');
}

export default async function WelcomePage() {
  if (!await checkUserSetup()) {
    // Redirect to setup page if user has not completed setup
    redirect('/setup');
  }

  const user = (await getSwapperUser())!;

  return (
    <Layout ignoreFooter={true}>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="text-4xl font-black">Welcome to <span className='logo text-primary'>Swapper</span>,</div>
        <div className="text-4xl font-black mb-5">{user.firstName}!</div>
        <div className="text-xl mb-5 text-primary justify-center font-medium">You have completed your setup.</div>
        <img src={user.picture} alt="Profile" className="w-40 h-40 rounded-full object-cover object-center mb-16 shadow-2xl shadow-primary" />
        <SwapperButton action={redirectToMatcher} text="Start Matching Now!" styleType="primary" className='text-xl w-60 h-16' useSpinner={true} />
      </div>
    </Layout>
  );
}
