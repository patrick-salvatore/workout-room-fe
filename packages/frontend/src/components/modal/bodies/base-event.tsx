import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from 'components/date-time-picker';
import { Event } from 'components/calendar/interfaces';

import './base-event.scss';

interface BaseEventProps {
  workoutDetails: Event;
}

export default function index(props: BaseEventProps): JSX.Element {
  const { workoutDetails } = props;

  return (
    <div className="base-event__container">
      <div className="base-event__header"></div>
      <h2 className="base-event__title">{workoutDetails.title}</h2>
      <div className="base-event__notes">
        <p className="base-event__notes-text">
          {workoutDetails.notes || 'empty notes'}
        </p>
      </div>
      <div className="base-event__grid">
        <p className="base-event__grid-text">
          {workoutDetails.grid || 'empty grid'}
        </p>
      </div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <DateTimePicker
            dateFormat="MM/dd/yyyy"
            dateFormatCalendar="LLLL yyyy"
            dropdownMode="scroll"
            selected={workoutDetails.start as any}
            label="Start Date"
          />
        </Grid>
        {workoutDetails.end && (
          <Grid item>
            <DateTimePicker
              dateFormat="MM/dd/yyyy"
              dateFormatCalendar="LLLL yyyy"
              dropdownMode="scroll"
              selected={workoutDetails.end || workoutDetails.start}
              label="End Date"
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
