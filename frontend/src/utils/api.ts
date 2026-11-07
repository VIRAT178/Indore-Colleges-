export function buildApiUrl(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  return fetch(input, { ...init, credentials: 'include' });
}

export async function apiFetchWithTimeout(input: RequestInfo, init: RequestInit = {}, timeoutMs = 45000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(input, { ...init, signal: controller.signal, credentials: 'include' });
    return response;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
