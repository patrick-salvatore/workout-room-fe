import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): Array<any> {
  const [storedValue, setStoredvalue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

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
