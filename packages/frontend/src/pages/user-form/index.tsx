import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FullPageColor } from 'styledComponents/containers';
import SignInFields from './from-types/signin-form';
import ForgotPasswordFields from './from-types/forgot-password-form';
import RegisterFields from './from-types/register-form';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const fieldViews = {
  0: { component: SignInFields, props: {}, title: 'Sign In' },
  1: {
    component: ForgotPasswordFields,
    props: {},
    title: 'Forgot Your Password :(',
  },
  2: {
    component: RegisterFields,
    props: {},
    title: 'Sign Up',
  },
};

const index = function(): JSX.Element {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState(fieldViews[0]);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleFieldView = (e: React.MouseEvent): void => {
    const target = e.target as HTMLAnchorElement;
    const key = target.getAttribute('data-key');

    if (key) {
      setView(fieldViews[key]);
    }
  };

  return (
    <FullPageColor>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            {view.title}
          </Typography>
        </div>
        {React.createElement(view.component, {
          ...view.props,
          handleFieldView,
          handleClickShowPassword,
          showPassword,
        } as any)}
      </Container>
    </FullPageColor>
  );
};

export default index;
