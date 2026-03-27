// Kanton Zürich — Cantonal Tax (StG ZH §35) — update for future years
// Basic tax is multiplied by CANTONAL_MULTIPLIER (currently 0.95 since 2024 referendum)
// Municipal tax = basic × CANTONAL_MULTIPLIER × Steuerfuss

export const CANTONAL_MULTIPLIER = 0.95; // updated from 0.98 in 2024

// Income tax brackets — Verheiratetentarif (married)
export const ZH_MARRIED = [
  [13900,    0    ],
  [20200,    0.02 ],
  [28200,    0.03 ],
  [37900,    0.04 ],
  [49000,    0.05 ],
  [63300,    0.06 ],
  [95100,    0.07 ],
  [127000,   0.08 ],
  [174000,   0.09 ],
  [232100,   0.10 ],
  [294200,   0.11 ],
  [365800,   0.12 ],
  [Infinity, 0.13 ],
];

// Income tax brackets — Grundtarif (single)
export const ZH_SINGLE = [
  [6900,     0    ],
  [11800,    0.02 ],
  [16600,    0.03 ],
  [24500,    0.04 ],
  [34100,    0.05 ],
  [45100,    0.06 ],
  [58000,    0.07 ],
  [75400,    0.08 ],
  [109000,    0.09 ],
  [142200,   0.10 ],
  [194900,   0.11 ],
  [263000,   0.12 ],
  [Infinity, 0.13 ],
];

// Wealth tax bands (per mille ‰ of taxable wealth)
// Bands apply after exemption is deducted
// using Single, no children wealth tax data
export const WEALTH_BANDS = [
  [80000,    0   ],  // 0‰
  [238000,   0.5 ],  // 0.05‰
  [399000,  1 ],  // 0.1‰
  [636000,  1.5 ],  // 0.15‰
  [956000,  2 ],  // 0.2‰
  [953000,  2 ],  // 0.25‰
  [Infinity, 3 ],  // 0.3‰
];

// Wealth tax exemptions (CHF) — married and single
export const WEALTH_EXEMPT = {
  married: 159000,
  single:  80000,
};