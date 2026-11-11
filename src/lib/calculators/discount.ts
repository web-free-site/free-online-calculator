export interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
  savedPercent: number;
}

export function calculateDiscount(
  originalPrice: number,
  discountPercent: number
): DiscountResult {
  const discountAmount = (originalPrice * discountPercent) / 100;
  return {
    discountAmount: round2(discountAmount),
    finalPrice: round2(originalPrice - discountAmount),
    savedPercent: discountPercent,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
