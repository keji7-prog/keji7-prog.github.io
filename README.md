# Keji Yin — Portfolio

Public website: **https://keji7-prog.github.io/**

A focused portfolio of Python, data analysis, browser-based data collection, and working software tools. The website is hosted by GitHub Pages and runs without a server-side backend.

## Structure

- `index.html` — personal introduction and filterable project gallery
- `content.js` — public profile copy, project order, destinations, and tags
- `script.js` — card rendering, filters, mobile navigation, scroll progress, and theme toggle
- `style.css` — responsive typography, layouts, and project preview illustrations
- `housing-case.html` — public, aggregated results of a verified local collection run
- `projects/housing_analysis.py` — reproducible Pandas analysis script (requires the private CSV as input)
- `data/housing_aggregate_v8.json` — verified public-only aggregate, including source date and field count

Existing project applications remain available under `opensource.html`, `desktop.html`, `demos/csv-lab.html`, and `lab.html`.

## Public / private separation

The site lists selected public project results. The detailed Beijing housing CSV and Excel stay in the separate private repository `beike-housing-project`; those raw files are **not** deployed on the public website. The public case displays only aggregate statistics from the November 10, 2026 collection run.

## Evidence and reproducibility

[Evidence register](docs/EVIDENCE_REGISTER.md) separates observed source records, execution evidence, derived metrics and presentation. The public Beijing housing summary can be reproduced with an authorized copy of the archived CSV:

```bash
python projects/housing_analysis.py path/to/beike_listings.csv --verify data/housing_aggregate_v8.json
```

The site is a showcase of dated observations and functioning tools, not a live property-market or repository-activity feed.

## Data

GitHub repository metrics come from the GitHub REST API and are presented as a dated snapshot, not a live feed. The source collection and analysis scripts are available in this repository.

## Updates

Edit the `projects` array in `content.js` to change project order, labels, or targets. Use the existing project URLs to avoid broken links.

© 2026 Keji Yin. Third-party data and applications remain subject to their source licensing and terms.