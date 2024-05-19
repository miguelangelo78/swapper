import { auth } from '@/app/auth';
import { getUser, updateUserBaseLastLogin } from '@/lib/db/user_db';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await getUser(session.user!.email as string);
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  await updateUserBaseLastLogin(user);

  return Response.json(true);
}
