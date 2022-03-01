import { onCleanup, onMount } from 'solid-js';

type TUseArrowDateIncrement = {
  increment_date(): void;
  decrement_date(): void;
};

export const useArrowDateIncrement = ({
  increment_date,
  decrement_date,
}: TUseArrowDateIncrement): void => {
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

  onMount(() => {
    document.addEventListener('keyup', keyPress);
  });
  onCleanup(() => {
    document.removeEventListener('keyup', keyPress);
  });
};
