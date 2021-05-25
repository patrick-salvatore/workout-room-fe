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

/**
 * capitalize first letter of a string
 */
export const capitalize = (s: string): string =>
  s
    .split('')
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join('');

export const query_params_map = (fullParams: string): Record<string, string> =>
  Object.freeze(
    fullParams
      .trim()
      .replace(/^[?#&]/, '')
      .split('&')
      .reduce((acc, prev) => {
        const [key, value] = prev.split('=');

        if (value) {
          acc[key] = value;
        }

        return acc;
      }, Object.create(null))
  );

export const query_map_to_string = (map: Record<string, string>): string =>
  Object.entries(map)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

export const omit = <T extends Record<string, any>>(
  key: string | number,
  obj: T
): Omit<T, typeof key> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: __, ...pruned_obj } = obj;

  return pruned_obj;
};

export const len = (collection: Array<any> | Record<string, any>): number => {
  if (Array.isArray(collection)) {
    return collection.length;
  }

  return Object.keys(collection).length;
};