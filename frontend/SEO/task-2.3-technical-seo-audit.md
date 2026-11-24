# Task 2.3A — Google Indexability and Technical SEO Audit

**Project:** IndoreColleges.in  
**Audit date:** 2026-11-12  
**Mode:** Read-only repository and live-site review

## 1. Executive summary

The site is crawlable and its 122 requested content URLs are currently available as pre-rendered pages: the homepage, seven category pages, 62 college profiles, four locality pages, and 48 editorial routes all returned HTTP 200 with a title and a self-referencing canonical. Sampled unknown routes returned HTTP 404. Tested HTTP/www and trailing-slash variants redirected in one hop; tracking-query variants retained a clean canonical.

The main indexability gap is sitemap and link discovery: the live sitemap contains 75 URLs but excludes all four locality routes and all 48 generated editorial routes (and the `/reviews` landing route). Locality and editorial navigation is substantially implemented with buttons rather than crawlable links. Utility/admin routes also inherit an indexable directive and the homepage canonical. No Search Console coverage or performance field data was available to verify actual indexing or Core Web Vitals.

No critical issue was found. This audit did not change application files, route behavior, metadata, structured data, `robots.txt`, or `sitemap.xml`.

## 2. Audit methodology

- Inspected the frontend HTML template, route SEO logic, prerendering and sitemap generators, Vercel routing, route components, data, assets, and routing tests.
- Enumerated routes from the checked-in route generators; fetched all 122 requested page URLs from `https://indorecolleges.in` and checked status, title, redirects, canonical, and robots metadata.
- Fetched and reviewed live `robots.txt` and `sitemap.xml`; checked response headers on representative routes, tested canonical URL variants and unknown routes, and checked unique internal anchor targets.
- Parsed JSON-LD on seven representative page types and inspected image markup on those responses. Checked local asset sizes and image/video source patterns.
- Search Console coverage exports, URL Inspection data, and PageSpeed/Core Web Vitals reports were not present in the workspace or available through this audit. Findings about Google indexing therefore describe implementation and observed HTTP responses—not Google’s index.

## 3. Findings

### Critical priority

None found.

### High priority

**H1 — Sitemap omits locality and editorial routes; click-only navigation weakens discovery.**  
The live sitemap has 75 URLs. Its allowlist includes the homepage, explore/category pages, selected informational pages, and college-profile patterns, but not `/locality/*` or `/reviews/*` and `/blogs/*` detail routes. The route generator defines four locality pages and 48 editorial pages; `/reviews` is also absent. Prerendering creates these pages but passes only college routes to the sitemap generator. On the homepage, locality cards are buttons, and the editorial category/perspective selectors also navigate through buttons. This leaves many valid pages dependent on sitemap submission or JavaScript interaction for discovery. The 122 URLs themselves all returned 200; no broken targets were found among 62 unique internal anchor paths checked.

Evidence: [`shared/sitemap.js` (lines 3–31)](../../shared/sitemap.js#L3), [`prerender.mjs` (lines 98–113)](../../scripts/prerender.mjs#L98), [`entry-server.tsx` (lines 9–31)](../src/entry-server.tsx#L9), [`Home.tsx` (lines 1395–1401)](../src/components/Home.tsx#L1395), [`ReviewsHierarchyTable.tsx` (lines 417–506)](../src/components/ReviewsHierarchyTable.tsx#L417). The live count is also asserted as 75 in [`routing.test.mjs` (line 302)](../../tests/routing.test.mjs#L302).

### Medium priority

**M1 — Utility/admin routes are indexable and canonicalize to the homepage.**  
The base template sets `index, follow`. `getPageSeo` recognizes `/register`, `/dashboard`, `/college-portal`, and `/admin-panel`, but routes outside its short self-canonical allowlist fall back to the homepage canonical. Live HTML for these examples retained the indexable robots directive and `https://indorecolleges.in/` canonical. This sends conflicting page identity signals and may expose login or user-specific utility URLs to search results.

Evidence: [`index.html` (line 21)](../index.html#L21), [`App.tsx` (lines 253–264 and 341–349)](../src/App.tsx#L253).

**M2 — The deployed sitemap is static-first, so dynamic partner URLs may not reach it.**  
Vercel checks the filesystem before rewriting `/sitemap.xml` to `/api/sitemap`; the prerender build writes a static `dist/sitemap.xml`. The dynamic handler can include approved partner IDs, but the filesystem-first route can serve the generated file before the handler runs. The observed live sitemap contained the 62 checked-in college profiles; whether additional approved partners exist was not verifiable here.

Evidence: [`vercel.json` (lines 3–5)](../vercel.json#L3), [`prerender.mjs` (lines 112–113)](../../scripts/prerender.mjs#L112), [`api/sitemap.ts`](../api/sitemap.ts).

**M3 — Images lack intrinsic dimensions in sampled rendered HTML; large media merits performance review.**  
All sampled images had alt attributes, but none had both intrinsic `width` and `height` attributes. This can contribute to layout shift unless CSS/aspect-ratio containers reserve the final space. The homepage video uses `preload="metadata"`; local video assets range from about 5.9 MB to 24.4 MB. This identifies potential performance cost, not a measured Core Web Vitals failure.

Evidence: [`InstituteCard.tsx` (line 130)](../src/components/InstituteCard.tsx#L130), [`IntroVideoSection.tsx` (lines 40–47)](../src/components/IntroVideoSection.tsx#L40), [`CollegeDetailPage.tsx` (line 710)](../src/components/CollegeDetailPage.tsx#L710), [`indoreData.ts` (line 18)](../src/data/indoreData.ts#L18); media files include `frontend/public/intro-video.mp4` (5.91 MB) and `frontend/public/malwa-institute-campus.mp4` (24.36 MB).

### Low priority

**L1 — Structured data parses, but organization identity and editorial coverage should be reviewed.**  
The homepage has `WebSite` and `EducationalOrganization` JSON-LD. Sampled college pages also have valid `CollegeOrUniversity` and `BreadcrumbList` JSON-LD; seven sampled pages had no duplicate or invalid JSON-LD. The organization’s `sameAs` values are generic social-network homepages rather than branded profile URLs. No `Article`/`Review` schema was found on the editorial templates, and sampled locality/category/editorial pages had no breadcrumb schema. Use these types only where they accurately describe the real entity and page content.

Evidence: [`index.html` (lines 46–78)](../index.html#L46), [`App.tsx` (lines 179–211)](../src/App.tsx#L179).

**L2 — Footer policy links are placeholders.**  
Terms, Privacy, and Refund Policy anchors use `href="#"`; these are no-op links, not destination pages. They appeared three times per audited rendered page. They were not broken HTTP routes, but should be linked to real policy pages or rendered as non-links until those pages exist.

Evidence: [`Footer.tsx` (lines 330–334)](../src/components/Footer.tsx#L330).

## 4. Route coverage and HTTP results

| Page group | Expected | Live result | Titles / canonicals |
|---|---:|---|---|
| Homepage | 1 | 1 × HTTP 200 | Present; canonical matches |
| Category pages | 7 | 7 × HTTP 200 | Present; canonical matches |
| College profiles | 62 | 62 × HTTP 200 | Present; canonical matches |
| Locality pages | 4 | 4 × HTTP 200 | Present; canonical matches |
| Editorial pages | 48 | 48 × HTTP 200 | Present; canonical matches |
| **Total requested content routes** | **122** | **122 × HTTP 200** | **No missing or mismatched canonicals** |

The route counts match the checked-in generators. The live sitemap contained 75 URLs: the 70 requested homepage/category/college URLs plus five additional general routes. It omitted all four locality routes, all 48 generated editorial routes, and `/reviews`.

Additional observations:

- The sampled unknown URL, unknown college ID, and unknown category returned 404 (not a soft 404).
- Tested HTTP-to-HTTPS, `www`-to-apex, and trailing-slash variants redirected once; no redirect chains were observed. Tracking query strings did not redirect, but page canonicals remained clean.
- No duplicate canonical tags were found across the 122 fetched pages.
- No broken targets were found among 62 unique internal anchor paths checked. The three `href="#"` footer placeholders are noted as L2.
- `robots.txt` allows all user agents and points to the HTTPS sitemap. The sampled page responses had no `X-Robots-Tag` header; page-level meta robots directives were present.
- The custom 404 document has `noindex, nofollow`; the invalid-route response tested was HTTP 404.

Relevant route-generation evidence: [`entry-server.tsx`](../src/entry-server.tsx#L9), [`prerender.mjs`](../../scripts/prerender.mjs#L98), [`routing.test.mjs`](../../tests/routing.test.mjs#L180).

## 5. Search Engine Directives and rendering

- **Robots:** Live `/robots.txt` matches [`frontend/public/robots.txt`](../public/robots.txt): `User-agent: *`, `Allow: /`, and an HTTPS sitemap declaration.
- **Sitemap consistency:** Sitemap entries use `https://indorecolleges.in`; the observed sitemap had 75 URLs. See H1 and M2 for coverage and dynamic sitemap concerns.
- **Canonical/meta robots:** The base template supplies `index, follow`; page-specific titles/descriptions and canonicals were present in tested routes. The utility-route homepage canonical is the exception (M1).
- **Pre-hydration rendering:** The prerender process writes each route’s server-rendered app markup and SEO values into route HTML before client hydration. All tested routes returned populated HTML with their title and canonical.
- **Internal links/orphan risk:** Standard internal anchor targets checked resolved successfully, but locality/editorial routes are not all represented by ordinary links. Combined with their sitemap omission, this is a crawl-discovery weakness rather than an HTTP availability issue.

## 6. Structured data and Search Console data gaps

- JSON-LD was valid JSON in the seven representative pages checked. Homepage schema covers `WebSite` and `EducationalOrganization`; college profiles add `CollegeOrUniversity` and `BreadcrumbList`.
- No live Search Console property data, URL Inspection export, indexing report, sitemap-processing report, or crawl-anomaly export was available. Therefore this audit cannot report indexed/not-indexed counts, Google-selected canonicals, “Crawled—currently not indexed,” or “Discovered—currently not indexed” status.
- A Google site-verification HTML file exists in the frontend public directory and returned HTTP 200. A GA4 measurement ID is present in the HTML template; GA4 is not Search Console access and does not provide index coverage data.

Evidence: [`google968443b88408792f.html`](../public/google968443b88408792f.html), [`index.html` (lines 5–12)](../index.html#L5).

## 7. Recommended implementation sequence

1. **Fix sitemap coverage** for indexable locality and editorial URLs and the `/reviews` landing route; retain the current URL architecture and HTTPS canonical origin. Ensure the intended sitemap endpoint is the one actually served.
2. **Add crawlable internal links** to locality and editorial pages (ordinary anchors/Router links with `href`), while preserving existing button interactions where needed.
3. **Set an explicit indexing policy for utility routes:** use `noindex` for private/admin/user-specific pages and correct self-canonicals for any utility page intentionally kept public. Keep `noindex` pages out of the sitemap.
4. **Resolve dynamic partner sitemap behavior** if approved partner profiles are intended to be discoverable from the sitemap; verify with a partner test record and live sitemap fetch.
5. **Improve media stability and loading:** provide intrinsic image dimensions or reserved aspect ratios, lazy-load below-the-fold imagery, and review video transfer/playback behavior. Then measure field/lab Core Web Vitals rather than inferring a failure from asset sizes.
6. **Align structured data with real entities/content:** replace generic `sameAs` values with verified branded profiles, add Article/Review/Breadcrumb markup only when it accurately reflects each page, and validate rendered JSON-LD.
7. **Replace footer `#` policy placeholders** with real destinations.
8. **Use Google Search Console** to submit/inspect the sitemap and review indexing, canonical selection, crawl anomalies, and page experience after the implementation changes.

**Recommended next tasks:** implement items 1–4 in order, then address media/schema and policy links; finally verify the deployed results in Search Console and Core Web Vitals tooling.
