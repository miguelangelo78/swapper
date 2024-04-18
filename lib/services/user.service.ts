import { getUser } from '@/app/db';
import { SwapperUser } from '../models/SwapperUserBase';
import { User } from 'next-auth';

export async function getSwapperUser(authUser: User): Promise<SwapperUser> {
  const user = (await getUser(authUser.email!))[0];

  const fullName = authUser.name?.split(' ');

  return {
    id: user.id,
    email: user.email!,
    firstName: fullName![0],
    lastName: fullName![1],
    nickname: '',
    contact: '',
    age: 0,
    origin: '',
    destination: '',
    major: '',
    province: '',
    subprovince: '',
    setup_complete: !!user.setupComplete,
  };
}
