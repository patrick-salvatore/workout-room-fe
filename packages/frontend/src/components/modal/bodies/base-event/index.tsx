import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from 'components/date-time-picker';
import { Event } from 'pages/calendar/interfaces';
import WorkoutGrid from 'components/grid';

import './base-event.scss';

interface BaseEventProps {
  baseWorkoutDetails: Event;
}

const baseEvent: React.FC<BaseEventProps> = ({ baseWorkoutDetails }): JSX.Element => {
  return (
    <div className="base-event__container">
      <div className="base-event__header"></div>
      <h2 className="base-event__title">{baseWorkoutDetails.title}</h2>
      <div className="base-event__notes">
        <p className="base-event__notes-text">{baseWorkoutDetails.notes || 'empty notes'}</p>
      </div>
      <div className="base-event__grid">
        <WorkoutGrid
          canEdit={false}
          rows={baseWorkoutDetails.grid.rows}
          columns={baseWorkoutDetails.grid.cols}
        />
      </div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <DateTimePicker
            dateFormat="MM/dd/yyyy"
            dateFormatCalendar="LLLL yyyy"
            dropdownMode="scroll"
            selected={baseWorkoutDetails.start as any}
            label="Start Date"
          />
        </Grid>
        {baseWorkoutDetails.end && (
          <Grid item>
            <DateTimePicker
              dateFormat="MM/dd/yyyy"
              dateFormatCalendar="LLLL yyyy"
              dropdownMode="scroll"
              selected={baseWorkoutDetails.end || baseWorkoutDetails.start}
              label="End Date"
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default baseEvent;
