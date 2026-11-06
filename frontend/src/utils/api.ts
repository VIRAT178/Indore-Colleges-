const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;

const FALLBACK_API_BASE_URLS = [
  'https://indore-colleges.onrender.com'
];

let resolvedApiBaseUrl: string | null = null;

function getCandidateApiBaseUrls() {
  const candidates = [
    viteEnv?.VITE_API_BASE_URL,
    typeof window !== 'undefined' ? window.location.origin : null,
    ...FALLBACK_API_BASE_URLS
  ].filter((value): value is string => Boolean(value));

  return [...new Set(candidates)];
}

async function fetchFromApiCandidates(input: string, init?: RequestInit, timeoutMs?: number) {
  const candidates = resolvedApiBaseUrl
    ? [resolvedApiBaseUrl, ...getCandidateApiBaseUrls().filter((base) => base !== resolvedApiBaseUrl)]
    : getCandidateApiBaseUrls();

  let lastResponse: Response | null = null;

  for (const baseUrl of candidates) {
    const requestUrl = `${baseUrl}${input.startsWith('/') ? input : `/${input}`}`;

    try {
      const controller = timeoutMs ? new AbortController() : undefined;
      const timeoutId = controller ? window.setTimeout(() => controller.abort(), timeoutMs) : undefined;
      const response = await fetch(requestUrl, controller ? { ...init, signal: controller.signal } : init);
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (response.status !== 404) {
        resolvedApiBaseUrl = baseUrl;
        return response;
      }

      lastResponse = response;
    } catch (error) {
      lastResponse = null;
    }
  }

  return lastResponse;
}

export function buildApiUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = resolvedApiBaseUrl || getCandidateApiBaseUrls()[0];
  return `${baseUrl}${normalized}`;
}

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  if (typeof input === 'string' && input.startsWith('/api/')) {
    const response = await fetchFromApiCandidates(input, init);
    if (response) {
      return response;
    }
    throw new TypeError('Failed to fetch');
  }
  return fetch(input, init);
}

export async function apiFetchWithTimeout(input: RequestInfo, init: RequestInit = {}, timeoutMs = 45000) {
  if (typeof input === 'string' && input.startsWith('/api/')) {
    const response = await fetchFromApiCandidates(input, init, timeoutMs);
    if (response) {
      return response;
    }
    throw new TypeError('Failed to fetch');
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    return response;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
