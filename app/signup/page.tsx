import Link from 'next/link';
import { Form } from 'app/form';
import { redirect } from 'next/navigation';
import { createUser, getUserByEmail } from '@/lib/db/user_db';
import { SubmitButton } from 'app/submit-button';
import Layout from '@/components/layout/LayoutServer';
import SocialSign from '@/components/SocialSign';
import { User } from 'next-auth';

const ERROR_EMAIL_EXISTS = 'That email already exists.';

export default function Login({ searchParams }: { searchParams: any }) {
  const { error } = searchParams;

  async function signup(formData: FormData) {
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
      redirect(`/signup?error=${ERROR_EMAIL_EXISTS}`);
    } else {
      const newUser = {
        email,
        name: '',
        password,
        image: '',
      } as unknown as User;

      await createUser(newUser, password);
      redirect('/login');
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-primary shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 bg-tertiary px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Sign Up to Swapper</h3>
            <p className="text-sm text-gray-500">
              Create an account with your email and password
            </p>
          </div>
          <div className="bg-tertiary">
            <div className="flex items-center justify-center font-medium w-full">
              <div className='w-3/5'>
                <SocialSign isLogin={true} />
              </div>
            </div>
          </div>
          <Form action={signup}>
            {error === ERROR_EMAIL_EXISTS && (
              <p className="text-white bg-red-500 text-md text-center">{error}</p>
            )}

            <div className='bg-primary text-white font-medium rounded-lg'>
              <SubmitButton className='h-10'>Sign Up</SubmitButton>
            </div>
            <p className="text-center text-sm text-gray-600">
              {'Already have an account? '}
              <Link href="/login" className="font-semibold text-gray-800">
                Login
              </Link>
              {' instead.'}
            </p>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
