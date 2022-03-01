const COLS = 7;
const ROWS = 6;
export const TOTAL_CELLS = COLS * ROWS;
export const MONTH_CONST = 'MONTH' as const;
export const WEEK_CONST = 'WEEK' as const;
export const DAY_CONST = 'DAY' as const;
export const view_types = [MONTH_CONST, WEEK_CONST, DAY_CONST];
export const number_of_weeks = 4;
export const months_by_number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

export const DAYS_OF_WEEK = [
  { number: 0, day: 'sun' },
  { number: 1, day: 'mon' },
  { number: 2, day: 'tue' },
  { number: 3, day: 'wed' },
  { number: 4, day: 'thu' },
  { number: 5, day: 'fri' },
  { number: 6, day: 'sat' },
] as const;
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
export const hours = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
] as const;
