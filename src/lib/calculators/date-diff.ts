/** Days between two calendar dates (inclusive of convention: end - start in whole days). */
export function daysBetween(start: Date, end: Date): number {
  const s = stripTime(start);
  const e = stripTime(end);
  return Math.round((e.getTime() - s.getTime()) / (86400000));
}

export interface DateDiffBreakdown {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  weeks: number;
  remainingDays: number;
}

export function dateDifferenceBreakdown(
  start: Date,
  end: Date
): DateDiffBreakdown {
  let a = stripTime(start);
  let b = stripTime(end);
  if (b < a) [a, b] = [b, a];

  let years = b.getFullYear() - a.getFullYear();
  let months = b.getMonth() - a.getMonth();
  let days = b.getDate() - a.getDate();

  if (days < 0) {
    months -= 1;
    days += daysInMonth(b.getFullYear(), b.getMonth() - 1);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = daysBetween(a, b);
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  return { years, months, days, totalDays, weeks, remainingDays };
}

function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysInMonth(year: number, month: number): number {
  const m = month < 0 ? 11 : month;
  const y = month < 0 ? year - 1 : year;
  return new Date(y, m + 1, 0).getDate();
}
