import { auth } from '@/app/auth';
import { getUser } from '@/lib/db/db';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth();
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await getUser(session.user!.email as string) as SwapperUser;

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return Response.json(user);
}
