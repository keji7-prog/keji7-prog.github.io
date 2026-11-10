# V13 local verification record

The portfolio's local browser smoke tests were run on 2026-11-10 using Chromium and Playwright with **the existing archived JSON datasets**. These tests do not scrape external websites or refresh the source snapshots.

- **Open Source Data Explorer:** 12 repository records displayed; search, two-repository comparison, metric switching and filtered CSV export.
- **Housing data analysis:** 30 total records in the archived aggregate; 14 records for two-bedroom selection; five aggregate price bands and CSV export.
- **CSV Data Explorer:** loaded real repository snapshot; displayed data-quality diagnostics and numeric summary; rejected mismatched row widths; paginated 130 records; exported selected results.
- **Desktop Calculator:** rendered five archived operation-check records directly from the saved verification JSON.
- **Browser tools:** calculator result/history, TXT note import and line count, ten card draws with distribution/export, case-insensitive text deduplication, custom countdown start/pause, and mobile overflow check.
- **Page JavaScript errors during the local UI checks:** 0.

Limitations: No live website data was fetched by these offline tests. They do not establish current GitHub or real-estate market values, Windows EXE verification, or successful deployment to GitHub Pages. The raw private housing dataset is not part of the public site.
