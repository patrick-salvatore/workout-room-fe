import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { FormFields } from 'components/form/interfaces';
import Form from 'components/form';
import WorkoutGrid from 'components/grid';
import DateTimePicker from 'components/date-time-picker';
import ErrorMessage from 'components/error-message';

import { EventFormProps } from 'components/modal/interfaces';

import './event-form.scss';

interface NewEventFormProps {
  gridRows: any[];
  gridColumns: any[];
}

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  save: {
    backgroundColor: green[500],
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    width: '100%',
    margin: '7px 0',
    padding: '10px 0px',
    resize: 'none',
  },
}));

const NewEventForm: React.FC<EventFormProps> = ({
  _saveNewEvent,
  errors,
  handleGridChange,
  emptyColumnHeader,
  baseWorkoutDetails,
  handleModalDateChange,
}): JSX.Element => {
  const classes = useStyles();

  const newEventFields = {
    title: '',
    ...baseWorkoutDetails,
  };

  return (
    <Form
      customHandleSubmit={fields =>
        _saveNewEvent(fields, {
          grid: baseWorkoutDetails.grid,
          start: baseWorkoutDetails.start,
          end: baseWorkoutDetails.end,
        })
      }
      formFields={newEventFields as any}
      render={({ fields, handleChange, handleSubmit }): JSX.Element => (
        <form className="form__container" onSubmit={handleSubmit}>
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
          <WorkoutGrid
            canEdit={true}
            rows={baseWorkoutDetails.grid.rows}
            columns={baseWorkoutDetails.grid.cols}
            handleGridChange={handleGridChange}
            gridErrors={errors?.gridErrors}
            // emptyColumnHeader={emptyColumnHeader}
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
                disabled={true}
                selected={baseWorkoutDetails.start}
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
                selected={baseWorkoutDetails.end}
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
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </form>
      )}
    />
  );
};

export default NewEventForm;
