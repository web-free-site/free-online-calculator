"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ToolSlug } from "@/lib/tools-registry";
import { calculateAge } from "@/lib/calculators/age";
import {
  percentOf,
  whatPercentIs,
  percentChange,
  addPercent,
  subtractPercent,
} from "@/lib/calculators/percentage";
import { calculateEmi } from "@/lib/calculators/loan";
import { dateDifferenceBreakdown } from "@/lib/calculators/date-diff";
import { addVat, removeVat, RWANDA_VAT_DEFAULT } from "@/lib/calculators/vat";
import { calculateRwandaNetSalary } from "@/lib/calculators/rwanda-salary";
import { calculateBmi } from "@/lib/calculators/bmi";
import { calculateDiscount } from "@/lib/calculators/discount";
import { calculateTip } from "@/lib/calculators/tip";
import {
  convertLength,
  convertWeight,
  convertTemperature,
} from "@/lib/calculators/units";
import { AdSlot, SponsoredSmartlink } from "@/components/ads/AdSlots";
import type { Locale } from "@/lib/i18n";

const CalculatorLocale = createContext<Locale>("en");
import { SelectInput, TextInput } from "@/components/calculators/Field";

function parseDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function ToolCalculator({ slug, locale = "en" }: { slug: ToolSlug; locale?: Locale }) {
  const inner = (() => {
  switch (slug) {
    case "age-calculator":
      return <AgeCalc />;
    case "percentage-calculator":
      return <PctCalc />;
    case "loan-calculator":
      return <LoanCalc />;
    case "date-difference-calculator":
      return <DateCalc />;
    case "vat-calculator":
      return <VatCalc />;
    case "rwanda-salary-calculator":
      return <SalaryCalc />;
    case "bmi-calculator":
      return <BmiCalc />;
    case "discount-calculator":
      return <DiscountCalc />;
    case "tip-calculator":
      return <TipCalc />;
    case "unit-converter":
      return <UnitCalc />;
    default:
      return null;
  }
  })();
  return <CalculatorLocale.Provider value={locale}>{inner}</CalculatorLocale.Provider>;
}

function ResultPanel({ children }: { children: React.ReactNode }) {
  const locale = useContext(CalculatorLocale);
  return (
    <>
      <div className="result-box" role="status" aria-live="polite">
        {children}
      </div>
      <SponsoredSmartlink locale={locale} className="mt-3" />
      <AdSlot slot="nativeBanner" className="mt-4" />
    </>
  );
}

function AgeCalc() {
  const [birth, setBirth] = useState("1990-06-15");
  const [ref, setRef] = useState(() => new Date().toISOString().slice(0, 10));
  const r = useMemo(() => {
    try {
      return calculateAge(parseDate(birth), parseDate(ref));
    } catch {
      return null;
    }
  }, [birth, ref]);
  return (
    <div className="space-y-3">
      <TextInput
        id="age-birth"
        label="Birth date"
        type="date"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
      />
      <TextInput
        id="age-reference"
        label="Reference date"
        type="date"
        value={ref}
        onChange={(e) => setRef(e.target.value)}
      />
      {r && (
        <ResultPanel>
          <p>
            <strong>{r.years}</strong> years, <strong>{r.months}</strong> months,{" "}
            <strong>{r.days}</strong> days
          </p>
          <p>
            Total days: {r.totalDays}. Next birthday in {r.nextBirthdayDays} days.
          </p>
        </ResultPanel>
      )}
    </div>
  );
}

function PctCalc() {
  const [mode, setMode] = useState("of");
  const [a, setA] = useState("200");
  const [b, setB] = useState("25");
  const out = useMemo(() => {
    const x = Number(a);
    const y = Number(b);
    if (Number.isNaN(x) || Number.isNaN(y)) return null;
    try {
      if (mode === "of") return `${percentOf(x, y)}`;
      if (mode === "what") return `${whatPercentIs(x, y)}%`;
      if (mode === "change") return `${percentChange(x, y)}%`;
      if (mode === "add") return `${addPercent(x, y)}`;
      return `${subtractPercent(x, y)}`;
    } catch {
      return "—";
    }
  }, [mode, a, b]);
  return (
    <div className="space-y-3">
      <SelectInput
        id="pct-mode"
        label="Calculation mode"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="of">X% of Y</option>
        <option value="what">X is what % of Y</option>
        <option value="change">% change from X to Y</option>
        <option value="add">Add Y% to X</option>
        <option value="sub">Subtract Y% from X</option>
      </SelectInput>
      <TextInput
        id="pct-value-x"
        label="Value X"
        inputMode="decimal"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <TextInput
        id="pct-value-y"
        label="Value Y or percent"
        inputMode="decimal"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      {out && (
        <ResultPanel>
          <p>
            Result: <strong>{out}</strong>
          </p>
        </ResultPanel>
      )}
    </div>
  );
}

function LoanCalc() {
  const [p, setP] = useState("1000000");
  const [rate, setRate] = useState("12");
  const [months, setMonths] = useState("12");
  const r = useMemo(() => {
    try {
      return calculateEmi(Number(p), Number(rate), Number(months));
    } catch {
      return null;
    }
  }, [p, rate, months]);
  return (
    <div className="space-y-3">
      <TextInput
        id="loan-principal"
        label="Loan principal"
        inputMode="decimal"
        value={p}
        onChange={(e) => setP(e.target.value)}
      />
      <TextInput
        id="loan-rate"
        label="Annual interest rate (%)"
        inputMode="decimal"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <TextInput
        id="loan-months"
        label="Tenure (months)"
        inputMode="numeric"
        value={months}
        onChange={(e) => setMonths(e.target.value)}
      />
      {r && (
        <ResultPanel>
          <p>
            Monthly EMI: <strong>{r.emi.toLocaleString()}</strong>
          </p>
          <p>Total interest: {r.totalInterest.toLocaleString()}</p>
          <p>Total payment: {r.totalPayment.toLocaleString()}</p>
        </ResultPanel>
      )}
    </div>
  );
}

function DateCalc() {
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState("2024-12-31");
  const r = useMemo(
    () => dateDifferenceBreakdown(parseDate(start), parseDate(end)),
    [start, end]
  );
  return (
    <div className="space-y-3">
      <TextInput
        id="date-start"
        label="Start date"
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <TextInput
        id="date-end"
        label="End date"
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <ResultPanel>
        <p>
          {r.years}y {r.months}m {r.days}d — <strong>{r.totalDays}</strong> days (
          {r.weeks} weeks + {r.remainingDays}d)
        </p>
      </ResultPanel>
    </div>
  );
}

function VatCalc() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState(String(RWANDA_VAT_DEFAULT));
  const [mode, setMode] = useState<"add" | "remove">("add");
  const r = useMemo(() => {
    const n = Number(amount);
    const rv = Number(rate);
    return mode === "add" ? addVat(n, rv) : removeVat(n, rv);
  }, [amount, rate, mode]);
  return (
    <div className="space-y-3">
      <SelectInput
        id="vat-mode"
        label="VAT direction"
        value={mode}
        onChange={(e) => setMode(e.target.value as "add" | "remove")}
      >
        <option value="add">Add VAT to net</option>
        <option value="remove">Extract VAT from gross</option>
      </SelectInput>
      <TextInput
        id="vat-amount"
        label="Amount"
        inputMode="decimal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <TextInput
        id="vat-rate"
        label="VAT rate (%)"
        inputMode="decimal"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <ResultPanel>
        <p>
          Net: {r.netAmount} · VAT: {r.vatAmount} · Gross: {r.grossAmount}
        </p>
      </ResultPanel>
    </div>
  );
}

function SalaryCalc() {
  const [gross, setGross] = useState("500000");
  const [pension, setPension] = useState("6");
  const r = useMemo(
    () =>
      calculateRwandaNetSalary({
        grossMonthly: Number(gross),
        pensionEmployeePercent: Number(pension),
      }),
    [gross, pension]
  );
  return (
    <div className="space-y-3">
      <TextInput
        id="salary-gross"
        label="Gross monthly salary (RWF)"
        inputMode="decimal"
        value={gross}
        onChange={(e) => setGross(e.target.value)}
      />
      <TextInput
        id="salary-pension"
        label="Employee pension contribution (%)"
        inputMode="decimal"
        value={pension}
        onChange={(e) => setPension(e.target.value)}
      />
      <ResultPanel>
        <p>
          PAYE: <strong>{r.paye.toLocaleString()} RWF</strong>
        </p>
        <p>Pension (employee): {r.pensionEmployee.toLocaleString()} RWF</p>
        <p>Medical (employee): {r.medicalEmployee.toLocaleString()} RWF</p>
        <p className="text-lg font-bold text-[var(--primary)]">
          Net: {r.netSalary.toLocaleString()} RWF
        </p>
        <ul className="mt-2 text-xs text-[var(--muted)]">
          {r.payeBreakdown.map((b) => (
            <li key={b.band}>
              {b.band}: {b.tax.toLocaleString()} RWF
            </li>
          ))}
        </ul>
      </ResultPanel>
    </div>
  );
}

function BmiCalc() {
  const [w, setW] = useState("70");
  const [h, setH] = useState("175");
  const r = useMemo(() => {
    try {
      return calculateBmi(Number(w), Number(h));
    } catch {
      return null;
    }
  }, [w, h]);
  return (
    <div className="space-y-3">
      <TextInput
        id="bmi-weight"
        label="Weight (kg)"
        inputMode="decimal"
        value={w}
        onChange={(e) => setW(e.target.value)}
      />
      <TextInput
        id="bmi-height"
        label="Height (cm)"
        inputMode="decimal"
        value={h}
        onChange={(e) => setH(e.target.value)}
      />
      {r && (
        <ResultPanel>
          <p>
            BMI <strong>{r.bmi}</strong> — {r.category}
          </p>
        </ResultPanel>
      )}
    </div>
  );
}

function DiscountCalc() {
  const [price, setPrice] = useState("250");
  const [pct, setPct] = useState("20");
  const r = useMemo(() => calculateDiscount(Number(price), Number(pct)), [price, pct]);
  return (
    <div className="space-y-3">
      <TextInput
        id="discount-price"
        label="Original price"
        inputMode="decimal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextInput
        id="discount-percent"
        label="Discount (%)"
        inputMode="decimal"
        value={pct}
        onChange={(e) => setPct(e.target.value)}
      />
      <ResultPanel>
        <p>
          You pay <strong>{r.finalPrice}</strong> (save {r.discountAmount})
        </p>
      </ResultPanel>
    </div>
  );
}

function TipCalc() {
  const [bill, setBill] = useState("100");
  const [pct, setPct] = useState("15");
  const [split, setSplit] = useState("2");
  const r = useMemo(() => calculateTip(Number(bill), Number(pct), Number(split)), [bill, pct, split]);
  return (
    <div className="space-y-3">
      <TextInput
        id="tip-bill"
        label="Bill amount"
        inputMode="decimal"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />
      <TextInput
        id="tip-percent"
        label="Tip (%)"
        inputMode="decimal"
        value={pct}
        onChange={(e) => setPct(e.target.value)}
      />
      <TextInput
        id="tip-split"
        label="Split between (people)"
        inputMode="numeric"
        value={split}
        onChange={(e) => setSplit(e.target.value)}
      />
      <ResultPanel>
        <p>
          Tip: {r.tipAmount} · Total: {r.totalWithTip} · Per person: {r.perPerson}
        </p>
      </ResultPanel>
    </div>
  );
}

function UnitCalc() {
  const [cat, setCat] = useState<"length" | "weight" | "temp">("length");
  const [val, setVal] = useState("1");
  const [from, setFrom] = useState("mi");
  const [to, setTo] = useState("km");
  const out = useMemo(() => {
    const v = Number(val);
    if (cat === "length") return convertLength(v, from, to);
    if (cat === "weight") return convertWeight(v, from, to);
    return convertTemperature(v, from, to);
  }, [cat, val, from, to]);
  return (
    <div className="space-y-3">
      <SelectInput
        id="unit-category"
        label="Category"
        value={cat}
        onChange={(e) => setCat(e.target.value as "length" | "weight" | "temp")}
      >
        <option value="length">Length</option>
        <option value="weight">Weight</option>
        <option value="temp">Temperature</option>
      </SelectInput>
      <TextInput
        id="unit-value"
        label="Value"
        inputMode="decimal"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
        <TextInput
          id="unit-from"
          label="From unit"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="input-field flex-1"
        />
        <TextInput
          id="unit-to"
          label="To unit"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="input-field flex-1"
        />
      </div>
      <p className="text-xs text-[var(--muted)]">
        Length: m, km, cm, mi, ft, in · Weight: kg, g, lb, oz · Temp: c, f, k
      </p>
      <ResultPanel>
        <p>
          <strong>{out}</strong> {to}
        </p>
      </ResultPanel>
    </div>
  );
}
