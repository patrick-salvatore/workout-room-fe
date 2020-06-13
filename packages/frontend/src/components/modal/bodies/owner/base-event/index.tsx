import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

import DateTimePicker from 'components/date-time-picker';
import WorkoutGrid from 'components/grid';
import Form from 'components/form';
import ErrorMessage from 'components/error-message';

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
  input: {
    width: '100%',
    margin: '7px 0',
    padding: '10px 0px',
    resize: 'none',
  },
}));

function BaseEventOwner({
  _deleteEvent,
  _updateEvent,
  errors,
  editEvent,
  setEditEvent,
  handleGridChange,
  baseWorkoutDetails,
  handleModalDateChange,
}): JSX.Element {
  const classes = useStyles();
  return (
    <Form
      customHandleSubmit={fields => _updateEvent(fields)}
      formFields={...baseWorkoutDetails}
      render={({ fields, handleChange, handleSubmit }): JSX.Element => (
        <form className="form__container">
          <ErrorMessage errors={errors?.workoutEntriesErrors} />
          <TextField
            className={classes.input}
            type="text"
            value={fields.title}
            placeholder="Workout Name"
            name="title"
            autoComplete="off"
            onChange={handleChange}
          />
          <TextareaAutosize
            rowsMax={4}
            className={classes.input}
            value={fields.notes}
            placeholder="Workout Notes"
            name="notes"
            autoComplete="off"
            onChange={handleChange}
          />
          <WorkoutGrid
            canEdit={editEvent}
            rows={baseWorkoutDetails.grid.rows}
            columns={baseWorkoutDetails.grid.cols}
            handleGridChange={handleGridChange}
            gridErrors={errors.gridErrors}
          />
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <DateTimePicker
                dateFormat="MM/dd/yyyy"
                dateFormatCalendar="LLLL yyyy"
                dropdownMode="scroll"
                selected={baseWorkoutDetails.start}
                timeIntervals={30}
                withPortal={false}
                disabled={!editEvent}
                feedback={errors?.dateErrors.startDateChange.message}
                isInvalid={errors?.dateErrors.startDateChange.error}
                error={errors?.dateErrors.startDateChange.error}
                onChange={inputDate => {
                  handleModalDateChange && handleModalDateChange(inputDate, 'startDate');
                }}
                label="Start Date"
              />
            </Grid>
            <Grid item>
              <DateTimePicker
                dateFormat="MM/dd/yyyy"
                dateFormatCalendar="LLLL yyyy"
                dropdownMode="scroll"
                selected={baseWorkoutDetails.end || baseWorkoutDetails.start}
                timeIntervals={30}
                withPortal={false}
                disabled={!editEvent}
                feedback={errors?.dateErrors.endDateChange.message}
                isInvalid={errors?.dateErrors.endDateChange.error}
                error={errors?.dateErrors.endDateChange.error}
                onChange={inputDate => {
                  handleModalDateChange && handleModalDateChange(inputDate, 'endDate');
                }}
                label="End Date"
              />
            </Grid>
          </Grid>
          <div className="base-event-owner__buttons">
            {editEvent ? (
              <Button variant="contained" className={classes.greenButton} onClick={handleSubmit}>
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
                  onClick={_deleteEvent}
                >
                  DELETE
                </Button>
              </>
            )}
          </div>
        </form>
      )}
    />
  );
}

export default BaseEventOwner;
