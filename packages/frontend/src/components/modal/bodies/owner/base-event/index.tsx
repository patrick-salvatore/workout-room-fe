import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import DateTimePicker from 'components/date-time-picker';
import WorkoutGrid from 'components/grid';

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

function BaseEventOwner({
  workoutDetails,
  setEditEvent,
  _updateEvent,
  // _deleteEvent,
  editEvent,
  handleModalDateChange,
  errors,
}): JSX.Element {
  const classes = useStyles();
  return (
    <>
      <div className="base-event-owner__container">
        <h2 className="base-event-owner__title">{workoutDetails.title}</h2>
        <div className="base-event-owner__notes">
          <p className="base-event-owner__notes-text">
            {workoutDetails.notes || 'empty notes'}
          </p>
        </div>
        <div className="base-event-owner__grid">
          <WorkoutGrid
            canEdit={editEvent}
            rows={workoutDetails.grid.rows}
            columns={workoutDetails.grid.cols}
          />
        </div>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <DateTimePicker
              dateFormat="MM/dd/yyyy"
              dateFormatCalendar="LLLL yyyy"
              dropdownMode="scroll"
              selected={workoutDetails.start}
              timeIntervals={30}
              withPortal={false}
              disabled={!editEvent}
              feedback={errors?.startDateChange.message}
              isInvalid={errors?.startDateChange.error}
              error={errors?.startDateChange.error}
              onChange={inputDate => {
                handleModalDateChange &&
                  handleModalDateChange(inputDate, 'startDate');
              }}
              label="Start Date"
            />
          </Grid>
          <Grid item>
            <DateTimePicker
              dateFormat="MM/dd/yyyy"
              dateFormatCalendar="LLLL yyyy"
              dropdownMode="scroll"
              selected={workoutDetails.end || workoutDetails.start}
              timeIntervals={30}
              withPortal={false}
              disabled={!editEvent}
              feedback={errors?.endDateChange.message}
              isInvalid={errors?.endDateChange.error}
              error={errors?.endDateChange.error}
              onChange={inputDate => {
                handleModalDateChange &&
                  handleModalDateChange(inputDate, 'endDate');
              }}
              label="End Date"
            />
          </Grid>
        </Grid>
      </div>
      <div className="base-event-owner__buttons">
        {editEvent ? (
          <Button
            variant="contained"
            className={classes.greenButton}
            onClick={_updateEvent}
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
              // onClick={_deleteEvent}
            >
              DELETE
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default BaseEventOwner;
