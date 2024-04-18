import Layout from '@/components/Layout';
import { sessionUser } from '@/lib/utils';
import { checkUserSetup } from '../db';
import { redirect } from 'next/navigation';
import SetupFormWizardComponent from '@/components/setup-wizard/SetupFormWizardComponent';
import { getSwapperUser } from '@/lib/services/user.service';

export default async function SetupPage() {
  const authUser = await sessionUser();
  const setupComplete = await checkUserSetup(authUser.email!);
  if (setupComplete) {
    // Redirect to matcher page if user has not completed setup
    redirect('/matcher');
  }

  const user = await getSwapperUser(authUser);

  return (
    <Layout>
      <SetupFormWizardComponent user={user} />
    </Layout>
  );
}
