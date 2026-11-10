"""Reproduce aggregate charts from a locally collected property-listing CSV.

Usage: python projects/housing_analysis.py PATH/TO/beike_listings.csv
Raw listing files are intentionally not bundled with the public portfolio.
"""
import argparse
import json
from pathlib import Path

import pandas as pd


def summarize(path: Path) -> dict:
    df = pd.read_csv(path, encoding="utf-8-sig")
    required = {"详情网址", "描述", "总价_万元", "单价_元每平米"}
    missing = sorted(required - set(df.columns))
    if missing:
        raise ValueError(f"Missing expected fields: {', '.join(missing)}")
    prices = pd.to_numeric(df["总价_万元"], errors="coerce")
    unit = pd.to_numeric(df["单价_元每平米"], errors="coerce")
    areas = pd.to_numeric(df["描述"].str.extract(r"(\d+(?:\.\d+)?)\s*平米")[0], errors="coerce")
    rooms = df["描述"].str.extract(r"(\d+)\s*室")[0].fillna("未知")
    counts = rooms.value_counts().sort_index()
    labels = ["200万以下", "200–400万", "400–600万", "600–1000万", "1000万以上"]
    bands = pd.cut(prices, bins=[0, 200, 400, 600, 1000, float("inf")], labels=labels, right=False)
    totals = bands.value_counts().reindex(labels).fillna(0).astype(int)
    return {
        "records": int(len(df)),
        "fields": int(len(df.columns)),
        "unique_urls": int(df["详情网址"].nunique()),
        "median_total_wan": round(float(prices.median()), 2),
        "median_unit_yuan": round(float(unit.median()), 1),
        "median_area_sqm": round(float(areas.median()), 2),
        "rooms": [{"name": f"{k}室", "count": int(v)} for k, v in counts.items()],
        "price_bands": [{"name": str(k), "count": int(v)} for k, v in totals.items()],
    }


def main():
    parser = argparse.ArgumentParser(description="Analyze a collected property-listing CSV")
    parser.add_argument("csv", type=Path)
    parser.add_argument("--output", type=Path, default=None)
    args = parser.parse_args()
    result = summarize(args.csv)
    output = json.dumps(result, ensure_ascii=False, indent=2)
    if args.output:
        args.output.write_text(output, encoding="utf-8")
    print(output)


if __name__ == "__main__":
    main()