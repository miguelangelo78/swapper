import Layout from '@/components/Layout';
import SetupFormWizardComponent from '@/components/setup-wizard/SetupFormWizardComponent';
import { getSwapperUser } from '@/lib/services/server/user.service';

export default async function SetupPage() {
  const user = await getSwapperUser();

  return (
    <Layout ignoreFooter={true}>
      <SetupFormWizardComponent user={user} />
    </Layout>
  );
}
