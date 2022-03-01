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
    .toLowerCase()
    .split('')
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join('');

export const query_params_map = (
  fullParams: string
): {
  get: (key: string) => string;
  exclude: (key: string) => Record<string, string>;
  all: () => Record<string, string>;
} => {
  const clean_params: Record<string, string> = fullParams
    .trim()
    .replace(/^[?#&]/, '')
    .split('&')
    .reduce((acc, prev) => {
      const [key, value] = prev.split('=');

      if (value) {
        acc[key] = value;
      }

      return acc;
    }, {});

  return {
    get: key => clean_params[key] || '',
    exclude: key => omit<string>(key, clean_params),
    all: () => clean_params,
  };
};

export const query_map_to_string = (map: Record<string, string>): string =>
  `?${Object.entries(map)
    .map(([key, val]) => `${key}=${val}`)
    .join('&')}`;

export const omit = <T>(key: string | number, obj: Record<string, T>): Record<string, T> => {
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
