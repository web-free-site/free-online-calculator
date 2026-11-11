export type UnitCategory = "length" | "weight" | "temperature";

export const LENGTH_UNITS = ["m", "km", "cm", "mm", "mi", "ft", "in"] as const;
export const WEIGHT_UNITS = ["kg", "g", "lb", "oz"] as const;
export const TEMP_UNITS = ["c", "f", "k"] as const;

const LENGTH_TO_M: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  ft: 0.3048,
  in: 0.0254,
};

const WEIGHT_TO_KG: Record<string, number> = {
  kg: 1,
  g: 0.001,
  lb: 0.45359237,
  oz: 0.028349523125,
};

export function convertLength(value: number, from: string, to: string): number {
  const meters = value * LENGTH_TO_M[from];
  return round6(meters / LENGTH_TO_M[to]);
}

export function convertWeight(value: number, from: string, to: string): number {
  const kg = value * WEIGHT_TO_KG[from];
  return round6(kg / WEIGHT_TO_KG[to]);
}

export function convertTemperature(
  value: number,
  from: string,
  to: string
): number {
  let c: number;
  if (from === "c") c = value;
  else if (from === "f") c = ((value - 32) * 5) / 9;
  else c = value - 273.15;

  let out: number;
  if (to === "c") out = c;
  else if (to === "f") out = (c * 9) / 5 + 32;
  else out = c + 273.15;
  return round2(out);
}

function round6(n: number): number {
  return Math.round(n * 1_000_000) / 1_000_000;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
