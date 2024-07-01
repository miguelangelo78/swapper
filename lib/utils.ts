import { SwapperUser } from './models/SwapperUser.types';
import { APPLY_BLUR, ENABLE_BLUR_NOTICE } from './models/globals';

export function isUserOnline(user: SwapperUser): boolean { 
  return !!(user.lastLogin && ((new Date(user.lastLogin).getTime()) > (Date.now()) - 5 * 60 * 1000));
}

export function checkApplyBlur(user: SwapperUser | null | undefined): boolean {
  return !user?.isAdmin && APPLY_BLUR && ENABLE_BLUR_NOTICE;
}
