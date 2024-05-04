import { auth } from '@/app/auth';
import { getUser, updateUser } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth();
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await getUser(session.user!.email as string);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.setupComplete = false;
  await updateUser(user);

  return Response.json(true);
}
