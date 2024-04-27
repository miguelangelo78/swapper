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
      <div className="flex flex-col items-center justify-center py-2">
        <div className="text-4xl font-black mb-10">Welcome, {user.firstName}!</div>
        <img src={user.picture} alt="Profile" className="w-40 h-40 rounded-full object-cover object-center mb-10" />
        <div className="text-lg mb-10 text-primary justify-center font-medium">You have successfully completed your setup.</div>
        <div className="text-xl mb-10 text-primary justify-center font-medium">Start matching now!</div>

        <div className="text-primary justify-center">
          <div className="justify-center mb-2 text-black font-bold">
            Here&apos;s the data you provided:
          </div>
          <div className="text-lg">Origin: {user.origin.province}, {user.origin.subprovince}</div>
          <div className="text-lg">Destination: {user.destination.province}, {user.destination.subprovince}</div>
          <div className="text-lg">Major: {user.origin.major}</div>
          <div className="text-lg">Contact: {user.contact.email}</div>
        </div>
        <div className="flex flex-wrap justify-center">
        </div>
      </div>
    </Layout>
  );
}
