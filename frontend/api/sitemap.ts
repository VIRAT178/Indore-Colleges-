import {INDORE_INSTITUTES} from '../src/data/indoreData.js';
import {createSitemapXml, getSitemapPaths} from '../../shared/sitemap.js';

interface VercelResponse {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string): void;
  send(body: string): VercelResponse;
}

function getApiBaseUrl() {
  return (process.env.PARTNER_API_BASE_URL || process.env.VITE_API_BASE_URL || 'https://indore-colleges.onrender.com').replace(/\/$/, '');
}

const STATIC_COLLEGES = INDORE_INSTITUTES.filter(institute => institute.type === 'college');
const STATIC_COLLEGE_PATHS = STATIC_COLLEGES.map(institute => `/college/${institute.id}`);
const STATIC_COLLEGE_IDS = new Set(STATIC_COLLEGES.map(institute => institute.id));

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

    return payload
      .filter(value => isPublicPartner(value, STATIC_COLLEGE_IDS))
      .map(value => value.id);
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(request: {method?: string}, response: VercelResponse) {
  if (request.method && request.method !== 'GET') {
    response.status(405);
    response.setHeader('Allow', 'GET');
    return response.send('Method Not Allowed');
  }

  try {
    const partnerIds = await getPartnerIds();
    response.status(200);
    response.setHeader('Content-Type', 'application/xml; charset=utf-8');
    response.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    return response.send(createSitemapXml(getSitemapPaths(STATIC_COLLEGE_PATHS, partnerIds)));
  } catch (error) {
    console.error('Sitemap partner API error:', error);
    response.status(200);
    response.setHeader('Content-Type', 'application/xml; charset=utf-8');
    response.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=60');
    return response.send(createSitemapXml(getSitemapPaths(STATIC_COLLEGE_PATHS)));
  }
}