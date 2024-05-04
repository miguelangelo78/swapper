import { SwapperUser } from '@/lib/models/SwapperUser.types';

export async function getUser(): Promise<SwapperUser | null> {
  return fetch('/api/user')
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

export async function restartSetup(): Promise<void> {
  return fetch('/api/restart-setup', { method: 'POST' })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}
