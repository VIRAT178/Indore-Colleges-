interface VercelRequest {
  method?: string;
  query: Record<string, string | string[] | undefined>;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  url?: string;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string | string[]): VercelResponse;
  send(body: Buffer): VercelResponse;
}

function getApiBaseUrl() {
  return (process.env.API_URL || process.env.PARTNER_API_BASE_URL || 'https://indore-colleges-i560.onrender.com').replace(/\/+$/, '');
}

function getHeader(value: string | string[] | undefined) {
  return Array.isArray(value) ? value.join(', ') : value;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const method = (request.method || 'GET').toUpperCase();
  if (!['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'].includes(method)) {
    return response.status(405).send(Buffer.from('Method not allowed.'));
  }

  const pathSegments = request.query.path;
  const segments = Array.isArray(pathSegments) ? pathSegments : pathSegments ? [pathSegments] : [];
  if (!segments.length || segments.some(segment => segment === '.' || segment === '..' || segment.includes('/'))) {
    return response.status(400).send(Buffer.from('Invalid API path.'));
  }

  let targetUrl: URL;
  try {
    const baseUrl = new URL(getApiBaseUrl());
    if ((process.env.NODE_ENV === 'production' && baseUrl.protocol !== 'https:')
      || (baseUrl.protocol !== 'https:' && baseUrl.protocol !== 'http:')
      || baseUrl.username
      || baseUrl.password) {
      throw new Error('Unsupported API URL protocol.');
    }
    targetUrl = new URL(baseUrl.href);
    targetUrl.pathname = `${baseUrl.pathname.replace(/\/+$/, '')}/api/${segments.map(encodeURIComponent).join('/')}`;
    targetUrl.search = new URL(request.url || '/', 'https://vercel.invalid').search;
  } catch {
    console.error('API proxy is not configured with a valid backend URL.');
    return response.status(503).send(Buffer.from('API service is unavailable.'));
  }

  const headers = new Headers();
  for (const name of ['authorization', 'content-type', 'cookie', 'origin', 'x-requested-with']) {
    const value = getHeader(request.headers[name]);
    if (value) headers.set(name, value);
  }

  let body: BodyInit | undefined;
  if (!['GET', 'HEAD'].includes(method) && request.body !== undefined) {
    if (typeof request.body === 'string' || Buffer.isBuffer(request.body)) {
      body = request.body;
    } else {
      body = JSON.stringify(request.body);
      if (!headers.has('content-type')) headers.set('content-type', 'application/json');
    }
  }

  try {
    const upstream = await fetch(targetUrl, { method, headers, body });
    const responseBody = Buffer.from(await upstream.arrayBuffer());
    const setCookies = upstream.headers.getSetCookie();

    response.status(upstream.status);
    response.setHeader('Cache-Control', 'no-store');
    for (const name of ['content-type', 'content-disposition', 'location']) {
      const value = upstream.headers.get(name);
      if (value) response.setHeader(name, value);
    }
    if (setCookies.length) response.setHeader('Set-Cookie', setCookies);
    return response.send(responseBody);
  } catch {
    console.error('Backend API proxy request failed.');
    return response.status(502).send(Buffer.from('API service is temporarily unavailable.'));
  }
}
