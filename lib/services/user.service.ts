import { getUser, getUserBase } from '@/app/db/db';
import { SwapperUser, SwapperUserBase } from '../models/SwapperUserBase';
import { sessionUser } from '../session-utils';

export async function getSwapperUser(): Promise<SwapperUser> {
  return getUser((await sessionUser()).email!);
}

export async function getSwapperUserBase(): Promise<SwapperUserBase | undefined> {
  return getUserBase((await sessionUser()).email!);
}

export async function checkUserSetup(): Promise<boolean> {
  const user = await getSwapperUserBase();
  return !!user?.setupComplete;
}
