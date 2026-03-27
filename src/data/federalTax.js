// Federal Direct Tax (DBG Art. 36)
// Sources:
//   2025: ESTV Rundschreiben 2-210-D-2024-d, 22 August 2024 (official ESTV PDF)
//   2026: V of EFD of 10 Sept 2025 on cold progression (AS 2025 579/621), fedlex Art. 36
//
// Rates stored as decimals (e.g. 0.01 = 1%)
// Format: [upper_bound_CHF, marginal_rate]
// Note: federal brackets apply directly (no splitting — the married tariff
// already incorporates the favourable rate for couples per Art. 36 para. 2)

export const FEDERAL_TAX = {
  2025: {
    // Art. 36 para. 1 — Single (Grundtarif)
    single: [
      [15200,   0      ],
      [33200,   0.0077 ],
      [43500,   0.0088 ],
      [58000,   0.0264 ],  // note: 2.64 per 100 CHF
      [76100,   0.0297 ],
      [82000,   0.0594 ],
      [108800,  0.0660 ],
      [141500,  0.0880 ],
      [184900,  0.1100 ],
      [793400,  0.1320 ],
      [Infinity,0.115  ],
    ],
    // Art. 36 para. 2 — Married / Single with children (Verheiratetentarif)
    married: [
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
      [940800,  0.130  ],
      [Infinity,0.115  ],
    ],
  },
  2026: {
    // Art. 36 para. 1 — Single (Grundtarif)
    // Per fedlex V EFD 10 Sept 2025 (AS 2025 579)
    single: [
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
    ],
    // Art. 36 para. 2 — Married / Single with children
    // Per fedlex V EFD 10 Sept 2025 (AS 2025 579)
    married: [
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
      [941300,  0.130  ],
      [Infinity,0.115  ],
    ],
  },
};