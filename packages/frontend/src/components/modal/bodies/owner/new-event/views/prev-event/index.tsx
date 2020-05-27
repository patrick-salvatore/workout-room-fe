import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from 'components/date-time-picker';
import { Event } from 'components/calendar/interfaces';

interface PrevEventProps {
  prevEventDetails: Event;
}

const PrevEvent: React.FC<PrevEventProps> = (props): JSX.Element => {
  const { prevEventDetails } = props;

  return (
    <div className="prev-event__container">
      <div className="prev-event__header"></div>
      <h2 className="prev-event__title">{prevEventDetails.title}</h2>
      <div className="prev-event__notes">
        <p className="prev-event__notes-text">
          {prevEventDetails.notes || 'empty notes'}
        </p>
      </div>
      <div className="prev-event__grid">
        <p className="prev-event__grid-text">
          {prevEventDetails.grid || 'empty grid'}
        </p>
      </div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <DateTimePicker
            dateFormat="MM/dd/yyyy"
            dateFormatCalendar="LLLL yyyy"
            dropdownMode="scroll"
            selected={prevEventDetails.start as any}
            label="Start Date"
            disabled={false}
          />
        </Grid>
        {prevEventDetails.end && (
          <Grid item>
            <DateTimePicker
              dateFormat="MM/dd/yyyy"
              dateFormatCalendar="LLLL yyyy"
              dropdownMode="scroll"
              selected={prevEventDetails.end || prevEventDetails.start}
              label="End Date"
              disabled={false}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default PrevEvent;
