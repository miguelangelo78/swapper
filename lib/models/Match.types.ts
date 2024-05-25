import { SwapperUser } from './SwapperUser.types';

export interface MatchContext {
  received: MatchContextResult,
  sent: MatchContextResult,
}

export interface MatchContextResult {
  matchRequests: MatchRequest[];
  notifications?: MatchRequest[];
  pending: MatchRequest[];
  accepted: MatchRequest[];
}

export interface MatchResult {
  otherSwapperUser: SwapperUser;
  matchRequest?: MatchRequest;
}

export interface MatchRequest {
  id: number;
  myUserId: number;
  otherUserId: number;
  status: MatchRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum MatchRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  ACCEPTED_ACK = 'ACCEPTED_ACK',
  REJECTED = 'REJECTED',
  IGNORED = 'IGNORED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  SWAPPED = 'SWAPPED',
}
