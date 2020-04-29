import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import DateTimePicker from 'components/date-time-picker';

import './base-event-owner.scss';

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

export default function index({
  event,
  setEditEvent,
  _saveEvent,
  editEvent,
}): JSX.Element {
  const classes = useStyles();
  return (
    <>
      <h2 className="base-event-owner__title">{event.title}</h2>
      <div className="base-event-owner__description">
        <p className="base-event-owner__description-text">
          {event.description || 'empty description'}
        </p>
      </div>
      <div className="base-event-owner__grid">
        <p className="base-event-owner__grid-text">
          {event.grid || 'empty grid'}
        </p>
      </div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <DateTimePicker
            dateFormat="MM/dd/yyyy"
            dateFormatCalendar="LLLL yyyy"
            dropdownMode="scroll"
            selected={event.startDate}
            timeIntervals={30}
            withPortal={false}
            disabled={!editEvent}
            feedback={'hello'}
            // isInvalid={true}
            onChange={inputDate => {
              console.log(inputDate);
            }}
            label="Start Date"
          />
        </Grid>
        <Grid item>
          <DateTimePicker
            dateFormat="MM/dd/yyyy"
            dateFormatCalendar="LLLL yyyy"
            dropdownMode="scroll"
            selected={event.endDate || event.startDate}
            timeIntervals={30}
            withPortal={false}
            disabled={!editEvent}
            feedback={'hello'}
            // isInvalid={true}
            onChange={inputDate => {
              console.log(inputDate);
            }}
            label="End Date"
          />
        </Grid>
      </Grid>
      <div className="base-event-owner__buttons">
        {editEvent ? (
          <Button
            variant="contained"
            className={classes.greenButton}
            onClick={_saveEvent}
          >
            SAVE
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(): void => setEditEvent(true)}
            >
              EDIT
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              // onClick={(): void => saveEvent(true)}
            >
              DELETE
            </Button>
          </>
        )}
      </div>
    </>
  );
}
