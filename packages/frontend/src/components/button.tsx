import React from 'react';

type ButtonProps = {
  variant?: 'outlined';
} & React.ButtonHTMLAttributes<any>;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant,
  ...rest
}): JSX.Element => {
  return (
    <button className={`shared-button-component ${className} ${variant}-button`} {...rest}>
      {children}
    </button>
  );
};
