# V14 — Data analysis quality

## Scope
V14 deepens the three verified data applications without introducing any synthetic market records or claiming a live data refresh.

## CSV Data Explorer
- Validates RFC-style quoted CSV fields and checks row widths before adopting a new dataset; a failed file import leaves the last valid dataset intact.
- Profiles each column (non-empty values, missing values, distinct values, numeric or ISO-calendar-date type).
- Adds two optional, independent filters: complete records only and deduplicated full rows. Filtering does not mutate source records.
- Calculates min, max, arithmetic mean, median, Q1 and Q3 for numeric fields in the current filtered set.
- Exports filtered CSV (with spreadsheet formula-prefix neutralization) and a JSON data-quality report with source/filtered counts, field profiles, filter settings and numeric summaries. The JSON does not include row-level values.
- Import remains local to the user's browser; there is no backend upload.

## Open Source Data Explorer
- Uses the 12-repository snapshot captured on 2026-11-10.
- Computes days since the last push from each original `pushed_at` timestamp and the day of the snapshot. It is NOT an automatically refreshed time series.
- Displays snapshot-relative push recency in the table and two-repository comparison.
- Exports the underlying `pushed_at`, derived age and the existing snapshot metrics. `open_items` denotes GitHub's combined open-issues-plus-pull-requests count.

## Housing Data
- Uses the archived aggregate derived from 30 collected listing records (2026-11-10), with no additional scraping.
- Explains the proportion of each room grouping (e.g. 2-room: 14/30 = 46.67%) and the arithmetic difference between its listing-price median and the full-sample median.
- These descriptive statistics cannot establish a city-wide average, sale price, price trend, or representative market estimate.
- Raw listing addresses, prices and detail URLs remain outside the public repository.

## Checks performed
1. All three new JavaScript files passed syntax parsing.
2. In-process DOM-mock functional tests loaded the 12 actual repository JSON records, filtered rows, computed push recency and selected housing aggregates from 30 records.
3. CSV tests covered malformed record width, missing values, duplicates, invalid calendar dates, ISO-date identification, quartiles, combined filters, and preserving the previous valid dataset after failed import.
4. JSON export was tested with the Pandas filter: source_rows=12, filtered_rows=1, fields=6, without row values.

The Python Playwright smoke suite in `tests/portfolio_smoke.py` was updated to target the latest scripts. It is **not** claimed to have been re-run as a complete live-browser end-to-end test in this turn. A successful GitHub commit is also not evidence that the public Pages deployment finished.

## Related files
- `assets/csv_v14.js`
- `assets/opensource_v14.js`
- `assets/housing_v14.js`
- `assets/v14.css`
- `data/github_repos_snapshot.json`
- `data/housing_aggregate_v8.json`
- `tests/portfolio_smoke.py`
