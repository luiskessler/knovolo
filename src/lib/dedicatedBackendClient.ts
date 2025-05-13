import fetch from 'node-fetch';
import { auth } from '~/server/auth';

const BACKEND_API_URL = process.env.BACKEND_API_URL!;

interface BackendFetchOptions extends RequestInit {
  body?: any;
}

export async function handleDedicatedBackend(path: string, options: BackendFetchOptions = {}) {
const session = await auth();
  const url = `${BACKEND_API_URL}${path}`;

  let body: string | undefined;
  if (options.body && typeof options.body === 'object') {
    body = JSON.stringify(options.body);
  } else if (typeof options.body === 'string') {
    body = options.body;
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${session?.user.apiKey}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    method: options.method || 'GET',
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }

  return response.json();
}
