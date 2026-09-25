const STATIC_COLLEGE_IDS = [
  'malwa-institute',
  'iit-indore',
  'iim-indore',
  'sgsits',
  'davv',
  'acropolis',
  'symbiosis-university',
  'svvv-indore',
  'sage-university',
  'nmims-indore',
  'apj-kalam-univ',
  'oriental-university',
  'medi-caps-university',
  'prestige-university',
  'renaissance-college',
  'pimr',
  'nmims-stme',
  'bm-college',
  'chameli-devi',
  'iist-indore',
  'iet-davv',
  'ips-engineering',
  'lncts-indore',
  'lnct-bhopal-indore',
  'patel-college',
  'piemr-indore',
  'vaishnav-polytechnic',
  'ips-ibmr',
  'ims-davv',
  'jaipuria-indore',
  'nmims-law',
  'index-medical',
  'mgm-medical',
  'shubhdeep-ayurved',
  'saims',
  'cindrebay-design',
  'madrid-software',
  'govt-music-college',
  'mit-indore',
  'softvision-college',
  'alexia-college',
  'gacc-indore',
  'radiant-institute',
  'pioneer-institute',
  'christian-eminent',
  'holkar-science',
  'gujarati-professional',
  'iil-indore',
];

const SEO_ORIGIN = 'https://indorecolleges.in';
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
  return [...STATIC_COLLEGE_IDS];
}

export function getSitemapPaths(partnerIds = []) {
  const staticCollegeIds = getStaticCollegeIds();
  const includedPaths = new Set(PUBLIC_PAGE_PATHS);

  staticCollegeIds.forEach(id => includedPaths.add(`/college/${id}`));
  partnerIds
    .filter(id => PUBLIC_PARTNER_ID_PATTERN.test(id) && !staticCollegeIds.includes(id))
    .forEach(id => includedPaths.add(`/college/${id}`));

  return [...includedPaths];
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function createSitemapXml(partnerIds = []) {
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