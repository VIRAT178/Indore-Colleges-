import {createSitemapXml, getStaticCollegeIds} from '../src/utils/sitemap';

interface VercelResponse {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string): VercelResponse;
  send(body: string): VercelResponse;
}

function getApiBaseUrl() {
  return (process.env.PARTNER_API_BASE_URL || process.env.VITE_API_BASE_URL || 'https://indore-colleges.onrender.com').replace(/\/$/, '');
}

function isPublicPartner(value: unknown, staticCollegeIds: Set<string>): value is {id: string} {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;

  const record = value as Record<string, unknown>;
  return record.type === 'college'
    && record.isPartnerRegistered === true
    && typeof record.id === 'string'
    && typeof record.name === 'string'
    && !staticCollegeIds.has(record.id);
}

async function getPartnerIds() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/institutes`, {signal: controller.signal});
    if (!response.ok) throw new Error(`Partner API returned ${response.status}`);

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) throw new Error('Partner API returned malformed data');

    const staticCollegeIds = new Set(getStaticCollegeIds());
    return payload
      .filter(value => isPublicPartner(value, staticCollegeIds))
      .map(value => value.id);
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(request: {method?: string}, response: VercelResponse) {
  if (request.method && request.method !== 'GET') {
    return response.status(405).setHeader('Allow', 'GET').send('Method Not Allowed');
  }

  try {
    const partnerIds = await getPartnerIds();
    return response
      .status(200)
      .setHeader('Content-Type', 'application/xml; charset=utf-8')
      .setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')
      .send(createSitemapXml(partnerIds));
  } catch (error) {
    console.error('Sitemap partner API error:', error);
    return response
      .status(200)
      .setHeader('Content-Type', 'application/xml; charset=utf-8')
      .setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=60')
      .send(createSitemapXml());
  }
}