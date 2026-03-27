// Federal Direct Tax (DBG Art. 36) — update brackets here for future years
// year: tax year these brackets apply to
// married: uses splitting (rate at half income × 2)
// single: standard Grundtarif

export const TAX_YEAR = 2025;

export const FED_MARRIED = [
  [28300,   0      ],
  [50900,   0.010  ],
  [58400,   0.020  ],
  [75300,   0.030  ],
  [90300,   0.040  ],
  [103400,  0.050  ],
  [114700,  0.060  ],
  [124200,  0.070  ],
  [131700,  0.080  ],
  [137300,  0.090  ],
  [141200,  0.100  ],
  [143100,  0.105  ],
  [145000,  0.110  ],
  [Infinity,0.115  ],
];

export const FED_SINGLE = [
  [14500,   0      ],
  [31600,   0.0077 ],
  [41400,   0.0088 ],
  [55200,   0.0220 ],
  [72500,   0.0264 ],
  [78100,   0.0297 ],
  [103600,  0.0561 ],
  [134600,  0.0880 ],
  [176000,  0.1100 ],
  [755200,  0.1320 ],
  [Infinity,0.115  ],
];