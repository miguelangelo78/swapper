import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { verifyLoggedUser } from '../utils';
import { acceptMatchRequest, createMatchRequest, deleteMatchRequest, getMatchRequestsForMe } from '@/lib/db/match_request_db';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const user = await verifyLoggedUser();
  if (user instanceof Response) {
    return user;
  }

  const otherUserId: { userId: number } = await req.json();
  if (!otherUserId) {
    return Response.json({ error: 'Missing otherUserId' }, { status: 400 });
  }

  // Check if there is already a match request from the other user.
  // If so, we will accept it instead of creating a new request
  const existingRequest = (await getMatchRequestsForMe(user.id!)).find((r) => r.otherUserId === user.id && r.myUserId === otherUserId.userId);
  if (existingRequest && existingRequest.status === 'PENDING' ) {
    return Response.json({ id: acceptMatchRequest(user.id!, otherUserId.userId), status: 'ACCEPTED' });
  }

  const result = await createMatchRequest(user.id!, otherUserId.userId);

  return Response.json({ id: result, status: 'PENDING' });
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
