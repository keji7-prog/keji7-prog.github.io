# JK Portfolio — Record-Level Evidence Expansion (2026-11-11)

## Objective
Show the actual observations behind the charts. Do not present attractive aggregate statistics without row-level provenance, sample bounds, and access control. Allow recruiters to inspect the kinds of records collected and understand the implications of those observations.

## Completed changes
1. `portfolio-19/projects/housing.html#sample-ledger`: a responsive anonymous numeric table for all 30 source rows, with price/area/room filters, buyer-scenario presets, ascending/descending sort, median recalc, filtered CSV export, original field dictionary, capture time, and original CSV SHA-256.
2. `portfolio-19/data/housing_numeric_sample_2026-11-10.json`: public projection of 30 private source rows. **Private names, neighborhoods, detailed descriptions, source listing URLs, and placeholder image URLs remain undisclosed.** Original full records retained solely in `keji7-prog/beike-housing-project` (private).
3. `portfolio-19/assets/housing-evidence.js`: pure client-side optional original CSV import; for an authorized holder, adds titles, neighborhood/community, and direct original URLs locally; attempts to confirm SHA-256. Local import does not upload user data.
4. `portfolio-19/evidence.html`: a single evidence exhibition with 30 anonymous housing observations, 12 official GitHub API rows, 8 NVIDIA MSRP entries + 16 NVIDIA Marketplace product list entries, and 5 price observations mapped to 4 products. Each category provides source context, table, search, sort, export and a link to the project-specific analysis. All 19 projects have a distinct output/evidence-type explanation; the freelance project links to its 1,144-task historical archive viewer.
5. Evidence-gallery entrypoints added to main nine-project homepage, 19-project homepage, the common independent-project navigation, and original detailed pages `housing-case.html`, `opensource.html`, and `demos/csv-lab.html`.
6. Corrected the price-watch SKU name lookup from `p.sku` to `p.id` when matching observation IDs.

## Verified source basis
- Private housing README + `evidence/manifest.json` + `evidence/run_report.json`, 2026-11-10 13:17 CST, 30 unique source URLs, 13 CSV columns, 30 placeholder image URLs (no actual photographs).
- Private raw CSV was parsed and all 30 rows validated before deriving the anonymized numeric projection. Recomputed price median 425万元, unit-price median 56,537元/m²; room group counts 6/14/9/1.
- GitHub source: `data/github_repos_snapshot.json`, 12 dated public repository API observations.
- GPU source: data embedded in `portfolio-19/projects/gpu.html`, dated Nov 11, with official MSRP/catalog source URLs. Archive values only, not current retail promises.
- Monitor source: embedded `verified-data` JSON in `portfolio-19/projects/monitor.html`, 5 observations. Manual history is separate from actual external source observations.

## Local runtime/logic validation
- Evidence viewer: rows=30 housing, 12 GitHub, 24 GPU references, 5 price observations. Search ASUS in monitor shows 3/5 observations and correct product name.
- Housing: all 30 anonymous rows verify sample median 425 万, unit-price median 56,537 元/m². Preset filters: budget<=300 万 -> 10 rows; two rooms and budget<=500 万 -> 8 rows; minimum 100 m² -> 13 rows.
- The client scripts parse. GitHub commits were confirmed, and navigation links were added across the site.

## Important limitations
- These are historical snapshots, not a full market or today's available listings. Listing price is not closing price; no housing listing photos were captured.
- A numeric record is not by itself proof that the underlying external website remains available or that its original terms authorize republication; source records remain private for housing.
- Private housing CSV must be supplied by an authorized reviewer. Public evidence page does not reveal the original property names/links.
- Freelance archive collection date unknown; demand/budgets are not currently open job offers nor actual earnings.
- Real-world data does not belong in every creative tool: music, games, and editors are verified through working functionality, user-controlled input, and downloadable output. No fabricated external data.
- Public GitHub Pages browser rendering, accessibility, cross-browser media features, and export tests on deployed origin remain to be checked. Code/evidence simulation is not an end-to-end deployed browser validation.
