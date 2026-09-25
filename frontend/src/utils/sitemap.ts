import {INDORE_INSTITUTES} from '../data/indoreData';

export const SEO_ORIGIN = 'https://indorecolleges.in';

const PUBLIC_PAGE_PATHS = [
  '/',
  '/explore',
  '/explore/engineering',
  '/explore/bba',
  '/explore/bca',
  '/explore/mba',
  '/explore/law',
  '/explore/medical',
  '/explore/design',
  '/blogs',
  '/about',
  '/careers',
  '/contact',
];

const PUBLIC_PARTNER_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getStaticCollegeIds() {
  return INDORE_INSTITUTES
    .filter(institute => institute.type === 'college')
    .map(institute => institute.id);
}

export function getSitemapPaths(partnerIds: string[] = []) {
  const staticCollegeIds = getStaticCollegeIds();
  const includedPaths = new Set(PUBLIC_PAGE_PATHS);

  staticCollegeIds.forEach(id => includedPaths.add(`/college/${id}`));
  partnerIds
    .filter(id => PUBLIC_PARTNER_ID_PATTERN.test(id) && !staticCollegeIds.includes(id))
    .forEach(id => includedPaths.add(`/college/${id}`));

  return [...includedPaths];
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function createSitemapXml(partnerIds: string[] = []) {
  const urls = getSitemapPaths(partnerIds)
    .map(path => `${SEO_ORIGIN}${path}`)
    .map(url => `  <url><loc>${escapeXml(url)}</loc></url>`)
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}