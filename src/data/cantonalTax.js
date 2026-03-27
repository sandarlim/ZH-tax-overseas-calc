
// Kanton Zürich — Cantonal Income & Wealth Tax
// Source: swisstaxcalculator.estv.admin.ch (2025 data, use same for 2026 until updated)
//
// CANTONAL_MULTIPLIER:
//   2025: 0.98 (per StG ZH, unchanged)
//   2026: 0.95 (reduced following November 2024 referendum, effective 1 Jan 2026)
//
// Municipal tax = basic cantonal tax × CANTONAL_MULTIPLIER × Steuerfuss
//
// INCOME TAX: two tariffs
//   "single"  → Single with no children
//   "married" → Married / Single with children (Verheiratetentarif)
//
// WEALTH TAX: two tariffs, different exemptions
//   "single"  → Single with no children  (exemption CHF 80,000)
//   "married" → Married / Single with children (exemption CHF 159,000)
//   Rates are in % (converted to decimal in calculation)

export const CANTONAL_MULTIPLIER = {
  2025: 0.98,
  2026: 0.95,
};

// ─── INCOME TAX BRACKETS ─────────────────────────────────────────────────────
// Format: [upper_bound_CHF, marginal_rate_%]
// Same brackets used for 2025 and 2026 (use 2025 ESTV data for both)

export const ZH_INCOME = {
  single: [
    [6900,       0  ],
    [11800,      2  ],
    [16600,      3  ],
    [24500,      4  ],
    [34100,      5  ],
    [45100,      6  ],
    [58000,      7  ],
    [75400,      8  ],
    [109000,     9  ],
    [142200,     10 ],
    [194900,     11 ],
    [263300,     12 ],
    [Infinity,   13 ],
  ],
  married: [
    [13900,      0  ],
    [20200,      2  ],
    [28200,      3  ],
    [37900,      4  ],
    [49000,      5  ],
    [63300,      6  ],
    [95100,      7  ],
    [127000,     8  ],
    [174900,     9  ],
    [232100,     10 ],
    [294200,     11 ],
    [365800,     12 ],
    [Infinity,   13 ],
  ],
};

// ─── WEALTH TAX ───────────────────────────────────────────────────────────────
// Rates are in ‰ (per mille), stored here as the ‰ value (e.g. 0.05 = 0.05‰)
// Format: [upper_bound_CHF, rate_permille]
// Exemption is the first band (rate 0) effectively — stored separately for clarity

export const ZH_WEALTH = {
  single: {
    exemption: 80000,
    bands: [
      [238000,     0.05],
      [399000,     0.10],
      [636000,     0.15],
      [956000,     0.20],
      [953000,     0.25],  // cumulative upper: ~3,182,000
      [Infinity,   0.30],
    ],
  },
  married: {
    exemption: 159000,
    bands: [
      [239000,     0.05],
      [397000,     0.10],
      [637000,     0.15],
      [955000,     0.20],
      [955000,     0.25],  // cumulative upper: ~3,342,000
      [Infinity,   0.30],
    ],
  },
};