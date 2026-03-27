import { useState } from "react";
import { FEDERAL_TAX } from "./data/federalTax";
import { getIncome, getWealth, CANTONAL_MULTIPLIER } from "./data/cantonalTax";
import { STEUERFUSS, TAX_YEARS } from "./data/gemeindeTax";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function bracket(income, table) {
  // rates in table are percentages (e.g. 2 = 2%)
  let tax = 0, prev = 0;
  for (const [upto, rate] of table) {
    if (income <= prev) break;
    tax += (Math.min(income, upto) - prev) * (rate / 100);
    prev = upto;
  }
  return tax;
}

function fedTax(income, married, year) {
  // rates in FEDERAL_TAX are decimals (e.g. 0.01 = 1%)
  const tariff = FEDERAL_TAX[year] || FEDERAL_TAX[2026];
  const tbl = married ? tariff.married : tariff.single;
  let tax = 0, prev = 0;
  for (const [upto, rate] of tbl) {
    if (income <= prev) break;
    tax += (Math.min(income, upto) - prev) * rate;
    prev = upto;
  }
  return tax;
}

function zhBasic(income, married, year) {
  const tbl = getIncome(year);
  return bracket(income, married ? tbl.married : tbl.single);
}

function wealthBasic(netWealth, married, year) {
  const cfg = getWealth(year)[married ? "married" : "single"];
  const taxable = Math.max(0, netWealth - cfg.exemption);
  let tax = 0, prev = 0;
  for (const [upto, pm] of cfg.bands) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, upto) - prev) * (pm / 1000);
    prev = upto;
  }
  return tax;
}

const fmt = n => "CHF " + Math.round(n).toLocaleString("de-CH");
const pct = n => (n * 100).toFixed(3) + "%";

export default function App() {
  const [taxYear, setTaxYear] = useState(2026);
  const [married, setMarried] = useState(true);
  const [swissIncome, setSwissIncome] = useState(100000);
  const [propValue, setPropValue] = useState(200000);
  const [mortgage, setMortgage] = useState(0);
  const [imputedRate, setImputedRate] = useState(3.5);
  const [rentalMode, setRentalMode] = useState("imputed");
  const [actualRental, setActualRental] = useState(0);
  const [swissWealth, setSwissWealth] = useState(0);
  const [gemIdx, setGemIdx] = useState(0);
  const [customSF, setCustomSF] = useState(119);
  const [tab, setTab] = useState("summary");

  const GEMEINDEN = [...(STEUERFUSS[taxYear] || []), ["Custom...", null]];
  const sf = gemIdx >= GEMEINDEN.length - 1 ? customSF / 100 : GEMEINDEN[gemIdx][1];
  const imputed = rentalMode === "actual" ? actualRental : propValue * (imputedRate / 100);
  const propNet = Math.max(0, propValue - mortgage);
  const totalWealth = swissWealth + propNet;

  const cm = CANTONAL_MULTIPLIER[taxYear] || CANTONAL_MULTIPLIER[2026];

  function allTax(swissInc, rateInc) {
    const fRate = rateInc > 0 ? fedTax(rateInc, married, taxYear) / rateInc : 0;
    const cRate = rateInc > 0 ? zhBasic(rateInc, married, taxYear) * cm / rateInc : 0;
    const mRate = rateInc > 0 ? zhBasic(rateInc, married, taxYear) * cm * sf / rateInc : 0;
    return {
      fed: swissInc * fRate, fRate,
      can: swissInc * cRate, cRate,
      mun: swissInc * mRate, mRate,
    };
  }

  const tW  = allTax(swissIncome, swissIncome + imputed);
  const tWo = allTax(swissIncome, swissIncome);

  const dFed = tW.fed - tWo.fed;
  const dCan = tW.can - tWo.can;
  const dMun = tW.mun - tWo.mun;
  const dInc = dFed + dCan + dMun;

  const wTaxWo = wealthBasic(swissWealth, married) * cm * (1 + sf);
  const wTaxW  = wealthBasic(totalWealth,  married) * cm * (1 + sf);
  const dWealth = wTaxW - wTaxWo;
  const dTotal  = dInc + dWealth;

  const exemption = getWealth(taxYear)[married ? "married" : "single"].exemption;

  const Pill = ({ id, children }) => (
    <button onClick={() => setTab(id)}
      className={`px-3 py-1 rounded-full text-xs font-medium ${tab === id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
      {children}
    </button>
  );

  const Row = ({ label, val, indent, bold, highlight, gray, sub }) => (
    <tr className={highlight ? "bg-amber-50" : gray ? "bg-gray-50" : ""}>
      <td className={`py-1.5 pr-4 text-xs ${indent ? "pl-5" : "pl-1"} ${bold ? "font-semibold" : ""} ${gray ? "text-gray-400" : "text-gray-700"}`}>
        {label}{sub && <span className="text-gray-400 font-normal"> {sub}</span>}
      </td>
      <td className={`py-1.5 text-right text-xs ${bold ? "font-semibold" : ""} ${highlight ? "text-amber-800 font-semibold" : gray ? "text-gray-400" : "text-gray-800"}`}>{val}</td>
    </tr>
  );

  return (
    <div className="max-w-lg mx-auto p-4 font-sans text-sm bg-white">
      <div className="mb-4">
        <h1 className="text-base font-bold text-gray-900">Kanton Zurich — Overseas Property Tax Impact Calculator</h1>
        <p className="text-xs text-gray-500">Federal + Canton Zürich + Municipal. {married ? "Married" : "Single"}, no kids, no church tax.</p>
      </div>

      {/* INPUTS */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Inputs</p>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Tax year</label>
          <div className="flex gap-2">
            {TAX_YEARS.map(y => (
              <button key={y} onClick={() => { setTaxYear(y); setGemIdx(0); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium border ${taxYear === y ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300"}`}>
                {y}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Filing status</label>
          <div className="flex gap-2">
            {[[true,"Married"],[false,"Single"]].map(([m, label]) => (
              <button key={label} onClick={() => setMarried(m)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium border ${married === m ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Gemeinde (Steuerfuss)</label>
          <select value={gemIdx} onChange={e => setGemIdx(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white">
            {GEMEINDEN.map(([name, sf], i) => (
              <option key={i} value={i}>{name}{sf ? ` — ${Math.round(sf * 100)}%` : ""}</option>
            ))}
          </select>
          {gemIdx === GEMEINDEN.length - 1 && (
            <div className="mt-2 flex items-center gap-2">
              <input type="number" value={customSF} min={50} max={150} step={1}
                onChange={e => setCustomSF(Number(e.target.value))}
                className="w-24 border border-gray-300 rounded px-2 py-1 text-sm" />
              <span className="text-xs text-gray-500">% Steuerfuss</span>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-1">Active Steuerfuss: <strong>{Math.round(sf * 100)}%</strong></p>
        </div>

        {[
          ["Swiss taxable income (after all deductions)", swissIncome, setSwissIncome, 1000],
          ["Overseas property value", propValue, setPropValue, 1000],
          ["Mortgage on overseas property", mortgage, setMortgage, 1000],
          ["Other Swiss net wealth (bank, investments, 3a, cars, etc.)", swissWealth, setSwissWealth, 5000],
        ].map(([label, val, set, step]) => (
          <div key={label}>
            <label className="block text-xs text-gray-600 mb-1">{label}</label>
            <div className="relative">
              <span className="absolute left-3 top-1.5 text-gray-400 text-xs">CHF</span>
              <input type="number" value={val} step={step}
                onChange={e => set(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-1.5 text-sm" />
            </div>
          </div>
        ))}

        <div>
          <label className="block text-xs text-gray-600 mb-1">Overseas property income type</label>
          <div className="flex gap-2 mb-2">
            {[["imputed","Imputed rental"],["actual","Actual rental income"]].map(([mode, label]) => (
              <button key={mode} onClick={() => setRentalMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${rentalMode === mode ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300"}`}>
                {label}
              </button>
            ))}
          </div>
          {rentalMode === "imputed" ? (
            <div className="flex items-center gap-2">
              <input type="number" value={imputedRate} step={0.1} min={0} max={10}
                onChange={e => setImputedRate(Number(e.target.value))}
                className="w-24 border border-gray-300 rounded-lg px-3 py-1.5 text-sm" />
              <span className="text-xs text-gray-500">% of property value = {fmt(propValue * (imputedRate / 100))}</span>
            </div>
          ) : (
            <div className="relative">
              <span className="absolute left-3 top-1.5 text-gray-400 text-xs">CHF</span>
              <input type="number" value={actualRental} step={500}
                onChange={e => setActualRental(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-1.5 text-sm"
                placeholder="Annual rental income" />
            </div>
          )}
          <p className="text-xs text-gray-400 mt-1">Rate-determining income addition: <strong>{fmt(imputed)}</strong></p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-3">
        <Pill id="summary">Summary</Pill>
        <Pill id="income">Income Tax</Pill>
        <Pill id="wealth">Wealth Tax</Pill>
      </div>

      {tab === "summary" && (
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2">Component</th>
                  <th className="text-right text-xs font-semibold text-gray-500 px-3 py-2">Extra tax</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Federal income tax", dFed],
                  ["Canton Zürich income tax", dCan],
                  ["Municipal income tax", dMun],
                  ["Wealth tax (canton + municipal)", dWealth],
                ].map(([label, val], i) => (
                  <tr key={label} className={i % 2 ? "bg-gray-50" : ""}>
                    <td className="px-3 py-2 text-xs text-gray-700">{label}</td>
                    <td className="px-3 py-2 text-right text-xs text-gray-800">{fmt(val)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-300 bg-amber-50">
                  <td className="px-3 py-3 text-sm font-bold text-amber-900">Total extra tax</td>
                  <td className="px-3 py-3 text-right text-sm font-bold text-amber-900">{fmt(dTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[["Income impact", dInc, "rate progression effect"], ["Wealth impact", dWealth, `from ${fmt(propNet)} property`]].map(([label, val, sub]) => (
              <div key={label} className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium">{label}</p>
                <p className="text-lg font-bold text-blue-900">{fmt(val)}</p>
                <p className="text-xs text-blue-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "income" && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <tbody>
              <Row label="Swiss taxable income" val={fmt(swissIncome)} bold />
              <Row label={rentalMode === "imputed" ? "+ Overseas imputed rental income" : "+ Overseas actual rental income"}
                val={fmt(imputed)} indent
                sub={rentalMode === "imputed" ? `(${imputedRate}% × ${fmt(propValue)})` : "(rate-determining only, not taxed in CH)"} />
              <Row label="= Rate-determining income" val={fmt(swissIncome + imputed)} bold />
              {[
                ["Federal Tax", tWo.fRate, tW.fRate, dFed],
                ["Canton Zürich (×0.95)", tWo.cRate, tW.cRate, dCan],
                [`Municipal (Steuerfuss ${Math.round(sf*100)}%)`, tWo.mRate, tW.mRate, dMun],
              ].map(([title, rBefore, rAfter, impact]) => (
                <>
                  <tr key={title}><td colSpan={2} className="pt-3 pb-1 px-1 text-xs font-semibold text-blue-700 uppercase tracking-wide">{title}</td></tr>
                  <Row label="Effective rate (Swiss only)" val={pct(rBefore)} indent gray />
                  <Row label="Effective rate (with overseas)" val={pct(rAfter)} indent />
                  <Row label="Tax impact" val={fmt(impact)} highlight />
                </>
              ))}
              <tr className="border-t-2 border-gray-200">
                <td className="px-1 py-2 text-xs font-bold text-amber-800">Total income tax impact</td>
                <td className="px-1 py-2 text-right text-xs font-bold text-amber-800">{fmt(dInc)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {tab === "wealth" && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <tbody>
              <Row label="Other Swiss net wealth" val={fmt(swissWealth)} />
              <Row label="Overseas property (net of mortgage)" val={fmt(propNet)} indent />
              <Row label="Total net wealth for tax" val={fmt(totalWealth)} bold />
              <Row label="Less: exemption" val={`− ${fmt(exemption)}`} indent gray />
              <Row label="Taxable wealth (without property)" val={fmt(Math.max(0, swissWealth - exemption))} indent />
              <Row label="Taxable wealth (with property)" val={fmt(Math.max(0, totalWealth - exemption))} indent />
              <tr><td colSpan={2} className="pt-3 pb-1 px-1 text-xs font-semibold text-blue-700 uppercase tracking-wide">
                Wealth Tax (Canton ×${cm} + Municipal Steuerfuss ${Math.round(sf*100)}%)
              </td></tr>
              <Row label="Wealth tax without property" val={fmt(wTaxWo)} indent />
              <Row label="Wealth tax with property" val={fmt(wTaxW)} indent />
              <Row label="Wealth tax impact" val={fmt(dWealth)} highlight />
              <tr><td colSpan={2} className="px-1 py-2 text-xs text-gray-400">
              </td></tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Disclaimer</p>
        <p className="text-xs text-gray-500">Based on <strong>2025 federal and Kanton Zürich tax rates</strong> (DBG Art. 36; StG ZH §35 ×0.95 cantonal multiplier). Excludes church tax.</p>
        <p className="text-xs text-gray-500">This calculator is an <strong>approximation for illustrative purposes only</strong>. Figures may not be fully up to date. For accurate calculations, consult a qualified Swiss tax advisor.</p>
        <p className="text-xs text-gray-500">⚠️ <strong>Note on Eigenmietwert:</strong> The imputed rental value system will be abolished in Switzerland in the coming years. This will affect the income progression calculation.</p>
        <p className="text-xs text-gray-500">Found an error? <a href="https://github.com/sandarlim/ZH-tax-overseas-calc/issues" className="text-blue-500 underline" target="_blank">Open an issue on GitHub</a> or <a href="https://github.com/sandarlim/ZH-tax-overseas-calc/fork" className="text-blue-500 underline" target="_blank">fork the project</a> to update.</p>
      </div>
    </div>
  );
}