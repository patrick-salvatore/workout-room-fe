import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from 'components/button';

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
  quickSortBtn: () => void;
  mergeSortBtn: () => void;
  bubbleSortBtn: () => void;
  heapSortBtn: () => void;
  resetApp: () => void;
}

const index: React.FC<IToolBarProps> = ({
  quickSortBtn,
  mergeSortBtn,
  bubbleSortBtn,
  heapSortBtn,
  resetApp,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.root}>
        <div>
          <Button
            onClick={quickSortBtn}
            className="js-toolbar-button"
            style={{
              color: 'inherit',
              backgroundColor: 'inherit',
              border: 'none',
              fontSize: '16px',
              fontFamliy: 'Roboto',
              margin: '6px 8px',
            }}
          >
            Quick Sort
          </Button>
          <Button
            onClick={mergeSortBtn}
            className="js-toolbar-button"
            style={{
              color: 'inherit',
              backgroundColor: 'inherit',
              border: 'none',
              fontSize: '16px',
              fontFamliy: 'Roboto',
              margin: '6px 8px',
            }}
          >
            Merge Sort
          </Button>
          <Button
            onClick={bubbleSortBtn}
            className="js-toolbar-button"
            style={{
              color: 'inherit',
              backgroundColor: 'inherit',
              border: 'none',
              fontSize: '16px',
              fontFamliy: 'Roboto',
              margin: '6px 8px',
            }}
          >
            Bubble Sort
          </Button>
          <Button
            onClick={heapSortBtn}
            className="js-toolbar-button"
            style={{
              color: 'inherit',
              backgroundColor: 'inherit',
              border: 'none',
              fontSize: '16px',
              fontFamliy: 'Roboto',
              margin: '6px 8px',
            }}
          >
            Heap Sort
          </Button>
        </div>
        <Button
          style={{
            color: 'inherit',
            backgroundColor: 'inherit',
            border: 'none',
            fontSize: '16px',
            fontFamliy: 'Roboto',
            margin: '6px 8px',
          }}
          onClick={resetApp}
          id="js-toolbar-reset-button"
        >
          RESET ARRAY
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default index;
