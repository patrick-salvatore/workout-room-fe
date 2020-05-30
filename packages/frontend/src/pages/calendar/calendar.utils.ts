interface ErrorMessage {
  [key: string]: string;
}

export function updateIdxOfArray<T>(
  idx: number,
  arr: Array<T>,
  newValue: T
): Array<T> {
  arr[idx] = newValue;

  return arr;
}

export function compareDates(dateA: Date, dateB: Date): boolean {
  const [monthA, dayA, yearA] = [
    dateA.getMonth(),
    dateA.getDate(),
    dateA.getFullYear(),
  ];
  const [monthB, dayB, yearB] = [
    dateB.getMonth(),
    dateB.getDate(),
    dateB.getFullYear(),
  ];

  for (let i = 0; i < [monthA, dayA, yearA].length; i++) {
    if ([monthB, dayB, yearB][i] !== [monthA, dayA, yearA][i]) {
      return false;
    }
  }

  return true;
}

export function updateEvent<T>(event, allEvents): Array<T> {
  allEvents[event.idx] = event;

  return allEvents;
}
