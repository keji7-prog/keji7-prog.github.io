"""Collect fresh GitHub public repository metadata using the official REST API.

Run: python scripts/collect_github_repos.py
Refreshes the raw snapshot; then run analyze_github_repos.py.
Requires network access to api.github.com. A GITHUB_TOKEN environment variable
is optional; it may help with API rate limits. Never commit the token.
"""
from __future__ import annotations
import json
import os
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'data/github_repos_snapshot.json'
REPOS = [
    ('python/cpython', '语言与基础'), ('pandas-dev/pandas', '数据分析'),
    ('numpy/numpy', '数据分析'), ('scikit-learn/scikit-learn', '数据分析'),
    ('psf/requests', '网络与采集'), ('pallets/flask', 'Web 开发'),
    ('django/django', 'Web 开发'), ('fastapi/fastapi', 'Web 开发'),
    ('scrapy/scrapy', '网络与采集'), ('SeleniumHQ/selenium', '自动化'),
    ('microsoft/playwright-python', '自动化'), ('encode/httpx', '网络与采集'),
]


def get_repo(full_name: str) -> dict:
    url = f'https://api.github.com/repos/{full_name}'
    headers = {'Accept': 'application/vnd.github+json', 'User-Agent': 'Keji-Python-Portfolio'}
    token = os.environ.get('GITHUB_TOKEN')
    if token:
        headers['Authorization'] = f'Bearer {token}'
    req = Request(url, headers=headers)
    with urlopen(req, timeout=20) as resp:
        return json.load(resp)


def main() -> None:
    rows = []
    for i, (name, category) in enumerate(REPOS):
        data = get_repo(name)
        assert data['full_name'].casefold() == name.casefold(), (name, data['full_name'])
        rows.append({
            'repo': data['full_name'], 'description': data.get('description') or '',
            'stars': data['stargazers_count'], 'forks': data['forks_count'],
            'issues': data['open_issues_count'], 'language': data.get('language'),
            'created_at': data['created_at'], 'pushed_at': data['pushed_at'],
            'category': category,
        })
        print(f'{i+1:02d}/{len(REPOS)} {name}: {data["stargazers_count"]} stars')
        time.sleep(.25)
    payload = {'source': 'https://api.github.com/repos/{owner}/{repo}',
        'collected_on': datetime.now(timezone.utc).date().isoformat(),
        'selection': '12 selected public repositories relevant to Python, data, web development, and automation',
        'records': rows}
    DEST.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', 'utf-8')
    print('Saved:', DEST)


if __name__ == '__main__':
    main()
