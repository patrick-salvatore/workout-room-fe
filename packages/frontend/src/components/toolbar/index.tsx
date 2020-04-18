import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Button from 'components/button';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: '#34495e',
      position: 'fixed',
      bottom: '0',
      width: '100%',
      height: '50px',
      minHeight: 'auto',
      justifyContent: 'space-around',
    },
    slider_container: {
      display: 'flex',
      alignItems: 'center',
      width: '250px',
      margin: '0 10px',
    },
    divider: {
      width: '3px',
      backgroundColor: 'red',
    },
    slider: {},
    label: { fontSize: '12px', width: 'auto' },
    button: { display: 'flex', alignContent: 'center', height: '100%' },
  })
);

interface IToolBarProps {
  children?: React.ReactChild;
}

const index: React.FC<IToolBarProps> = (): JSX.Element => {
  const classes = useStyles();

  return <AppBar position="static" className={classes.root}></AppBar>;
};

export default index;
