# Keji Yin · Python & Data Portfolio

[Visit the public website](https://keji7-prog.github.io/) | [Open Source Data Explorer](https://keji7-prog.github.io/opensource.html) | [Tkinter Calculator](https://keji7-prog.github.io/desktop.html)

A selected portfolio of practical Python, data processing and desktop interface projects.

## Selected projects

### 01. GitHub Open-Source Data Explorer

Collects public repository metadata for 12 selected Python-related open-source repositories through the official GitHub REST API, then runs Python analysis for ranking, median star counts and category distributions. The results are displayed in a fully interactive static page with search, filtering, sorting and direct links to all original repositories.

- **Source**: GitHub REST API `GET /repos/{owner}/{repo}`.
- **Snapshot date**: 2026-11-10.
- **Raw snapshot**: `data/github_repos_snapshot.json`.
- **Python analysis output**: `data/github_repos_analysis.json`.
- **Analysis implementation**: `scripts/analyze_github_repos.py`.
- **Recollection implementation**: `scripts/collect_github_repos.py`.

The published snapshot was retrieved using a connected GitHub interface and processed with the included Python script. The separate Python collection script offers a way to refresh it when executed in an environment with GitHub API network access. This is a curated sample, not a complete ecosystem dataset.

Re-run the analysis:

```bash
python scripts/analyze_github_repos.py
```

Re-fetch current GitHub metadata (internet required):

```bash
python scripts/collect_github_repos.py
python scripts/analyze_github_repos.py
```

### 02. Tkinter Calculator

An adaptation and refinement of a classroom calculator exercise. Improvements include an evenly laid out button grid, constrained arithmetic expression parsing and basic exception handling. The project includes an actual application screenshot, Python source code and executed functional checks.

- **App**: `scripts/verified_calculator.py`.
- **GUI interaction test**: `scripts/test_verified_calculator.py`.
- **Test results**: `data/verified_calculator_checks.json`.
- **Screenshot**: embedded as a real captured application image in `desktop.html`.

The GUI test and screenshot were taken on Linux Tk 8.6 under Xvfb. The Windows EXE from the classroom is not part of this project or presented as separately tested.

## Website architecture

All public pages are static HTML/CSS/JavaScript, deployed on GitHub Pages. No secrets, browser cookies, authenticated API calls or private accounts are included in the website. All linked data is publicly available.

- `index.html`: selected work and about.
- `opensource.html`: interactive repository dataset.
- `desktop.html`: desktop application showcase.
- `assets/site.css`, `assets/site.js`: shared site design and interactivity.

Previously shared course CSV summaries and nonverified listing examples are not included in the curated public showcase. Earlier versions remain in Git history for archival purposes. Teacher material and prior classroom code are not represented as fully independent original projects.
