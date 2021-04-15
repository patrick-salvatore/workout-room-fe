import React from 'react';
import { NavBarContainer } from '@components/navigation';
import { navigationOpenState } from '@providers/global/global_ui';

export const AppContainer: React.FC = ({ children }) => (
  <>
    <NavBarContainer />
    <div
      className={`app--container compressable-container ${
        navigationOpenState() ? 'compressed' : ''
      }`}
    >
      {children}
    </div>
  </>
);
