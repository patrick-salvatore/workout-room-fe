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
    <div className="prevEvent__container">
      <div className="prevEvent__header"></div>
      <h2 className="prevEvent__title">{prevEventDetails.title}</h2>
      <div className="prevEvent__sumary">
        <p className="prevEvent__sumary-text">
          {prevEventDetails.sumary || 'empty sumary'}
        </p>
      </div>
      <div className="prevEvent__grid">
        <p className="prevEvent__grid-text">
          {prevEventDetails.grid || 'empty grid'}
        </p>
      </div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <DateTimePicker
            dateFormat="MM/dd/yyyy"
            dateFormatCalendar="LLLL yyyy"
            dropdownMode="scroll"
            selected={prevEventDetails.start}
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
