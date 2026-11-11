export function percentOf(value: number, percent: number): number {
  return (value * percent) / 100;
}

export function whatPercentIs(part: number, whole: number): number {
  if (whole === 0) throw new Error("Whole cannot be zero");
  return (part / whole) * 100;
}

export function percentChange(from: number, to: number): number {
  if (from === 0) throw new Error("Original value cannot be zero");
  return ((to - from) / Math.abs(from)) * 100;
}

export function addPercent(value: number, percent: number): number {
  return value * (1 + percent / 100);
}

export function subtractPercent(value: number, percent: number): number {
  return value * (1 - percent / 100);
}

export function percentageIncreaseDecrease(
  value: number,
  percent: number,
  direction: "increase" | "decrease"
): number {
  return direction === "increase" ? addPercent(value, percent) : subtractPercent(value, percent);
}
