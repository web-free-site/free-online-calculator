export const RWANDA_VAT_DEFAULT = 18;

export interface VatAddResult {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
}

export function addVat(netAmount: number, ratePercent: number): VatAddResult {
  const vatAmount = (netAmount * ratePercent) / 100;
  return {
    netAmount: round2(netAmount),
    vatAmount: round2(vatAmount),
    grossAmount: round2(netAmount + vatAmount),
  };
}

export function removeVat(grossAmount: number, ratePercent: number): VatAddResult {
  const netAmount = grossAmount / (1 + ratePercent / 100);
  const vatAmount = grossAmount - netAmount;
  return {
    netAmount: round2(netAmount),
    vatAmount: round2(vatAmount),
    grossAmount: round2(grossAmount),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
