import Layout from '@/components/Layout';
import { checkUserSetup, getSwapperUser } from '@/lib/services/server/user.service';
import { redirect } from 'next/navigation'
import MatcherPageClient from './page.client';

export default async function MatcherPage() {
  if (!await checkUserSetup()) {
    // Redirect to setup page if user has not completed setup
    redirect('/setup');
  }

  const user = await getSwapperUser();

  return (
    <Layout>
      <MatcherPageClient user={user} />
    </Layout>
  );
}
