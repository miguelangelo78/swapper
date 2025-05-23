import { auth } from '@/app/auth';
import { getUserByEmail, updateUser } from '@/lib/db/user_db';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await auth();
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await getUserByEmail(session.user!.email as string);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.setupComplete = false;
  await updateUser(user);

  return Response.json(true);
}
