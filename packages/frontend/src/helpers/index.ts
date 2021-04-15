export function chunk<T>(array: T[], size = 1) {
  size = Math.max(size, 0);
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
}
