import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { verifyLoggedUser } from '../utils';
import { createMatchRequest, deleteMatchRequest } from '@/lib/db/match_request_db';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const user = await verifyLoggedUser();
  if (user instanceof Response) {
    return user;
  }

  const otherUserId: { userId: number } = await req.json();
  if (!otherUserId) {
    return Response.json({ error: 'Missing otherUserId' }, { status: 400 });
  }

  const result = await createMatchRequest(user.id!, otherUserId.userId);

  return Response.json(result);
}

export async function DELETE(req: NextRequest, res: NextApiResponse) {
  const user = await verifyLoggedUser();
  if (user instanceof Response) {
    return user;
  }

  const otherUserId: { userId: number }  = await req.json();
  if (!otherUserId) {
    return Response.json({ error: 'Missing otherUserId' }, { status: 400 });
  }

  const result = await deleteMatchRequest(user.id!, otherUserId.userId);

  return Response.json(result);
}
