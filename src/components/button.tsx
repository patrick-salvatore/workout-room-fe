import { ComponentProps } from 'solid-js';

type ButtonProps = {
  variant?: 'outlined' | 'block';
  height?: string | number;
  class?: 'string';
} & ComponentProps<any>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      class={`shared-button-component ${props.class || ''} ${props.variant || 'block'}-button`}
      style={{ height: props.height }}
    >
      {props.children}
    </button>
  );
};
