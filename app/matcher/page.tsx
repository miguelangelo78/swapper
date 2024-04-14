import Layout from '@/components/Layout';
import { sessionUser } from '@/lib/utils';
import { checkUserSetup } from '../db';
import { redirect } from 'next/navigation'

export default async function MatcherPage() {
  const user = await sessionUser();

  const setupComplete = await checkUserSetup(user.email!);

  if (!setupComplete) {
    // Redirect to setup page if user has not completed setup
    redirect('/setup');
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="text-4xl font-bold mb-20">Welcome, {user.name}!</div>
        <div className="text-2xl mb-10 text-primary font-medium">Start matching now!</div>
        <div className="flex flex-wrap justify-center">
        </div>
      </div>
    </Layout>
  );
}
