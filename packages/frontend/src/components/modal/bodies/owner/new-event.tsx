import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  greenButton: {
    backgroundColor: green[500],
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  redButton: {
    backgroundColor: red[500],
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}));

export default function index({ _saveNewEvent }): JSX.Element {
  const classes = useStyles();
  return (
    <>
      <div className="new-event__header"></div>
      <h1 className="new-event__title">NEW EVENT</h1>
      <div className="new-event__start-date"></div>
      <div className="new-event__end-date"></div>
      <div className="new-event__button">
        <Button
          variant="contained"
          className={classes.greenButton}
          onClick={_saveNewEvent}
        >
          SAVE
        </Button>
      </div>
    </>
  );
}
