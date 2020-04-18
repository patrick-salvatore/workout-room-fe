import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthDataProvider } from '../providers';
import { useAuthDataContext } from '../providers/auth-provider';

import ROUTES from './constants';

/**
 * PAGES
 */
import LOGIN from 'pages/user-form';

// import { makeStyles, Theme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

const PrivateRoute: React.FC<any> = ({
  component,
  ...options
}): JSX.Element => {
  const { isAuthenticated } = useAuthDataContext();
  const finalComponent = isAuthenticated ? component : LOGIN;

  return <Route {...options} component={finalComponent} />;
};

export const AppView: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthDataProvider>
        <Switch>
          <PrivateRoute
            exact={true}
            path={ROUTES.INDEX}
            component={() => <h1>FEED</h1>}
            isAuthenticated={false}
          />
          {/* <Route exact={true} path={ROUTES.LOGIN} component={LOGIN} /> */}
          <Route component={() => <h1>OOPS</h1>} />
        </Switch>
      </AuthDataProvider>
    </BrowserRouter>
  );
};
