import { MatchResult } from '@/lib/models/Match.types';

export async function findMatchesForUser(): Promise<MatchResult[]> {
  return fetch('/api/findmatches', { method: 'POST' })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

export async function requestMatch(userId: number): Promise<boolean> {
  return fetch(`/api/requestmatch/`, { method: 'POST', body: JSON.stringify({ userId }) })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

export async function cancelRequestMatch(userId: number): Promise<number> {
  return fetch(`/api/requestmatch`, { method: 'DELETE', body: JSON.stringify({ userId }) })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}
