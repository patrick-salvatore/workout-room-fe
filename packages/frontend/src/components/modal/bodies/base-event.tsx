import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from 'components/date-time-picker';
import { Event } from 'components/calendar/interfaces';

import './base-event.scss';

interface BaseEventProps {
  eventDetails: Event;
}

export default function index(props: BaseEventProps): JSX.Element {
  const { eventDetails } = props;

  return (
    <div className="base-event__container">
      <div className="base-event__header"></div>
      <h2 className="base-event__title">{eventDetails.title}</h2>
      <div className="base-event__sumary">
        <p className="base-event__sumary-text">
          {eventDetails.sumary || 'empty sumary'}
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
