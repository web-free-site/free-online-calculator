export interface EmiResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

/** Monthly EMI: principal P, annual rate %, tenure in months. */
export function calculateEmi(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
): EmiResult {
  if (principal <= 0 || tenureMonths <= 0) {
    throw new Error("Principal and tenure must be positive");
  }
  const monthlyRate = annualRatePercent / 100 / 12;
  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }
  const totalPayment = emi * tenureMonths;
  return {
    emi: roundMoney(emi),
    totalPayment: roundMoney(totalPayment),
    totalInterest: roundMoney(totalPayment - principal),
  };
}

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}
