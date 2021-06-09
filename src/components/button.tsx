import React, { CSSProperties } from 'react';

type ButtonProps = {
  variant?: 'outlined' | 'block';
  height?: CSSProperties['height'];
} & React.ButtonHTMLAttributes<any>;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = 'block',
  height,
  ...rest
}): JSX.Element => {
  return (
    <button
      className={`shared-button-component ${className} ${variant}-button`}
      {...rest}
      style={{ height }}
    >
      {children}
    </button>
  );
};
