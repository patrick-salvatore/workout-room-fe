import { isToday, format, add, sub, isThisMonth, isSameMonth } from 'date-fns';
import { chunk } from '@helpers/index';

export type DaysOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export type SpecialDate = {
  date: Date;
  isToday: boolean;
  thisMonth: boolean;
  dateString: string;
  sameMonth: (d: Date) => boolean;
};
export type DateList = Date[];
export type Week = SpecialDate[];
export type Month = SpecialDate[][];
export type MonthNumbers = typeof months_by_number[number];
export type MonthAbbrev = typeof months[number];
export type ViewTypes = typeof MONTH_CONST | typeof WEEK_CONST | typeof DAY_CONST;
export type CalendarState = {
  date: Date;
};
export type CalendarData = {
  get_this_month_name: (month_index: MonthNumbers) => MonthAbbrev;
  get_calendar_state: (date: Date) => CalendarState;
};

const COLS = 7;
const ROWS = 6;
const TOTAL_CELLS = COLS * ROWS;
export const MONTH_CONST = 'MONTH' as const;
export const WEEK_CONST = 'WEEK' as const;
export const DAY_CONST = 'DAY' as const;
export const number_of_weeks = 4;
export const months_by_number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

export const days_of_week = [
  { number: 0, day: 'sun' },
  { number: 1, day: 'mon' },
  { number: 2, day: 'tue' },
  { number: 3, day: 'wed' },
  { number: 4, day: 'thu' },
  { number: 5, day: 'fri' },
  { number: 6, day: 'sat' },
] as const;
export const months = [
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

export const get_month = (month = new Date().getMonth(), year = new Date().getFullYear()): Date[] =>
  new Array(31)
    .fill(null)
    .map((_, i) => new Date(year, month, i + 1))
    .filter(v => v.getMonth() === month);

export const get_last_month = (
  month = new Date().getMonth(),
  year = new Date().getFullYear()
): Date[] => new Array(31).fill(null).map((_, i) => new Date(year, month - 1, i + 1));

export const get_next_month = (
  month = new Date().getMonth(),
  year = new Date().getFullYear()
): Date[] => new Array(31).fill(null).map((_, i) => new Date(year, month + 1, i + 1));

const check_if_monday = (date: Date) => date.getDay() === 1;
const days_to_last_monday = (d: Date) =>
  d.getDay() === 0
    ? 6
    : d.getDay() === 1
    ? 0
    : d.getDay() === 2
    ? 1
    : d.getDay() === 3
    ? 2
    : d.getDay() === 4
    ? 3
    : d.getDay() === 5
    ? 4
    : d.getDay() === 6
    ? 5
    : 0;

export const construct_month = (month: MonthNumbers, year: number): Month => {
  const calArray: Date[] = [];
  const this_month = get_month(month, year);
  const next_month = get_next_month(month, year);
  const start = new Date(this_month[0]);
  const mut_clone = new Date(start.getTime());

  let isMonday = check_if_monday(start);

  while (!isMonday) {
    mut_clone.setDate(mut_clone.getDate() - 1);
    isMonday = check_if_monday(mut_clone);
  }

  while (mut_clone < start) {
    calArray.push(new Date(mut_clone.getTime()));
    mut_clone.setDate(mut_clone.getDate() + 1);
  }

  let step = 0;
  while (calArray.length < TOTAL_CELLS) {
    if (!this_month[step]) {
      calArray.push(next_month.shift() as Date);
      continue;
    }
    calArray.push(this_month[step++]);
  }

  const updateArray: Week = calArray.map(date => ({
    date,
    dateString: format(date, 'yyyy/dd/MM'),
    isToday: isToday(date),
    thisMonth: start.getMonth() === date.getMonth(),
    sameMonth: (comp_date: Date) => isSameMonth(comp_date, date),
  }));

  return chunk(updateArray, 7);
};

export const get_calendar_state = (given_date: Date): CalendarState => ({
  date: new Date(given_date.getTime()),
});

export const get_week = (incoming_date: Date): Week => {
  const clone = new Date(sub(incoming_date, { days: days_to_last_monday(incoming_date) }));
  const dates = new Array(7).fill('').map((__, inc) => add(clone, { days: inc }));
  const week = dates.map(date => ({
    date,
    dateString: format(date, 'yyyy/dd/MM'),
    isToday: isToday(date),
    thisMonth: isThisMonth(date),
    sameMonth: (comp_date: Date) => isSameMonth(comp_date, date),
  }));
  return week;
};

export const get_this_month_name = (month_index: MonthNumbers): MonthAbbrev => months[month_index];

export const get_calendar_fact = (): CalendarData => {
  const get_calendar_state = (given_date: Date): CalendarState => ({
    date: add(given_date, { days: 0 }),
  });

  const get_this_month_name = (month_index: MonthNumbers) => months[month_index];

  return { get_this_month_name, get_calendar_state };
};

export const get_name_from_date = (day: Date): DaysOfWeek => days_of_week[day.getDay()].day;
