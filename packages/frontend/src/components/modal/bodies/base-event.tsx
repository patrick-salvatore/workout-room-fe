import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from 'components/date-time-picker';

import './base-event.scss';

export default function index({ eventDetails }): JSX.Element {
  return (
    <div className="base-event__container">
      <div className="base-event__header"></div>
      <h2 className="base-event__title">{eventDetails.title}</h2>
      <div className="base-event__description">
        <p className="base-event__description-text">
          {eventDetails.description || 'empty description'}
        </p>
      </div>
      <div className="base-event__grid">
        <p className="base-event__grid-text">
          {eventDetails.grid || 'empty grid'}
        </p>
      </div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <DateTimePicker
            dateFormat="MM/dd/yyyy"
            dateFormatCalendar="LLLL yyyy"
            dropdownMode="scroll"
            selected={eventDetails.start}
            label="Start Date"
          />
        </Grid>
        {eventDetails.end && (
          <Grid item>
            <DateTimePicker
              dateFormat="MM/dd/yyyy"
              dateFormatCalendar="LLLL yyyy"
              dropdownMode="scroll"
              selected={eventDetails.end || eventDetails.start}
              label="End Date"
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
