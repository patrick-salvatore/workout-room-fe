import React from 'react';

interface ISubMenu {
  children: React.ReactNode | boolean;
  className: string;
  activeClassName: string;
  isOpenSubMenu: boolean;
}

export const SubMenu: React.FC<ISubMenu> = ({
  children,
  className,
  activeClassName,
  isOpenSubMenu,
}): JSX.Element => {
  return (
    <div className={isOpenSubMenu ? `${className} ${activeClassName}` : className}>{children}</div>
  );
};
