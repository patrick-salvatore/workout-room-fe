import React from 'react';

import { useGlobalUiContext } from '@providers/global/global_ui';
import ChevronRight from '@svgs/ChevronRight';
import ChevronLeft from '@svgs/ChevronLeft';

const SideNavToggle = ({
  toggleSideNav,
  isOpen,
}: {
  isOpen: boolean;
  toggleSideNav: VoidFunction;
}): JSX.Element => (
  <div data-testid="clickElm" className="icon__wrapper">
    <div className="sidebar-btn__wrapper">
      {isOpen ? (
        <svg
          onClick={toggleSideNav}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          className="icon"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      ) : (
        <svg
          onClick={toggleSideNav}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          className="icon"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      )}
    </div>
  </div>
);

const SideNav = (): JSX.Element => {
  const { toggleGobalNavigation } = useGlobalUiContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSideNav = (): void => {
    setIsOpen(!isOpen);
    toggleGobalNavigation!();
  };

  return (
    <div className={`navigation__context navigation__context-${isOpen ? 'opened' : 'closed'}`}>
      <SideNavToggle toggleSideNav={toggleSideNav} isOpen={isOpen} />
    </div>
  );
};

export const NavBarContainer: React.FC = (): JSX.Element => (
  <nav className="navigation">
    <div className="navigation__global">
      <div className="logo__wrapper" />
    </div>
    <SideNav />
  </nav>
);
