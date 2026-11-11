export type BmiCategory =
  | "underweight"
  | "normal"
  | "overweight"
  | "obese";

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
}

export function calculateBmi(weightKg: number, heightCm: number): BmiResult {
  if (weightKg <= 0 || heightCm <= 0) {
    throw new Error("Weight and height must be positive");
  }
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const rounded = Math.round(bmi * 10) / 10;
  let category: BmiCategory;
  if (rounded < 18.5) category = "underweight";
  else if (rounded < 25) category = "normal";
  else if (rounded < 30) category = "overweight";
  else category = "obese";
  return { bmi: rounded, category };
}
