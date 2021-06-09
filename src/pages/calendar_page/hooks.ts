import { useEffect } from 'react';
import { ViewTypes } from './calendar.utils';

export const useArrowDateIncrement = ({
  increment_date,
  decrement_date,
  date,
  view,
}: {
  date: Date;
  view: ViewTypes;
  increment_date(): void;
  decrement_date(): void;
}): void => {
  useEffect(() => {
    const keyPress = e => {
      const { code, target } = e;

      // skip event if any text element is in focus
      if (['textarea', 'input'].includes(target.tagName.toLowerCase())) {
        return;
      }

      if (code === 'ArrowLeft') {
        decrement_date();
      }

      if (code === 'ArrowRight') {
        increment_date();
      }
    };

    document.addEventListener('keyup', keyPress);
    return () => document.removeEventListener('keyup', keyPress);
  }, [date, view]);
};
