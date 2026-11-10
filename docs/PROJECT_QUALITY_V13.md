# Project validation and calculation notes

This document records the measurable behavior of the public portfolio. It is separate from visitor-facing pages.

## Open Source Data Explorer
- Source: dated 2026-11-10 snapshot of 12 named repositories from the GitHub REST API, stored in `data/github_repos_snapshot.json`.
- Implemented: category/search filters, metric sort, per-filter star median, bar charts, paired repository comparison, and export of filtered records.
- Pair comparison: `difference = left_metric - right_metric`; `forks per 100 stars = forks / stars * 100` when stars > 0. Both are descriptive, not measures of quality or growth.
- `issues` is the GitHub `open_issues_count` field, which includes open Issues and Pull Requests. UI uses **Open Items**.
- Results characterize twelve deliberately selected repos on a snapshot date; not the total ecosystem and not live measurements.

## Beijing housing aggregate
- Source: 30 unique listing links and 13 recorded fields from the user's own Chromium/DrissionPage collection; raw data retained in the private `beike-housing-project` repository.
- Public dashboard uses only `data/housing_aggregate_v8.json`. No full listing URLs, addresses, names or listing-level records are placed on this site.
- Group shares are `group count / 30`. Overall and per-room medians are from the original archived analysis, not medians of group medians.
- Price bands are marginal overall counts (4, 10, 8, 4, 4); they are not cross-filtered by room.
- Snapshot asking prices are not transaction prices or a current citywide market estimate.

## CSV Data Explorer
- Browser processing only. Local files are not uploaded by the application.
- Supports quoted CSV values, escaped quotes, CRLF, embedded newlines, UTF-8 BOM, and 10,000 data rows / 80 columns / 8 MB file limit.
- Irregular row widths and malformed quotes are rejected with an actionable error rather than silently truncating fields.
- Shows exact blank-cell counts and exact duplicate-row counts; each numeric field is accepted only when every nonempty value is a valid decimal number.
- Field statistics are calculated from the current filtered rows. Numeric distribution uses six equal-width bins; mean and median are computed directly.
- Pagination shows 50 rows at a time. Download exports all filtered rows, not just the current page.
- Export guards against spreadsheet formula injection by prefixing dangerous text entries with an apostrophe. This changes potentially dangerous cell text on export intentionally.

## Tkinter Calculator
- UI reflects the archived Python calculator code, and the result table reads `data/verified_calculator_checks.json` instead of duplicating hard-coded expected outputs.
- Five archived checks were recorded in a Linux Xvfb Tk environment. This does not establish validation of a packaged Windows executable.

## Browser applications
- Calculator: bounded length, in-session history, copy result, keyboard entry, mathematical parser (no `eval`).
- Focus timer: countdown uses deadline rather than interval-step arithmetic; the new completed-session count advances only after the timer reports completion. Pauses/resets do not count.
- Notes: single note persists to this browser's local storage, with TXT import/export and character/line count; no cloud sync.
- Random cards: configured weights 4%, 16%, 30%, 50%; actual draws use `crypto.getRandomValues`; observed counts are exportable. Observed frequency may differ from configured weights.
- Text cleaner: strips blank lines, trims and deduplicates while preserving first occurrence; optional case-insensitive comparison.

## Regression checks
`tests/portfolio_smoke.py` runs local browser UI tests with the repository's own stored data snapshots. The checks do **not** contact GitHub or the housing listing site. They test parsing, filtering, comparisons, exports and tool interaction. Requires Python Playwright and an available Chromium installation.
