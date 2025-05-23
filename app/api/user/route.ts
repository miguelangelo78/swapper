import { auth } from '@/app/auth';
import { getUserByEmail } from '@/lib/db/user_db';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await getUserByEmail(session.user!.email as string) as SwapperUser;

  if (!user) {
    throw new Error('User not found');
  }

  return Response.json(user);
}
