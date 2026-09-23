# Indore Colleges SEO Keyword Map

## Route Inventory

The site uses React Router in `frontend/src/App.tsx`. Category pages are handled by one parameterized route, and college profile pages are handled by one dynamic route. No duplicate page components are required for the SEO targets in this task.

| Page | Actual route | Implementation |
|---|---|---|
| Homepage | `/` | Static React Router route rendering `Home` |
| Engineering colleges | `/explore/engineering` | `path="/explore/:streamParam"`, stream value `engineering` |
| BBA colleges | `/explore/bba` | `path="/explore/:streamParam"`, stream value `bba` |
| BCA colleges | `/explore/bca` | `path="/explore/:streamParam"`, stream value `bca` |
| MBA colleges | `/explore/mba` | `path="/explore/:streamParam"`, stream value `mba` |
| Law colleges | `/explore/law` | `path="/explore/:streamParam"`, stream value `law` |
| Medical colleges | `/explore/medical` | `path="/explore/:streamParam"`, stream value `medical` |
| Design colleges | `/explore/design` | `path="/explore/:streamParam"`, stream value `design` |
| Individual college profile | `/college/[id]` | `path="/college/:id"`; the data `id` is the profile slug |

The implementation also has a general `/explore` route. The requested category URLs are existing routes, not new pages. The parameterized route accepts arbitrary stream values at the router level; the visible stream selector currently exposes the seven mapped values above.

## Homepage

URL:
https://indorecolleges.in/

Primary Keyword:
colleges in Indore

Secondary Keywords:
- best colleges in Indore
- top colleges in Indore
- colleges in Indore with fees
- college admission in Indore
- colleges in Indore courses

## Engineering

URL:
https://indorecolleges.in/explore/engineering

Primary Keyword:
engineering colleges in Indore

Secondary Keywords:
- BTech colleges in Indore
- BE colleges in Indore
- engineering colleges in Indore with fees
- engineering admission in Indore
- BTech admission in Indore

## BBA

URL:
https://indorecolleges.in/explore/bba

Primary Keyword:
BBA colleges in Indore

Secondary Keywords:
- best BBA colleges in Indore
- BBA colleges in Indore with fees
- BBA admission in Indore
- BBA courses in Indore

## BCA

URL:
https://indorecolleges.in/explore/bca

Primary Keyword:
BCA colleges in Indore

Secondary Keywords:
- best BCA colleges in Indore
- BCA colleges in Indore with fees
- BCA admission in Indore
- BCA courses in Indore

## MBA

URL:
https://indorecolleges.in/explore/mba

Primary Keyword:
MBA colleges in Indore

Secondary Keywords:
- best MBA colleges in Indore
- MBA colleges in Indore with fees
- MBA admission in Indore
- MBA courses in Indore
- management colleges in Indore

## Law

URL:
https://indorecolleges.in/explore/law

Primary Keyword:
law colleges in Indore

Secondary Keywords:
- LLB colleges in Indore
- BA LLB colleges in Indore
- law admission in Indore
- law courses in Indore

## Medical

URL:
https://indorecolleges.in/explore/medical

Primary Keyword:
medical colleges in Indore

Secondary Keywords:
- MBBS colleges in Indore
- medical colleges in Indore with fees
- medical admission in Indore
- MBBS admission in Indore

## Design

URL:
https://indorecolleges.in/explore/design

Primary Keyword:
design colleges in Indore

Secondary Keywords:
- design courses in Indore
- B.Des colleges in Indore
- fashion design colleges in Indore
- design admission in Indore

## College Profile Pages

Individual college pages primarily target the individual college name. The existing implementation uses the data `id` as the URL segment, so these are the current profile URLs and assigned primary keywords.

| URL | Primary keyword |
|---|---|
| https://indorecolleges.in/college/malwa-institute | Malwa Institute of Science & Technology |
| https://indorecolleges.in/college/iit-indore | IIT Indore |
| https://indorecolleges.in/college/iim-indore | IIM Indore |
| https://indorecolleges.in/college/sgsits | SGSITS Indore |
| https://indorecolleges.in/college/davv | DAVV Indore |
| https://indorecolleges.in/college/acropolis | Acropolis Institute of Technology and Research |
| https://indorecolleges.in/college/symbiosis-university | Symbiosis University of Applied Sciences Indore |
| https://indorecolleges.in/college/svvv-indore | SVVV Indore |
| https://indorecolleges.in/college/sage-university | SAGE University Indore |
| https://indorecolleges.in/college/nmims-indore | NMIMS Indore |
| https://indorecolleges.in/college/apj-kalam-univ | Dr. A.P.J. Abdul Kalam University Indore |
| https://indorecolleges.in/college/oriental-university | Oriental University Indore |
| https://indorecolleges.in/college/medi-caps-university | Medi-Caps University Indore |
| https://indorecolleges.in/college/prestige-university | Prestige University Indore |
| https://indorecolleges.in/college/renaissance-college | Renaissance College of Commerce & Management |
| https://indorecolleges.in/college/pimr | Prestige Institute of Management & Research |
| https://indorecolleges.in/college/nmims-stme | NMIMS School of Technology & Management |
| https://indorecolleges.in/college/bm-college | BM College of Technology |
| https://indorecolleges.in/college/chameli-devi | Chameli Devi Group of Institutions |
| https://indorecolleges.in/college/iist-indore | Indore Institute of Science & Technology |
| https://indorecolleges.in/college/iet-davv | Institute of Engineering and Technology, DAVV |
| https://indorecolleges.in/college/ips-engineering | IPS Academy Institute of Engineering & Science |
| https://indorecolleges.in/college/lncts-indore | Lakshmi Narain College of Technology & Science |
| https://indorecolleges.in/college/lnct-bhopal-indore | LNCT Bhopal Indore Campus |
| https://indorecolleges.in/college/patel-college | Patel College of Science and Technology |
| https://indorecolleges.in/college/piemr-indore | Prestige Institute of Engineering Management & Research |
| https://indorecolleges.in/college/vaishnav-polytechnic | Shri Vaishnav Polytechnic College |
| https://indorecolleges.in/college/ips-ibmr | IPS Academy Institute of Business Management |
| https://indorecolleges.in/college/ims-davv | Institute of Management Studies, DAVV |
| https://indorecolleges.in/college/jaipuria-indore | Jaipuria Institute of Management Indore |
| https://indorecolleges.in/college/nmims-law | NMIMS School of Law Indore |
| https://indorecolleges.in/college/index-medical | Index Medical College Hospital & Research Institute |
| https://indorecolleges.in/college/mgm-medical | MGM Medical College Indore |
| https://indorecolleges.in/college/shubhdeep-ayurved | Shubhdeep Ayurved Medical College & Hospital |
| https://indorecolleges.in/college/saims | Sri Aurobindo Institute of Medical Sciences |
| https://indorecolleges.in/college/cindrebay-design | Cindrebay School of Design |
| https://indorecolleges.in/college/madrid-software | Madrid Software Training |
| https://indorecolleges.in/college/govt-music-college | Government Music College Indore |
| https://indorecolleges.in/college/mit-indore | Malwa Institute of Technology (MIT Indore) |
| https://indorecolleges.in/college/softvision-college | Softvision College Indore |
| https://indorecolleges.in/college/alexia-college | Alexia College of Professional Studies |
| https://indorecolleges.in/college/gacc-indore | Government Arts and Commerce College Indore |
| https://indorecolleges.in/college/radiant-institute | Radiant Institute of Management & Science |
| https://indorecolleges.in/college/pioneer-institute | Pioneer Institute of Professional Studies |
| https://indorecolleges.in/college/christian-eminent | Christian Eminent College |
| https://indorecolleges.in/college/holkar-science | Holkar Science College Indore |
| https://indorecolleges.in/college/gujarati-professional | Gujarati Professional Institute Indore |
| https://indorecolleges.in/college/iil-indore | Indore Institute of Law |

Suggested secondary intent for each profile page, based on the requested strategy:
- `[college name] courses`
- `[college name] fees`
- `[college name] admission`
- `[college name] placements`
- `[college name] address`

## Current SEO Implementation

### Homepage metadata

Static homepage metadata is defined in `frontend/index.html`, including:

- `<title>`
- meta description
- meta keywords
- author and robots directives
- Open Graph title, description, URL, and image
- Twitter title, description, URL, and image
- canonical URL
- JSON-LD `WebSite` and `EducationalOrganization` data

`frontend/index.html` is the initial document shell for the single-page application.

### Category-page metadata

Category-page titles are generated in `frontend/src/App.tsx` inside `ScrollToTopAndSEO`, using the pathname:

`Top {STREAM} Colleges in Indore 2026 - Admissions & Fees | Indore Colleges`

The category route is `/explore/:streamParam`. No category-specific meta descriptions, Open Graph tags, or canonical URLs are generated in the current implementation. The initial static metadata from `frontend/index.html` remains the document-level metadata unless another mechanism changes it.

### Individual college-page metadata

Individual profile titles are generated in `frontend/src/App.tsx` inside `CollegeDetailRoute`:

`{college.name} Indore - Courses, Fees, Cutoff & Admission | Indore Colleges`

The title is dynamically generated from the matched institute record. No profile-specific meta description, Open Graph tags, or canonical URLs are currently generated.

### Static and dynamic status

- Homepage title and metadata: static in `frontend/index.html`.
- Category titles: dynamic and pathname-based in `frontend/src/App.tsx`.
- Profile titles: dynamic and data-based in `frontend/src/App.tsx`.
- Category/profile descriptions: no page-specific dynamic implementation found.
- Canonical URLs: one static homepage canonical exists in `frontend/index.html`; no route-aware canonical generation exists for category or profile routes.
- Page-specific titles: homepage, general explore, category, profile, and several utility routes have titles in `ScrollToTopAndSEO`; profile titles are then set more specifically by `CollegeDetailRoute`.
- Structured data: static homepage JSON-LD exists in `frontend/index.html`; no route-specific category/profile schema was added or audited as an implementation change in this task.

## Potential Keyword Cannibalization

No exact primary-keyword conflicts were found among the requested mapped routes:

- Homepage: `colleges in Indore`
- Engineering: `engineering colleges in Indore`
- BBA: `BBA colleges in Indore`
- BCA: `BCA colleges in Indore`
- MBA: `MBA colleges in Indore`
- Law: `law colleges in Indore`
- Medical: `medical colleges in Indore`
- Design: `design colleges in Indore`
- Profiles: individual college names

Potential overlap to monitor, but not changed in this task:

- The homepage and `/explore` both use broad college-discovery intent, although `/explore` is not assigned the homepage's primary keyword here.
- BBA and MBA profiles may also rank for broader `management colleges in Indore` intent. The category map assigns that phrase only as an MBA secondary keyword, so it should not become a separate page target without a distinct search intent.
- Individual profile pages naturally contain course terms such as engineering, MBA, BBA, medical, or law. Those are supporting terms and do not conflict with the category primary keywords when the profile's primary keyword remains the college name.

## Unmapped Routes and Assumptions

- `/explore` exists but was not one of the requested seven category targets; it remains a general exploration page.
- `/college/:id` is the actual profile route. The requested `/college/[slug]` notation is represented by the existing `id` parameter; no new slug system was introduced.
- The 50 profile URLs above are based on the current `INDORE_INSTITUTES` data records in `frontend/src/data/indoreData.ts`.
- `/reviews` is an existing alias route for the reviews/campus-guides view, while `/blogs` is also present; neither was part of the requested keyword map.
- No sitemap, robots file, route definition, UI, title, description, canonical, or schema was modified for this task.
