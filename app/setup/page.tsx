import Layout from '@/components/Layout';
import { redirect } from 'next/navigation';
import SetupFormWizardComponent from '@/components/setup-wizard/SetupFormWizardComponent';
import { checkUserSetup, getSwapperUser } from '@/lib/services/user.service';

export default async function SetupPage() {
  if (await checkUserSetup()) {
    // Redirect to matcher page if user has not completed setup
    redirect('/matcher');
  }

  const user = await getSwapperUser();

  return (
    <Layout ignoreFooter={true}>
      <SetupFormWizardComponent user={user} />
    </Layout>
  );
}
