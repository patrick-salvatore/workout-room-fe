import { chunk } from '@helpers/index';

const COLS = 7;
const ROWS = 6;
const TOTAL_CELLS = COLS * ROWS;
export const number_of_weeks = 4;
export const days = [0, 1, 2, 3, 4, 5, 6];
export const months_by_number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const get_month = (month = new Date().getMonth(), year = new Date().getFullYear()) =>
  new Array(31)
    .fill(null)
    .map((_, i) => new Date(year, month, i + 1))
    .filter(v => v.getMonth() === month);

export const get_last_month = (month = new Date().getMonth(), year = new Date().getFullYear()) =>
  new Array(31).fill(null).map((_, i) => new Date(year, month - 1, i + 1));

export const get_next_month = (month = new Date().getMonth(), year = new Date().getFullYear()) =>
  new Array(31).fill(null).map((_, i) => new Date(year, month + 1, i + 1));

export const get_next_date = (today = new Date()) => {
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

export const get_prev_date = (today = new Date()) => {
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

export const construct_month = (month = new Date().getMonth(), year = new Date().getFullYear()) => {
  const calArray: Date[] = [];
  const this_month = get_month(month, year);
  const next_month = get_next_month(month, year);
  const start = new Date(this_month[0]);
  const mut_clone = new Date(start.getTime());

  let isSunday = start.getDay() === 0;

  while (!isSunday) {
    mut_clone.setDate(mut_clone.getDate() - 1);
    isSunday = mut_clone.getDay() === 0;
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

  return chunk(calArray, 7);
};
