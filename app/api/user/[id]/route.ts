import { auth } from '@/app/auth';
import { getUserById } from '@/lib/db/user_db';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!params.id || isNaN(+params.id)) {
    return Response.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const user = await getUserById(+params.id) as SwapperUser;

  if (!user) {
    throw new Error('User not found');
  }

  return Response.json(user);
}
