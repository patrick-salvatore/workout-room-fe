import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { FormFields } from 'components/form/interfaces';
import { green } from '@material-ui/core/colors';

import Form from 'components/form';
import WorkoutGrid from 'components/grid';

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
    padding: '10px 20px',
  },
}));

const newEventFields: FormFields = {
  name: '',
  notes: '',
};

const NewEventForm = ({
  _saveNewEvent,
  errors,
  workoutDetails,
  handleGridChange,
  emptyColumnHeader,
}) => {
  const classes = useStyles();

  return (
    <Form
      customHandleSubmit={fields => _saveNewEvent(fields)}
      formFields={newEventFields}
      render={({ fields, handleChange, handleSubmit }): JSX.Element => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            id="outlined"
            type="text"
            value={fields.username}
            placeholder="Workout Name"
            name="name"
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField
            className={classes.input}
            type="text"
            value={fields.notes}
            placeholder="Notes"
            name="notes"
            autoComplete="off"
            onChange={handleChange}
          />
          <WorkoutGrid
            canEdit={true}
            rows={workoutDetails?.grid?.rows}
            columns={workoutDetails?.grid?.cols}
            handleGridChange={handleGridChange}
            gridColumnError={errors.gridColumnError}
            emptyColumnHeader={emptyColumnHeader}
          />
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
        </form>
      )}
    />
  );
};

export default NewEventForm;
