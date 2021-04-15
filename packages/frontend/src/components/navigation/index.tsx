import React from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

// import FilingCabinetLogo from '@assets/filing_cabinet_3.svg';
import { useGlobalUiContext } from '@providers/global/global_ui';

import './nav.scss';

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
        <ChevronLeft onClick={toggleSideNav} className="icon" />
      ) : (
        <ChevronRight onClick={toggleSideNav} className="icon" />
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

const GlobalNav = () => (
  <div className="navigation__global">
    <div className="logo__wrapper" />
  </div>
);

export const NavBarContainer = () => (
  <nav className="navigation">
    <GlobalNav />
    <SideNav />
  </nav>
);
