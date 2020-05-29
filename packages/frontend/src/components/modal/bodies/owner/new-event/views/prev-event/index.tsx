import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from 'components/date-time-picker';
import { Event } from 'components/calendar/interfaces';
import WorkoutGrid from 'components/grid';

interface PrevEventProps {
  workoutDetails: Event;
  handleGridChange: (grid: any) => void
}

const PrevEvent: React.FC<PrevEventProps> = (props): JSX.Element => {
  const { workoutDetails, handleGridChange } = props;

  return (
    <div className="prev-event__container">
      <div className="prev-event__header"></div>
      <h2 className="prev-event__title">{workoutDetails.title}</h2>
      <div className="prev-event__notes">
        <p className="prev-event__notes-text">
          {workoutDetails.notes || 'empty notes'}
        </p>
      </div>
      <div className="prev-event__grid">
        <WorkoutGrid
          canEdit={true}
          rows={workoutDetails?.grid?.rows}
          columns={workoutDetails?.grid?.cols}
          handleGridChange={handleGridChange}
        />
      </div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <DateTimePicker
            dateFormat="MM/dd/yyyy"
            dateFormatCalendar="LLLL yyyy"
            dropdownMode="scroll"
            selected={workoutDetails.start as any}
            label="Start Date"
            disabled={false}
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
              disabled={false}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default PrevEvent;
