# ZH Tax Calculator — Overseas Property

A simple web app to estimate the Swiss tax impact of owning overseas property, for residents of **Kanton Zürich**.

🔗 **Live app:** [sandarlim.github.io/ZH-tax-overseas-calc](https://sandarlim.github.io/ZH-tax-overseas-calc/)

---

## What it calculates

Swiss tax residents must declare overseas property in their tax return. Although the property income is not directly taxed in Switzerland (thanks to double taxation agreements), it affects your taxes in two ways:

- **Income tax** — overseas rental income or imputed rental value (Eigenmietwert) is added to your rate-determining income, pushing you into a higher bracket via the progression reservation (Progressionsvorbehalt)
- **Wealth tax** — the net value of the overseas property is added to your worldwide taxable wealth

This calculator estimates the extra tax you pay as a result of owning overseas property.

---

## How to use

1. Select your **filing status** (married or single)
2. Select your **Gemeinde** (or enter a custom Steuerfuss)
3. Enter your **Swiss taxable income** (after all deductions)
4. Enter your **overseas property value** and any mortgage on it
5. Choose between **imputed rental income** or **actual rental income**
6. Enter your **other Swiss net wealth** (bank accounts, investments, 3a, cars, etc.)

The app will show the extra federal, cantonal, and municipal tax caused by the overseas property.

---

## Important notes

- Based on **2025 federal and Kanton Zürich tax rates and brackets**
- Covers **federal direct tax** (DBG Art. 36), **Kanton Zürich cantonal tax** (StG ZH §35, ×0.95 multiplier), and **municipal tax** via Steuerfuss
- **No church tax** included
- This is an **approximation for illustrative purposes only** — figures may not be fully up to date
- For accurate calculations, please consult a qualified Swiss tax advisor
- If you spot an error in the rates or brackets, feel free to [open an issue](https://github.com/sandarlim/ZH-tax-overseas-calc/issues) or update the app yourself — contributions welcome!
- You can also reach me directly via GitHub

> **Note on Eigenmietwert:** The imputed rental value system (Eigenmietwert) is expected to be abolished in Switzerland in the coming years following parliamentary approval. Once abolished, owner-occupied properties will no longer generate deemed rental income for tax purposes. This will affect the income progression calculation in this app. The overseas property rules may also be revised accordingly.

---

## Tech stack

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## Run locally

```bash
git clone https://github.com/sandarlim/ZH-tax-overseas-calc.git
cd ZH-tax-overseas-calc
npm install --legacy-peer-deps
npm run dev
```

## Deploy

```bash
npm run deploy
```

---

---

# ZH Steuerrechner — Ausländische Liegenschaften

Eine einfache Web-App zur Schätzung der Steuerauswirkungen von ausländischem Immobilienbesitz für Einwohnerinnen und Einwohner des **Kantons Zürich**.

🔗 **Live-App:** [sandarlim.github.io/ZH-tax-overseas-calc](https://sandarlim.github.io/ZH-tax-overseas-calc/)

---

## Was berechnet wird

Steueransässige in der Schweiz müssen ausländische Liegenschaften in ihrer Steuererklärung deklarieren. Obwohl die Einkünfte aus diesen Liegenschaften dank Doppelbesteuerungsabkommen nicht direkt in der Schweiz besteuert werden, haben sie dennoch Auswirkungen auf die Steuern:

- **Einkommenssteuer** — Mieteinnahmen oder der Eigenmietwert einer selbstgenutzten Liegenschaft werden dem satzbestimmenden Einkommen hinzugerechnet (Progressionsvorbehalt), was zu einem höheren Steuersatz führt
- **Vermögenssteuer** — der Nettowert der ausländischen Liegenschaft wird dem steuerbaren Gesamtvermögen hinzugerechnet

Diese App schätzt die zusätzliche Steuerbelastung durch den Besitz einer ausländischen Liegenschaft.

---

## Bedienung

1. **Zivilstand** wählen (verheiratet oder ledig)
2. **Gemeinde** wählen oder einen eigenen Steuerfuss eingeben
3. **Steuerbares Einkommen** eingeben (nach allen Abzügen)
4. **Wert der ausländischen Liegenschaft** und allfällige Hypotheken eingeben
5. Zwischen **Eigenmietwert** und **tatsächlichen Mieteinnahmen** wählen
6. **Übriges steuerbares Vermögen** eingeben (Bankkonten, Wertschriften, 3a, Fahrzeuge usw.)

Die App zeigt die zusätzliche Steuerbelastung auf Bundes-, Kantons- und Gemeindeebene an.

---

## Wichtige Hinweise

- Basiert auf den **Steuertarifen 2025 des Bundes und des Kantons Zürich**
- Berücksichtigt die **direkte Bundessteuer** (DBG Art. 36), die **Kantonssteuer Zürich** (StG ZH §35, Faktor ×0.95) sowie die **Gemeindesteuer** über den Steuerfuss
- **Ohne Kirchensteuer**
- Dies ist eine **Näherungsrechnung zu Illustrationszwecken** — die Zahlen sind möglicherweise nicht vollständig aktuell
- Für eine genaue Berechnung wenden Sie sich bitte an eine qualifizierte Steuerberaterin oder einen qualifizierten Steuerberater
- Falls Sie einen Fehler bei den Tarifen entdecken, können Sie gerne ein [Issue eröffnen](https://github.com/sandarlim/ZH-tax-overseas-calc/issues) oder die App selbst anpassen — Beiträge sind willkommen!
- Sie können mich auch direkt über GitHub kontaktieren

> **Hinweis zum Eigenmietwert:** Das System des Eigenmietwerts soll in der Schweiz in den kommenden Jahren abgeschafft werden, nachdem das Parlament entsprechende Beschlüsse gefasst hat. Nach der Abschaffung werden selbstgenutzte Liegenschaften keine fiktiven Mieteinnahmen mehr generieren. Dies wird die Progressionsberechnung in dieser App beeinflussen. Die Regelungen für ausländische Liegenschaften könnten ebenfalls angepasst werden.

---

## Technologie

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## Lokal ausführen

```bash
git clone https://github.com/sandarlim/ZH-tax-overseas-calc.git
cd ZH-tax-overseas-calc
npm install --legacy-peer-deps
npm run dev
```

## Deployment

```bash
npm run deploy
```