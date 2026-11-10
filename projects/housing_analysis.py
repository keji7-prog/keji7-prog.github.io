"""Reproduce public housing aggregates from the archived private listing CSV.

Run on an authorized local copy of the dataset:
    python projects/housing_analysis.py path/to/beike_listings.csv --output housing_aggregate.json

Verify against the currently published aggregate:
    python projects/housing_analysis.py path/to/beike_listings.csv --verify data/housing_aggregate_v8.json

This script never downloads housing listings or publishes row-level information.
"""
from __future__ import annotations

import argparse
import json
import math
import statistics
from pathlib import Path

import pandas as pd


REQUIRED = {
    "标题", "描述", "总价_万元", "单价_元每平米",
    "详情网址", "采集时间", "列表页",
}
BANDS = (
    ("低于200万", 0, 200),
    ("200–400万", 200, 400),
    ("400–600万", 400, 600),
    ("600–1000万", 600, 1000),
    ("1000万及以上", 1000, math.inf),
)


def summarize(path: Path) -> dict:
    df = pd.read_csv(path, encoding="utf-8-sig", dtype={"详情网址": str})
    missing = REQUIRED.difference(df.columns)
    if missing:
        raise ValueError("Missing expected columns: " + ", ".join(sorted(missing)))
    if df.empty:
        raise ValueError("No listing rows")
    if df[list(REQUIRED)].isna().any().any():
        raise ValueError("Missing required source fields")
    if df["详情网址"].duplicated().any():
        raise ValueError("Repeated listing detail links")
    if df["采集时间"].nunique() != 1 or df["列表页"].nunique() != 1:
        raise ValueError("This export combines different collection dates or list pages")

    prices = pd.to_numeric(df["总价_万元"], errors="raise")
    units = pd.to_numeric(df["单价_元每平米"], errors="raise")
    areas = pd.to_numeric(
        df["描述"].astype(str).str.extract(r"(\d+(?:\.\d+)?)\s*平米")[0],
        errors="raise",
    )
    room_nums = df["描述"].astype(str).str.extract(r"(\d+)\s*室")[0]
    if room_nums.isna().any() or areas.isna().any():
        raise ValueError("Unable to extract room count or area from every row")
    if (prices <= 0).any() or (units <= 0).any() or (areas <= 0).any():
        raise ValueError("Nonpositive listing price, unit price or area")

    work = pd.DataFrame({
        "room": room_nums.astype(int),
        "price": prices,
        "area": areas,
        "unit": units,
    })
    groups = []
    for room in sorted(work["room"].unique()):
        part = work[work["room"] == room]
        groups.append({
            "room": f"{room}室",
            "records": int(len(part)),
            "median_price_wan": round(float(part["price"].median()), 2),
            "median_area_sqm": round(float(part["area"].median()), 2),
            # Python round uses ties-to-even: e.g. 54,784.5 -> 54,784.
            "median_unit_yuan": int(round(float(part["unit"].median()))),
        })

    bands = [
        {
            "label": name,
            "count": int(((prices >= lower) & (prices < upper)).sum()),
        }
        for name, lower, upper in BANDS
    ]
    total = int(len(df))
    if sum(row["records"] for row in groups) != total:
        raise ValueError("Room group counts do not reconcile")
    if sum(row["count"] for row in bands) != total:
        raise ValueError("Price band counts do not reconcile")

    return {
        "source": str(df["列表页"].iloc[0]),
        "collected_at": str(df["采集时间"].iloc[0]),
        "records": total,
        "unique_urls": int(df["详情网址"].nunique()),
        "median_total_wan": round(float(prices.median()), 2),
        "median_area_sqm": round(float(areas.median()), 2),
        "median_unit_yuan": int(round(float(units.median()))),
        "groups": groups,
        "price_bands": bands,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Reproduce a real collected CSV's housing aggregate")
    parser.add_argument("csv", type=Path, help="Path to authorized local housing CSV")
    parser.add_argument("--output", type=Path, help="Save the generated JSON locally")
    parser.add_argument("--verify", type=Path, help="Compare with a previously published JSON aggregate")
    args = parser.parse_args()
    result = summarize(args.csv)

    if args.verify:
        expected = json.loads(args.verify.read_text(encoding="utf-8"))
        if result != expected:
            raise SystemExit("FAILED: generated aggregate does not equal the published JSON")
        print("VERIFIED: all published fields match the source CSV")

    output = json.dumps(result, indent=2, ensure_ascii=False) + "\n"
    if args.output:
        args.output.write_text(output, encoding="utf-8")
        print("Saved:", args.output)
    else:
        print(output)


if __name__ == "__main__":
    main()
