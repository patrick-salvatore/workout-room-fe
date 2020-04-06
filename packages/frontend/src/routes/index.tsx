import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ROUTES from './constants';

/**
 * PAGES
 */
import LOGIN from 'pages/user-form';

// import { makeStyles, Theme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

export const AppView: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={ROUTES.LANDING} component={LOGIN} />
        <Route component={() => <h1>OOPS</h1>} />
      </Switch>
    </BrowserRouter>
  );
};
