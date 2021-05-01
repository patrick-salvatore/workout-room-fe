import { pipe } from 'fp-ts/lib/function';
import { fold, tryCatch } from 'fp-ts/lib/Either';
import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): Array<any> {
  const [storedValue, setStoredvalue] = useState(() =>
    pipe(
      tryCatch(
        () => {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : initialValue;
        },
        e => e
      ),
      fold(
        e => e,
        item => item
      )
    )
  );

  const setValue = (value: string): void => {
    try {
      setStoredvalue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue];
}
