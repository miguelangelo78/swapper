import Link from 'next/link';
import { Form } from 'app/form';
import { redirect } from 'next/navigation';
import { createUser, getUser } from 'app/db';
import { SubmitButton } from 'app/submit-button';
import Layout from '@/components/Layout';
import SocialSign from '@/components/SocialSign';

export default function Login() {
  async function signup(formData: FormData) {
    'use server';
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let user = await getUser(email);

    if (user.length > 0) {
      return 'User already exists'; // TODO: Handle errors with useFormStatus
    } else {
      await createUser(email, password);
      redirect('/login');
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-primary shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-tertiary px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Sign Up to Swapper</h3>
            <p className="text-sm text-gray-500">
              Create an account with your email and password
            </p>
          </div>
          <Form action={signup}>
            <div className='bg-primary text-white font-medium rounded-lg'>
              <SubmitButton className='h-10'>Sign Up</SubmitButton>
            </div>
            <p className="text-center text-sm text-gray-600">
              {'Already have an account? '}
              <Link href="/login" className="font-semibold text-gray-800">
                Sign in
              </Link>
              {' instead.'}
            </p>
          </Form>

          <SocialSign />
        </div>
      </div>
    </Layout>
  );
}
