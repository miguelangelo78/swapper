import Layout from '@/components/Layout';
import { auth } from 'app/auth';

export default async function MatcherPage() {
  let session = await auth();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const user  = session.user!;

  return (
    <Layout user={user}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="text-4xl font-bold mb-20">Welcome, {user.name}!</div>
        <div className="text-2xl mb-10 text-primary font-medium">Start matching now!</div>
        <div className="flex flex-wrap justify-center">
        </div>
      </div>
    </Layout>
  );
}
