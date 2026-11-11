import { describe, it, expect } from "vitest";
import { calculateAge } from "../age";
import {
  percentOf,
  whatPercentIs,
  percentChange,
  addPercent,
  subtractPercent,
} from "../percentage";
import { calculateEmi } from "../loan";
import { daysBetween, dateDifferenceBreakdown } from "../date-diff";
import { addVat, removeVat } from "../vat";
import {
  calculateMarginalPaye,
  calculateRwandaNetSalary,
} from "../rwanda-salary";
import { calculateBmi } from "../bmi";
import { calculateDiscount } from "../discount";
import { calculateTip } from "../tip";
import { convertLength, convertWeight, convertTemperature } from "../units";

describe("age", () => {
  it("computes age on known birthday", () => {
    const birth = new Date(1990, 5, 15); // June 15 1990
    const ref = new Date(2024, 5, 15);
    const r = calculateAge(birth, ref);
    expect(r.years).toBe(34);
    expect(r.months).toBe(0);
    expect(r.days).toBe(0);
    expect(r.totalDays).toBe(34 * 365 + 9); // includes leap days
  });
});

describe("percentage", () => {
  it("25% of 200", () => expect(percentOf(200, 25)).toBe(50));
  it("50 is what % of 200", () => expect(whatPercentIs(50, 200)).toBe(25));
  it("100 to 125 change", () => expect(percentChange(100, 125)).toBe(25));
  it("add 10%", () => expect(addPercent(100, 10)).toBeCloseTo(110));
  it("subtract 10%", () => expect(subtractPercent(100, 10)).toBe(90));
});

describe("loan EMI", () => {
  it("matches standard EMI for 1M @ 12% for 12 months", () => {
    const r = calculateEmi(1_000_000, 12, 12);
    expect(r.emi).toBeCloseTo(88_848.79, 1);
    expect(r.totalInterest).toBeCloseTo(66_185.48, 0);
  });
});

describe("date difference", () => {
  it("days between Jan 1 and Jan 31 2024", () => {
    expect(daysBetween(new Date(2024, 0, 1), new Date(2024, 0, 31))).toBe(30);
  });
  it("breakdown one year", () => {
    const b = dateDifferenceBreakdown(
      new Date(2020, 0, 1),
      new Date(2021, 0, 1)
    );
    expect(b.years).toBe(1);
    expect(b.totalDays).toBe(366); // 2020 leap
  });
});

describe("VAT", () => {
  it("18% VAT on 1000", () => {
    const r = addVat(1000, 18);
    expect(r.vatAmount).toBe(180);
    expect(r.grossAmount).toBe(1180);
  });
  it("remove 18% from gross", () => {
    const r = removeVat(1180, 18);
    expect(r.netAmount).toBe(1000);
    expect(r.vatAmount).toBe(180);
  });
});

describe("Rwanda PAYE", () => {
  it("Rukundo 40k → 0 PAYE", () => {
    expect(calculateMarginalPaye(40_000).total).toBe(0);
  });
  it("Lucie 300k → 54,000 PAYE per RRA example", () => {
    expect(calculateMarginalPaye(300_000).total).toBe(54_000);
  });
});

describe("Rwanda net salary", () => {
  it("produces sensible net for 500k gross", () => {
    const r = calculateRwandaNetSalary({ grossMonthly: 500_000 });
    expect(r.paye).toBeGreaterThan(0);
    expect(r.netSalary).toBeLessThan(500_000);
    expect(r.netSalary).toBe(500_000 - r.totalDeductions);
  });
});

describe("BMI", () => {
  it("70kg 175cm", () => {
    const r = calculateBmi(70, 175);
    expect(r.bmi).toBe(22.9);
    expect(r.category).toBe("normal");
  });
});

describe("discount", () => {
  it("20% off 250", () => {
    const r = calculateDiscount(250, 20);
    expect(r.finalPrice).toBe(200);
    expect(r.discountAmount).toBe(50);
  });
});

describe("tip", () => {
  it("15% on 100 split 2", () => {
    const r = calculateTip(100, 15, 2);
    expect(r.tipAmount).toBe(15);
    expect(r.totalWithTip).toBe(115);
    expect(r.perPerson).toBe(57.5);
  });
});

describe("units", () => {
  it("1 mile in meters", () => {
    expect(convertLength(1, "mi", "m")).toBeCloseTo(1609.344, 3);
  });
  it("1 lb in kg", () => {
    expect(convertWeight(1, "lb", "kg")).toBeCloseTo(0.453592, 5);
  });
  it("32F = 0C", () => {
    expect(convertTemperature(32, "f", "c")).toBe(0);
  });
});
