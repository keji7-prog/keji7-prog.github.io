# Keji Yin · Python & Data Projects

**Portfolio:** https://keji7-prog.github.io/

A collection of data applications, Python scripts, and working browser utilities.

## Featured projects

| Project | Open |
|---|---|
| Open Source Data Explorer | [Interactive dashboard](https://keji7-prog.github.io/opensource.html) |
| CSV Data Explorer | [Analyze a CSV](https://keji7-prog.github.io/demos/csv-lab.html) |
| Tkinter Calculator | [Application overview](https://keji7-prog.github.io/desktop.html) |
| Browser utilities | [Calculator, timer, notes, random cards, text processing](https://keji7-prog.github.io/lab.html) |
| Python implementations | [Project source browser](https://keji7-prog.github.io/code.html) |

## Data

The open-source dashboard uses a dated snapshot of metadata obtained from the [GitHub REST API](https://docs.github.com/en/rest/repos/repos#get-a-repository). The snapshot includes twelve named public repositories, original URLs and independently checkable metrics. Figures are snapshot observations, not live measurements.

- Snapshot: `data/github_repos_snapshot.json`
- Python API collector: `scripts/collect_github_repos.py`
- Python analysis: `scripts/analyze_github_repos.py`
- Derived metrics: `data/github_repos_analysis.json`

## Private data project

The Beijing housing-listing collection is stored separately in `keji7-prog/beike-housing-project`, a **private repository**. That project contains the actual local browser collection output, CSV and Excel files, and its analysis application. Access requires the owner's authorization. No listing-level data from that repository are published by this website.

## Software

The deployed website is built with standard HTML, CSS and JavaScript, hosted on GitHub Pages. Tkinter source code can be run in a compatible Python desktop environment; the public site shows the application and recorded results rather than embedding a Windows executable.

## Repository layout

- `index.html` — portfolio and project navigation
- `opensource.html` — public repository data analysis
- `demos/csv-lab.html` — browser CSV analysis
- `lab.html` — interactive browser tools
- `desktop.html` — Python desktop application
- `code.html` — selected project source files
- `scripts/` — data-processing and desktop application programs

Copyright © 2026 Keji Yin. External repositories, datasets and dependencies remain subject to their respective licenses and terms.
