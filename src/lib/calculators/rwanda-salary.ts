/**
 * Rwanda net salary estimate (RWF).
 * PAYE: marginal monthly brackets per RRA (permanent employee).
 * RSSB: pension + medical employee shares (configurable; defaults reflect 2025 pension reform).
 */

export interface PayeBracket {
  from: number;
  to: number | null;
  rate: number;
}

/** RRA monthly PAYE brackets for permanent employees (from 60k zero band). */
export const PAYE_BRACKETS_MONTHLY: PayeBracket[] = [
  { from: 0, to: 60_000, rate: 0 },
  { from: 60_001, to: 100_000, rate: 0.1 },
  { from: 100_001, to: 200_000, rate: 0.2 },
  { from: 200_001, to: null, rate: 0.3 },
];

export interface RwandaSalaryOptions {
  grossMonthly: number;
  /** Employee pension % of gross (default 6% — total 12% from Jan 2025 per RSSB). */
  pensionEmployeePercent?: number;
  /** Employee medical insurance % (RSSB CBHI/MMI — 7.5% per RRA). */
  medicalEmployeePercent?: number;
  /** If true, PAYE is computed on gross minus employee pension only (common payroll practice). */
  payeOnTaxableAfterPension?: boolean;
}

export interface RwandaSalaryResult {
  gross: number;
  pensionEmployee: number;
  medicalEmployee: number;
  taxableForPaye: number;
  paye: number;
  netSalary: number;
  totalDeductions: number;
  payeBreakdown: { band: string; tax: number }[];
}

export function calculateMarginalPaye(
  taxableMonthly: number,
  brackets: PayeBracket[] = PAYE_BRACKETS_MONTHLY
): { total: number; breakdown: { band: string; tax: number }[] } {
  const total = marginalPayeCorrect(taxableMonthly, brackets);
  const breakdown = marginalPayeBreakdown(taxableMonthly, brackets);
  return { total: round0(total), breakdown };
}

/** RRA handbook example: Lucie FRW 300k taxable → PAYE 54,000. */
function bandFloor(from: number): number {
  return from === 0 ? 0 : from - 1;
}

function marginalPayeCorrect(income: number, brackets: PayeBracket[]): number {
  let tax = 0;
  for (const b of brackets) {
    const upper = b.to ?? Infinity;
    const floor = bandFloor(b.from);
    if (income <= floor) continue;
    const taxableInBand = Math.min(income, upper) - floor;
    if (taxableInBand > 0) tax += taxableInBand * b.rate;
  }
  return tax;
}

function marginalPayeBreakdown(
  income: number,
  brackets: PayeBracket[]
): { band: string; tax: number }[] {
  const out: { band: string; tax: number }[] = [];
  for (const b of brackets) {
    const upper = b.to ?? Infinity;
    const floor = bandFloor(b.from);
    if (income <= floor) continue;
    const taxableInBand = Math.min(income, upper) - floor;
    if (taxableInBand <= 0) continue;
    const label =
      b.to === null
        ? `Above RWF ${b.from.toLocaleString()} @ ${b.rate * 100}%`
        : `RWF ${b.from.toLocaleString()}–${b.to.toLocaleString()} @ ${b.rate * 100}%`;
    out.push({ band: label, tax: round0(taxableInBand * b.rate) });
  }
  return out;
}

export function calculateRwandaNetSalary(
  options: RwandaSalaryOptions
): RwandaSalaryResult {
  const {
    grossMonthly,
    pensionEmployeePercent = 6,
    medicalEmployeePercent = 7.5,
    payeOnTaxableAfterPension = true,
  } = options;

  if (grossMonthly < 0) throw new Error("Gross salary must be non-negative");

  const pensionEmployee = (grossMonthly * pensionEmployeePercent) / 100;
  const medicalEmployee = (grossMonthly * medicalEmployeePercent) / 100;
  const taxableForPaye = payeOnTaxableAfterPension
    ? grossMonthly - pensionEmployee
    : grossMonthly;

  const { total: paye, breakdown: payeBreakdown } =
    calculateMarginalPaye(taxableForPaye);

  const totalDeductions = paye + pensionEmployee + medicalEmployee;
  const netSalary = grossMonthly - totalDeductions;

  return {
    gross: round0(grossMonthly),
    pensionEmployee: round0(pensionEmployee),
    medicalEmployee: round0(medicalEmployee),
    taxableForPaye: round0(taxableForPaye),
    paye: round0(paye),
    netSalary: round0(netSalary),
    totalDeductions: round0(totalDeductions),
    payeBreakdown,
  };
}

function round0(n: number): number {
  return Math.round(n);
}
