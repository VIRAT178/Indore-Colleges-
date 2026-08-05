const DEFAULT_API_BASE_URL = typeof window !== 'undefined'
  ? window.location.origin
  : 'https://indore-colleges.onrender.com';

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;

export const API_BASE_URL = viteEnv?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

export function buildApiUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  if (typeof input === 'string' && input.startsWith('/api/')) {
    input = buildApiUrl(input);
  }
  return fetch(input, init);
}

export async function apiFetchWithTimeout(input: RequestInfo, init: RequestInit = {}, timeoutMs = 45000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    if (typeof input === 'string' && input.startsWith('/api/')) {
      input = buildApiUrl(input);
    }
    const response = await fetch(input, { ...init, signal: controller.signal });
    return response;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
