export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthdayDays: number;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Age from birth date to a reference date (client-side; no TZ surprises if dates are date-only). */
export function calculateAge(
  birthDate: Date,
  referenceDate: Date = new Date()
): AgeResult {
  const start = new Date(
    birthDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  const end = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );

  if (end < start) {
    throw new Error("Reference date must be on or after birth date");
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = end.getMonth() === 0 ? 11 : end.getMonth() - 1;
    const prevYear =
      end.getMonth() === 0 ? end.getFullYear() - 1 : end.getFullYear();
    days += daysInMonth(prevYear, prevMonth);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  let nextBday = new Date(end.getFullYear(), start.getMonth(), start.getDate());
  if (nextBday < end) {
    nextBday = new Date(
      end.getFullYear() + 1,
      start.getMonth(),
      start.getDate()
    );
  }
  const nextBirthdayDays = Math.floor(
    (nextBday.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays, nextBirthdayDays };
}
