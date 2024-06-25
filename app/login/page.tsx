import Link from 'next/link';
import { Form } from 'app/form';
import { signIn } from 'app/auth';
import { SubmitButton } from 'app/submit-button';
import Layout from '@/components/layout/LayoutServer';
import SocialSign from '@/components/SocialSign';
import { redirect } from 'next/navigation';
import { getUserByEmail } from '@/lib/db/user_db';

const ERROR_INVALID_PASSWORD = 'Invalid email or password.';
const ERROR_EMAIL_EXISTS_SOCIAL = 'That email exists as a social account. Please login with Google instead.';

const ERRORS = [
  ERROR_INVALID_PASSWORD,
  ERROR_EMAIL_EXISTS_SOCIAL,
];

export default function Login({ searchParams }: { searchParams: any }) {
  const { error } = searchParams;

  const handleSignIn = async (formData: FormData) => {
    'use server';

    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let user = undefined;

    try {
      user = await getUserByEmail(email);
    } catch (e: any) {
      if (e.message !== 'User does not exist') {
        throw e;
      }
    }

    if (user) {
      if (!!user.accountType && user.accountType !== 'DEFAULT') {
        redirect(`/login?error=${ERROR_EMAIL_EXISTS_SOCIAL}`);
      }
    } else {
      redirect(`/login?error=${ERROR_INVALID_PASSWORD}`);
    }

    try {
      await signIn('credentials', {
        redirectTo: '/matcher',
        email,
        password,
      });
    } catch (error: any) {
      if (error.message === 'NEXT_REDIRECT') {
        redirect('/matcher');
      }

      redirect(`/login?error=${ERROR_INVALID_PASSWORD}`);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-primary shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 bg-tertiary px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Login to Swapper</h3>
            <p className="text-sm text-gray-500">
              Use your email and password to login
            </p>
          </div>
          <div className="bg-tertiary">
            <div className="flex items-center justify-center font-medium w-full">
              <div className='w-2/4'>
                <SocialSign isLogin={true} />
              </div>
            </div>
          </div>
          <Form action={handleSignIn}>
            {ERRORS.includes(error) && (
              <p className="text-white bg-red-500 text-md text-center">{error}</p>
            )}

            <SubmitButton className='h-10 bg-primary text-white font-medium rounded-lg'>Login</SubmitButton>
            <p className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Link href="/signup" className="font-semibold text-gray-800">
                Sign up
              </Link>
              {' for free.'}
            </p>
          </Form>

        </div>
      </div>
    </Layout>
  );
}
