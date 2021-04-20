/**
 * Implementation of _.chunk
 */
export const chunk = <T>(array: T[], size = 1): T[][] => {
  const { length } = array;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }

  return result;
};

export const capitalize = (s: string): string =>
  s
    .split('')
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join('');

export const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
