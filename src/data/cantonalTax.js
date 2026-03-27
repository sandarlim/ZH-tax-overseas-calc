// Kanton Zürich — Cantonal Tax (StG ZH §35) — update for future years
// Basic tax is multiplied by CANTONAL_MULTIPLIER (currently 0.95 since 2024 referendum)
// Municipal tax = basic × CANTONAL_MULTIPLIER × Steuerfuss

export const CANTONAL_MULTIPLIER = 0.95; // updated from 0.98 in 2024

// Income tax brackets — Verheiratetentarif (married)
export const ZH_MARRIED = [
  [13100,    0    ],
  [23100,    0.02 ],
  [31800,    0.03 ],
  [41600,    0.04 ],
  [53800,    0.05 ],
  [68200,    0.06 ],
  [84100,    0.07 ],
  [101500,   0.08 ],
  [120400,   0.09 ],
  [141000,   0.10 ],
  [164100,   0.11 ],
  [189700,   0.12 ],
  [Infinity, 0.13 ],
];

// Income tax brackets — Grundtarif (single)
export const ZH_SINGLE = [
  [6600,     0    ],
  [11500,    0.02 ],
  [16100,    0.03 ],
  [24300,    0.04 ],
  [33000,    0.05 ],
  [43400,    0.06 ],
  [56100,    0.07 ],
  [70200,    0.08 ],
  [85700,    0.09 ],
  [103100,   0.10 ],
  [122700,   0.11 ],
  [144300,   0.12 ],
  [Infinity, 0.13 ],
];

// Wealth tax bands (per mille ‰ of taxable wealth)
// Bands apply after exemption is deducted
export const WEALTH_BANDS = [
  [77000,    0   ],  // 0‰
  [308000,   0.5 ],  // 0.5‰
  [3158000,  1.0 ],  // 1‰
  [Infinity, 3.0 ],  // 3‰
];

// Wealth tax exemptions (CHF) — married and single
export const WEALTH_EXEMPT = {
  married: 159000,
  single:  77000,
};