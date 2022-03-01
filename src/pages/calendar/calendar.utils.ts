import { isToday, format, add, sub, isThisMonth, isSameMonth } from 'date-fns';
import { chunk } from '@helpers/index';
import {
  months_by_number,
  MONTHS,
  MONTH_CONST,
  WEEK_CONST,
  DAY_CONST,
  DAYS_OF_WEEK,
  TOTAL_CELLS,
} from './constants';

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
export type MonthAbbrev = typeof MONTHS[number];
export type ViewTypes = typeof MONTH_CONST | typeof WEEK_CONST | typeof DAY_CONST;
export type CalendarState = {
  date: Date;
};
export type CalendarData = {
  get_this_month_name: (month_index: MonthNumbers) => MonthAbbrev;
  get_calendar_state: (date: Date) => CalendarState;
};

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

  return new Array(7)
    .fill('')
    .map((__, inc) => add(clone, { days: inc }))
    .map(date => ({
      date,
      dateString: format(date, 'yyyy/dd/MM'),
      isToday: isToday(date),
      thisMonth: isThisMonth(date),
      sameMonth: (comp_date: Date) => isSameMonth(comp_date, date),
    }));
};

export const get_this_month_name = (month_index: MonthNumbers): MonthAbbrev => MONTHS[month_index];

export const get_calendar_fact = (): CalendarData => {
  const get_calendar_state = (given_date: Date): CalendarState => ({
    date: add(given_date, { days: 0 }),
  });

  const get_this_month_name = (month_index: MonthNumbers) => MONTHS[month_index];

  return { get_this_month_name, get_calendar_state };
};

export const get_name_from_date = (day: Date): DaysOfWeek => DAYS_OF_WEEK[day.getDay()].day;
