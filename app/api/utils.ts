import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { auth } from '../auth';
import { getUserByEmail } from '@/lib/db/user_db';

export async function verifyLoggedUser(): Promise<Response | SwapperUser> {
  const session = await auth();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await getUserByEmail(session.user!.email as string);
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return user;
}
