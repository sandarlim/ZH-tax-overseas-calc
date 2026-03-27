// Federal Direct Tax (DBG Art. 36) — update brackets here for future years
// year: tax year these brackets apply to
// married: uses splitting (rate at half income × 2)
// single: standard Grundtarif

export const TAX_YEAR = 2025;

// Numbers in force since 2026 https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_36
export const FED_MARRIED = [
  [29700,   0      ],
  [53400,   0.010  ],
  [61300,   0.020  ],
  [79100,   0.030  ],
  [94900,   0.040  ],
  [108700,  0.050  ],
  [120600,  0.060  ],
  [130500,  0.070  ],
  [138400,  0.080  ],
  [144300,  0.090  ],
  [148300,  0.100  ],
  [150400,  0.110  ],
  [152400,  0.120  ],
  [Infinity,0.130  ],
];

export const FED_SINGLE = [
  [15200,   0      ],
  [33200,   0.0077 ],
  [43500,   0.0088 ],
  [58000,   0.0220 ],
  [76200,   0.0264 ],
  [82100,   0.0297 ],
  [108900,  0.0561 ],
  [141500,  0.0880 ],
  [185100,  0.1100 ],
  [793900,  0.1320 ],
  [Infinity,0.115  ],
];