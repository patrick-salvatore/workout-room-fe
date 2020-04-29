import React, { Suspense } from 'react';
import {
  AppContainer,
  FullPageContainer,
  Container,
} from 'styledComponents/containers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthDataProvider } from '../providers';
import { useAuthDataContext } from '../providers/auth-provider';

import ROUTES from './constants';

/* COMPONENTS */
import NavBar from 'components/navbar';
import Loader from 'components/loader';

/*PAGES*/
const Login = React.lazy(() => import('pages/user-form'));
const Feed = React.lazy(() => import('pages/feed'));
const Calendar = React.lazy(() => import('pages/calendar'));
const Progress = React.lazy(() => import('pages/progress'));
const Rooms = React.lazy(() => import('pages/rooms'));

const PrivateRoute: React.FC<any> = ({
  component,
  ...options
}): JSX.Element => {
  const { isAuthenticated } = useAuthDataContext();
  const FinalComponent = isAuthenticated ? component : Login;

  return (
    <Route {...options}>
      <FinalComponent />
    </Route>
  );
};

const BigLoader = (): JSX.Element => (
  <FullPageContainer>
    <Container>
      <Loader width={200} height={200} label="loader" />
    </Container>
  </FullPageContainer>
);

const Router = () => (
  <Suspense fallback={<BigLoader />}>
    <Switch>
      <PrivateRoute exact={true} path={ROUTES.INDEX} component={Feed} />
      <PrivateRoute exact={true} path={ROUTES.CALENDAR} component={Calendar} />
      <PrivateRoute exact={true} path={ROUTES.PROGRESS} component={Progress} />
      <PrivateRoute exact={true} path={ROUTES.ROOMS} component={Rooms} />
      <Route component={() => <h1>OOPS</h1>} />
    </Switch>
  </Suspense>
);

export const AppView: React.FC = (): JSX.Element => {
  return (
    <AuthDataProvider>
      <AppContainer>
        <BrowserRouter>
          <NavBar />
          <Router />
        </BrowserRouter>
      </AppContainer>
    </AuthDataProvider>
  );
};
