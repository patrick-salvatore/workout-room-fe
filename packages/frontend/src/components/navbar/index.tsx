import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SideNav from './sidenav';

const useStyles = makeStyles(() => ({
  topBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#424242',
    zIndex: 99,
    padding: '0',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '45px',
    height: '100vh',
  },
}));

const TopNavBar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar className={classes.topBar}>
          <div>
            <IconButton color="inherit">
              <Badge color="secondary">
                <Add />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <SideNav />
    </>
  );
};

export default TopNavBar;
