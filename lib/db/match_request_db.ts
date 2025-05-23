import { integer, pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { swapperUser } from './user_db';
import { db } from './db_client';
import { MatchRequest, MatchRequestStatus } from '../models/Match.types';
import { and, eq, or } from 'drizzle-orm';

export const statusEnum = pgEnum('status', ['PENDING', 'ACCEPTED', 'ACCEPTED_ACK', 'REJECTED', 'IGNORED', 'EXPIRED', 'CANCELLED', 'SWAPPED']);

const matchRequest = pgTable('match_request', {
  id: serial('id').primaryKey(),
  myUserId: integer('my_user_id').references(() => swapperUser.userId).primaryKey(),
  otherUserId: integer('other_user_id').references(() => swapperUser.userId).primaryKey(),
  status: statusEnum('status'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export async function createMatchRequest(myUserId: number, otherUserId: number): Promise<number> {
  // Check if exists:
  const existingRequest = await getMatchRequestWithOtherUser(myUserId, otherUserId);
  if (existingRequest) {
    if (existingRequest.status === MatchRequestStatus.CANCELLED) {
      // Reactivate this request:
      return updateMatchRequestStatus(myUserId, otherUserId, MatchRequestStatus.PENDING);
    }

    // TODO: Do something else here?
    return existingRequest.id;
  }

  // Create new request:
  return db.insert(matchRequest).values({
    myUserId,
    otherUserId,
    status: MatchRequestStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning({ id: matchRequest.id }).then((res) => res[0].id);
}

export async function deleteMatchRequest(myUserId: number, otherUserId: number): Promise<number> {
  const updatedAt = new Date();

  const id = await db.update(matchRequest).set({
    status: MatchRequestStatus.CANCELLED,
    updatedAt,
  }).where(
    or(
      and(
        eq(matchRequest.myUserId, myUserId),
        eq(matchRequest.otherUserId, otherUserId),
      ),
      and(
        eq(matchRequest.myUserId, otherUserId),
        eq(matchRequest.otherUserId, myUserId),
      )
    )
  ).returning({ id: matchRequest.id }).then((res) => res[0].id);

  return id;
}

export async function acceptMatchRequest(myUserId: number, otherUserId: number): Promise<number> {
  const updatedAt = new Date();

  const id = await db.update(matchRequest).set({
    status: MatchRequestStatus.ACCEPTED,
    updatedAt,
  }).where(
    or(
      and(
        eq(matchRequest.myUserId, myUserId),
        eq(matchRequest.otherUserId, otherUserId),
      ),
      and(
        eq(matchRequest.myUserId, otherUserId),
        eq(matchRequest.otherUserId, myUserId),
      ),
    )
  ).returning({ id: matchRequest.id }).then((res) => res[0].id);

  return id;
}

export async function getMatchRequestsFromMe(myUserId: number): Promise<MatchRequest[]> {
  const result = await db.select().from(matchRequest).where(
    eq(matchRequest.myUserId, myUserId),
  );

  return result.map((row) => ({
    id: row.id,
    myUserId: row.myUserId!,
    otherUserId: row.otherUserId!,
    status: row.status! as MatchRequestStatus,
    createdAt: row.createdAt!,
    updatedAt: row.updatedAt!,
  }));
}

export async function getMatchRequestsForMe(myUserId: number): Promise<MatchRequest[]> {
  const result = await db.select().from(matchRequest).where(
    eq(matchRequest.otherUserId, myUserId),
  );

  return result.map((row) => ({
    id: row.id,
    myUserId: row.myUserId!,
    otherUserId: row.otherUserId!,
    status: row.status! as MatchRequestStatus,
    createdAt: row.createdAt!,
    updatedAt: row.updatedAt!,
  }));
}

export async function getMatchRequestWithOtherUser(myUserId: number, otherUserId: number): Promise<MatchRequest | null> {
  const myRequests = await getMatchRequestsFromMe(myUserId);

  return myRequests.find((req) => req.otherUserId === otherUserId) || null;
}

export async function updateMatchRequestStatus(myUserId: number, otherUserId: number, status: MatchRequestStatus): Promise<number> {
  return db.update(matchRequest).set({
    status,
    updatedAt: new Date(),
  }).where(
    and(
      eq(matchRequest.myUserId, myUserId),
      eq(matchRequest.otherUserId, otherUserId),
    ),
  ).returning({ id: matchRequest.id }).then((res) => res[0].id);
}
