// Kanton Zürich — Cantonal Income & Wealth Tax
// Source: swisstaxcalculator.estv.admin.ch (export as CSV)
// Save the exported CSV as src/data/zh_estv_rates.csv
//
// To add a new year: append the new year's rows to zh_estv_rates.csv — no code changes needed.
//
// CSV format:
//   Year, Canton ID, Canton, Type of tax, Taxable entity, Tax authority, For the next CHF, Additional %
//
// "For the next CHF" = band SIZE — accumulated to get upper bounds
//
// CANTONAL_MULTIPLIER:
//   2025: 0.98
//   2026: 0.95 (reduced following November 2024 referendum)

import rawCsv from "./zh_estv_rates.csv?raw";

export const CANTONAL_MULTIPLIER = {
  2025: 0.98,
  2026: 0.95,
};

function parseNumber(s) {
  return parseFloat(String(s).replace(/,/g, ""));
}

function toUpperBounds(bands) {
  let cum = 0;
  return bands.map(({ size, rate }, i) => {
    cum += size;
    return [i === bands.length - 1 ? Infinity : cum, rate];
  });
}

function extractExemptionAndBands(bounds) {
  // First entry has rate 0 — its upper bound is the exemption threshold
  return {
    exemption: bounds[0][0],
    bands: bounds.slice(1),
  };
}

function parseCsv(csv) {
  const lines = csv.trim().split("\n").slice(1);
  // Structure: { [year]: { income: { single, married }, wealth: { single, married } } }
  const byYear = {};

  for (const line of lines) {
    const cols = [];
    let cur = "", inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === "," && !inQ) { cols.push(cur.trim()); cur = ""; }
      else { cur += ch; }
    }
    cols.push(cur.trim());

    if (cols.length < 8) continue;

    const year     = parseInt(cols[0]);
    const taxType  = cols[3].toLowerCase();
    const entity   = cols[4].toLowerCase();
    const size     = parseNumber(cols[6]);
    const rate     = parseFloat(cols[7]);

    if (isNaN(year) || isNaN(size) || isNaN(rate)) continue;

    const isIncome  = taxType.includes("income");
    const isWealth  = taxType.includes("wealth");
    const isMarried = entity.includes("married");
    const key       = isMarried ? "married" : "single";

    if (!byYear[year]) byYear[year] = {
      income: { single: [], married: [] },
      wealth: { single: [], married: [] },
    };

    if (isIncome)      byYear[year].income[key].push({ size, rate });
    else if (isWealth) byYear[year].wealth[key].push({ size, rate });
  }

  // Convert to upper bounds and extract wealth exemptions
  const result = {};
  for (const [year, data] of Object.entries(byYear)) {
    result[year] = {
      income: {
        single:  toUpperBounds(data.income.single),
        married: toUpperBounds(data.income.married),
      },
      wealth: {
        single:  extractExemptionAndBands(toUpperBounds(data.wealth.single)),
        married: extractExemptionAndBands(toUpperBounds(data.wealth.married)),
      },
    };
  }
  return result;
}

const parsed = parseCsv(rawCsv);

// ZH_RATES[year].income.single / .married  → [[upperBound, rate%], ...]
// ZH_RATES[year].wealth.single / .married  → { exemption: CHF, bands: [[upperBound, ‰], ...] }
export const ZH_RATES = parsed;

// Convenience getters with fallback to most recent year
export function getIncome(year) {
  return (ZH_RATES[year] || ZH_RATES[Object.keys(ZH_RATES).sort().at(-1)]).income;
}
export function getWealth(year) {
  return (ZH_RATES[year] || ZH_RATES[Object.keys(ZH_RATES).sort().at(-1)]).wealth;
}