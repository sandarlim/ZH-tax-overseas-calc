// Kanton Zürich — Gemeinde Steuerfuss
// Source: https://www.web.statistik.zh.ch/ogd/data/steuerfuesse/kanton_zuerich_stf_aktuell.csv
// STF_O_KIRCHE1 = Steuerfuss without church tax

import rawCsv from "./kanton_zuerich_stf_timeseries.csv?raw";

function parseCsv(csv) {
  const lines = csv.trim().split("\n").slice(1); // skip header
  const result = {};

  for (const line of lines) {
    // parse quoted CSV fields
    const cols = [];
    let current = "", inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; }
      else if (ch === "," && !inQuotes) { cols.push(current.trim()); current = ""; }
      else { current += ch; }
    }
    cols.push(current.trim());

    const year = parseInt(cols[0]);
    const name = cols[2];
    const sf   = parseFloat(cols[3]);

    if (!year || !name || isNaN(sf)) continue;
    if (!result[year]) result[year] = [];
    result[year].push([name, sf / 100]);
  }

  // sort each year alphabetically
  for (const year of Object.keys(result)) {
    result[year].sort((a, b) => a[0].localeCompare(b[0], "de"));
    result[year].push(["Custom...", null]);
  }

  return result;
}

export const STEUERFUSS = parseCsv(rawCsv);
export const TAX_YEARS  = Object.keys(STEUERFUSS).map(Number).sort();