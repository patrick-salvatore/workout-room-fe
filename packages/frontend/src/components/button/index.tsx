import React from 'react';

interface IButtonProps {
  className?: string;
  id?: string;
  children: React.ReactChild;
  onClick: (e: React.MouseEvent) => void;
  style?: { [type: string]: string };
}

const index: React.FC<IButtonProps> = (props): JSX.Element => {
  return <button {...props}>{props.children}</button>;
};

export default index;
