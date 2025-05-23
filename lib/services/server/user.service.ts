import { getUserByEmail, getUserBase, updateUser } from '@/lib/db/user_db';
import { SwapperUser, SwapperUserBase } from '../../models/SwapperUser.types';
import { sessionUser } from '../session.service';
import { User } from 'next-auth';

export async function getSwapperUserBase(session?: User): Promise<SwapperUserBase | null | undefined> {
  const auth = session ?? await sessionUser();
  if (!auth) {
    return undefined;
  }

  return getUserBase(auth.email!);
}

export async function getSwapperUser(session?: User): Promise<SwapperUser | null | undefined> {
  const auth = session ?? await sessionUser();
  if (!auth) {
    return undefined;
  }

  return getUserByEmail(auth.email!);
}

export async function checkUserSetup(): Promise<boolean> {
  const user = await getSwapperUserBase();
  return !!user?.setupComplete;
}

export async function refreshLastLogin(user: SwapperUser) {
  user.lastLogin = new Date(Date.now());
  await updateUser(user);
}
