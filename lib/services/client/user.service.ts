import { SetupFormData } from '@/components/setup-wizard/SetupFormWizardComponent';
import { SwapperUser } from '@/lib/models/SwapperUser.types';

export async function getUser(): Promise<SwapperUser | null> {
  return fetch('/api/user')
    .then((res) => res.json())
    .then((data) => data.error ? null : data)
    .catch((error) => console.error(error));
}

export async function getUserById(userId: number): Promise<SwapperUser> {
  return fetch(`/api/user/${userId}`)
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

export async function completeSetup(formData: SetupFormData): Promise<void | Response> {
  return fetch('/api/complete-setup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

export async function restartSetup(): Promise<void> {
  return fetch('/api/restart-setup', { method: 'POST' })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

export async function refreshLastLogin(): Promise<void> {
  return fetch('/api/refresh-lastlogin', { method: 'POST' })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}
