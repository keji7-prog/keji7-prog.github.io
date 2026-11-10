"""Turn the public GitHub repository snapshot into reproducible summary metrics.

Usage:
    python scripts/analyze_github_repos.py
Reads data/github_repos_snapshot.json and writes data/github_repos_analysis.json.
No API keys or external packages are required for the offline analysis step.
"""
from __future__ import annotations
import json
import statistics
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'data/github_repos_snapshot.json'
DEST = ROOT / 'data/github_repos_analysis.json'


def analyze(payload: dict) -> dict:
    rows = payload['records']
    assert len(rows) == 12, 'The snapshot must contain exactly 12 selected repositories'
    assert len({x['repo'].casefold() for x in rows}) == len(rows), 'Duplicate repositories'
    for x in rows:
        assert x['stars'] >= 0 and x['forks'] >= 0
        assert x['repo'].count('/') == 1
    ordered = sorted(rows, key=lambda x: (-x['stars'], x['repo']))
    categories = dict(sorted(Counter(x['category'] for x in rows).items()))
    return {
        'collected_on': payload['collected_on'],
        'count': len(rows),
        'median_stars': statistics.median(x['stars'] for x in rows),
        'leading_repository': ordered[0]['repo'],
        'leading_stars': ordered[0]['stars'],
        'categories': categories,
        'records_by_stars': ordered,
    }


def main() -> None:
    result = analyze(json.loads(RAW.read_text('utf-8')))
    DEST.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', 'utf-8')
    print('Records:', result['count'])
    print('Median stars:', result['median_stars'])
    print('Top:', result['leading_repository'], result['leading_stars'])
    print('Categories:', result['categories'])


if __name__ == '__main__':
    main()
