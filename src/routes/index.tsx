import { Component, lazy } from 'solid-js';

import { Router, Routes, Route } from 'solid-app-router';
import * as ROUTES from './constants';

/* COMPONENTS */
import { AppContainer } from '@/AppContainer';

const Calendar = lazy(() => import('@pages/calendar'));

export const AppView: Component = () => {
  return (
    <AppContainer>
      <div class="screen--container">
        <Router>
          <Routes>
            <Route path={ROUTES.INDEX} element={<Calendar />} />
          </Routes>
        </Router>
      </div>
    </AppContainer>
  );
};
