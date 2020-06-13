import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import DateTimePicker from 'components/date-time-picker';
import WorkoutGrid from 'components/grid';
import Form from 'components/form';

import { EventFormProps } from 'components/modal/interfaces';

const useStyles = makeStyles(theme => ({
  save: {
    backgroundColor: green[500],
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  input: {
    width: '100%',
    margin: '7px 0',
    padding: '10px 20px',
  },
}));

const PrevEvent: React.FC<EventFormProps> = ({
  _saveNewEvent,
  errors,
  baseWorkoutDetails,
  handleGridChange,
  emptyColumnHeader,
  handleModalDateChange,
}): JSX.Element => {
  const classes = useStyles();

  const customSave = fields => {
    console.log(fields);

    // _saveNewEvent(fields, baseWorkoutDetails.grid)
  };

  return (
    <Form
      customHandleSubmit={customSave}
      formFields={{ ...baseWorkoutDetails } as any}
      render={({ fields, handleChange, handleSubmit }): JSX.Element => (
        <form className="form__container" onSubmit={handleSubmit}>
          <TextField
            error={errors.workoutEntriesErrors.title.error}
            className={classes.input}
            id="outlined"
            type="text"
            value={fields.name}
            placeholder="Workout Name"
            name="name"
            autoComplete="off"
            onChange={handleChange}
          />
          <WorkoutGrid
            canEdit={true}
            rows={baseWorkoutDetails.grid.rows}
            columns={baseWorkoutDetails.grid.cols}
            handleGridChange={handleGridChange}
            gridErrors={errors.gridErrors}
          />
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <DateTimePicker
                label="Start Date"
                dateFormat="MM/dd/yyyy"
                dateFormatCalendar="LLLL yyyy"
                dropdownMode="scroll"
                timeIntervals={30}
                withPortal={false}
                disabled={false}
                feedback={errors?.dateErrors.startDateChange.message}
                isInvalid={errors?.dateErrors.startDateChange.error}
                error={errors?.dateErrors.startDateChange.error}
                onChange={inputDate => {
                  handleModalDateChange && handleModalDateChange(inputDate, 'startDate');
                }}
              />
            </Grid>
            <Grid item>
              <DateTimePicker
                label="End Date"
                dateFormat="MM/dd/yyyy"
                dateFormatCalendar="LLLL yyyy"
                dropdownMode="scroll"
                timeIntervals={30}
                withPortal={false}
                disabled={false}
                feedback={errors?.dateErrors.endDateChange.message}
                isInvalid={errors?.dateErrors.endDateChange.error}
                error={errors?.dateErrors.endDateChange.error}
                onChange={inputDate => {
                  handleModalDateChange && handleModalDateChange(inputDate, 'endDate');
                }}
              />
            </Grid>
          </Grid>
          <div className="base-event-owner__buttons">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.save}
              onClick={_saveNewEvent}
            >
              Save
            </Button>
          </div>
        </form>
      )}
    />
  );
};

export default PrevEvent;
