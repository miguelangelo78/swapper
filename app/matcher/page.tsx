import Layout from '@/components/Layout';
import { checkUserSetup, getSwapperUser } from '@/lib/services/user.service';
import { redirect } from 'next/navigation'

export default async function MatcherPage() {
  if (!await checkUserSetup()) {
    // Redirect to setup page if user has not completed setup
    redirect('/setup');
  }

  const user = await getSwapperUser();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="text-4xl font-bold mb-10">Welcome, {user.name}!</div>
        <img src={user.picture} alt="Profile" className="w-40 h-40 rounded-full object-cover object-center mb-10" />
        <div className="text-2xl mb-10 text-primary font-medium">You have successfully completed your setup.</div>
        <div className="text-2xl mb-10 text-primary font-medium">Start matching now!</div>
        <div className="flex flex-wrap justify-center">
        </div>
      </div>
    </Layout>
  );
}
