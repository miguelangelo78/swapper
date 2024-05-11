import { auth } from '@/app/auth';
import { User } from 'next-auth';

let cachedSessionUser: User | undefined = undefined;

export async function sessionUser(): Promise<User | null | undefined> {
  const session = await auth();

  if (!session) {
    return null;
  }

  cachedSessionUser = session.user;

  return session.user;
}

export async function expireSessionUser() {
  cachedSessionUser = undefined;
}
