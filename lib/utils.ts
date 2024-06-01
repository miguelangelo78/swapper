import { SwapperUser } from './models/SwapperUser.types';

export function isUserOnline(user: SwapperUser): boolean { 
  return !!(user.lastLogin && ((new Date(user.lastLogin).getTime()) > (Date.now()) - 5 * 60 * 1000));
}
