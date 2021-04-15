import React, { Suspense } from 'react';
import { Router as ReachRouter } from '@reach/router';

// import { AuthDataProvider } from '@providers/auth_provider';
// import { useAuthDataContext } from '@providers/auth_provider';
import { GlobalUiProvider } from '@providers/global/global_ui';

import ROUTES from './constants';

/* COMPONENTS */
import { AppContainer } from 'src/AppContainer';

/*PAGES*/
import { CalendarScreen } from '@pages/calendar';

export const AppView: React.FC = (): JSX.Element => {
  return (
    <GlobalUiProvider>
      <AppContainer>
        <ReachRouter className="screen--container">
          <CalendarScreen path={ROUTES.CALENDAR} />
        </ReachRouter>
      </AppContainer>
    </GlobalUiProvider>
  );
};
