import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useLocalStorage } from 'hooks/useLocalStorage';
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { SubMenu } from './submenu';
import './nav.scss';

library.add(faChevronRight, faChevronLeft);

const chevronRLookup: IconLookup = { prefix: 'fas', iconName: 'chevron-right' };
const chevronRIconDefinition: IconDefinition = findIconDefinition(
  chevronRLookup
);

const chevronLLookup: IconLookup = { prefix: 'fas', iconName: 'chevron-left' };
const chevronLIconDefinition: IconDefinition = findIconDefinition(
  chevronLLookup
);

const Navbar: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useLocalStorage<boolean>('navKey', false);

  return (
    <nav className="nav__wrapper">
      <div
        data-testid="clickElm"
        className="icon__wrapper"
        onClick={(): void => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FontAwesomeIcon
            className="icon"
            icon={chevronLIconDefinition}
            size="2x"
          />
        ) : (
          <FontAwesomeIcon
            className="icon"
            icon={chevronRIconDefinition}
            size="2x"
          />
        )}
      </div>
      <div className="nav-contents__wrapper">
        <div className="nav__user-section"></div>
        <div className="nav__main-section"></div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
