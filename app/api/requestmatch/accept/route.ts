import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { verifyLoggedUser } from '../../utils';
import { acceptMatchRequest } from '@/lib/db/match_request_db';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const user = await verifyLoggedUser();
  if (user instanceof Response) {
    return user;
  }

  const otherUserId: { userId: number } = await req.json();
  if (!otherUserId) {
    return Response.json({ error: 'Missing otherUserId' }, { status: 400 });
  }

  const result = await acceptMatchRequest(user.id!, otherUserId.userId);

  return Response.json(result);
}
