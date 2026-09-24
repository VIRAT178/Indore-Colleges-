import {build} from 'esbuild';
import {readFile, rm, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const workingDirectory = process.cwd();
const frontendDirectory = path.basename(workingDirectory) === 'frontend'
  ? workingDirectory
  : path.join(workingDirectory, 'frontend');
const outputDirectory = path.join(workingDirectory, 'dist');
const serverBundleDirectory = path.join(outputDirectory, '.prerender');
const serverBundlePath = path.join(serverBundleDirectory, 'entry-server.mjs');
const templatePath = path.join(outputDirectory, 'index.html');

const routes = [
  '/',
  '/explore',
  '/explore/engineering',
  '/explore/bba',
  '/explore/bca',
  '/explore/mba',
  '/explore/law',
  '/explore/medical',
  '/explore/design',
];

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceTag(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

function applySeo(template, seo) {
  if (!seo) return template;

  const title = escapeAttribute(seo.title);
  const description = escapeAttribute(seo.description);
  const canonical = escapeAttribute(seo.canonical);
  const socialUrl = escapeAttribute(seo.socialUrl);
  const ogDescription = escapeAttribute(seo.ogDescription);
  const image = escapeAttribute(seo.image);

  let html = replaceTag(template, /<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  html = replaceTag(html, /<meta name="description"[^>]*>/i, `<meta name="description" content="${description}" />`);
  html = replaceTag(html, /<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = replaceTag(html, /<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${socialUrl}" />`);
  html = replaceTag(html, /<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" />`);
  html = replaceTag(html, /<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${ogDescription}" />`);
  html = replaceTag(html, /<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${image}" />`);
  html = replaceTag(html, /<meta name="twitter:url"[^>]*>/i, `<meta name="twitter:url" content="${socialUrl}" />`);
  html = replaceTag(html, /<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}" />`);
  html = replaceTag(html, /<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${ogDescription}" />`);
  html = replaceTag(html, /<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${image}" />`);
  return html;
}

function routeOutputPath(route) {
  return route === '/' ? path.join(outputDirectory, 'index.html') : path.join(outputDirectory, route.slice(1), 'index.html');
}

await mkdir(serverBundleDirectory, {recursive: true});
await build({
  entryPoints: [path.join(frontendDirectory, 'src', 'entry-server.tsx')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: serverBundlePath,
  packages: 'external',
});

const template = await readFile(templatePath, 'utf8');
const renderer = await import(`${pathToFileURL(serverBundlePath).href}?build=${Date.now()}`);

for (const route of routes) {
  const {appHtml, seo} = renderer.renderPage(route);
  const hydrationHtml = appHtml.replace(/<link rel="preload"[^>]*\/>/gi, '');
  const html = applySeo(template.replace('<div id="root"></div>', `<div id="root">${hydrationHtml}</div>`), seo);
  const outputPath = routeOutputPath(route);
  await mkdir(path.dirname(outputPath), {recursive: true});
  await writeFile(outputPath, html, 'utf8');
}

await rm(serverBundleDirectory, {recursive: true, force: true});
console.log(`Prerendered ${routes.length} routes to ${outputDirectory}`);
