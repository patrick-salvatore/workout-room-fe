export function updateIdxOfArray<T>(
  idx: number,
  arr: Array<T>,
  newValue: T
): Array<T> {
  arr[idx] = newValue;

  return arr;
}
