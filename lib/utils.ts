import { auth } from '@/app/auth';
import { User } from 'next-auth';

export async function sessionUser(): Promise<User> {
  const session = await auth();
  const user = session!.user!;
  return user;
}
