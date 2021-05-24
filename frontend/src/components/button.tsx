import React from 'react';

type ButtonProps = {
  variant?: 'outlined' | 'block';
} & React.ButtonHTMLAttributes<any>;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = 'block',
  ...rest
}): JSX.Element => {
  return (
    <button className={`shared-button-component ${className} ${variant}-button`} {...rest}>
      {children}
    </button>
  );
};
