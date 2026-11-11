export interface TipResult {
  tipAmount: number;
  totalWithTip: number;
  perPerson: number;
}

export function calculateTip(
  billAmount: number,
  tipPercent: number,
  splitBetween: number = 1
): TipResult {
  if (splitBetween < 1) throw new Error("Split must be at least 1");
  const tipAmount = (billAmount * tipPercent) / 100;
  const totalWithTip = billAmount + tipAmount;
  return {
    tipAmount: round2(tipAmount),
    totalWithTip: round2(totalWithTip),
    perPerson: round2(totalWithTip / splitBetween),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
