import { SwapperUser } from './SwapperUser.types';

export interface MatchResult {
  swapperUser: SwapperUser;
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
  REJECTED = 'REJECTED',
  IGNORED = 'IGNORED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}
