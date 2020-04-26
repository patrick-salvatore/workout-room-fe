import React, { useReducer, useEffect, useState } from 'react';
import { CalendarState, Action } from './interfaces';
import monthMap from './month-map';
import StaticCalendar from './static-calendar';
import EditCalendar from './edit-calendar';

import './calendar.scss';

const eventMap = {
  april: [
    { title: 'April 1', start: new Date(), id: 1 },
    { title: 'April 2', start: new Date('2020-04-22'), id: 2 },
  ],
  may: [
    { title: 'May 1', start: new Date('2020-05-26'), id: 1 },
    { title: 'May 2', start: new Date('2020-05-03'), id: 2 },
  ],
};

const calendarState: CalendarState = {
  weekends: true,
  events: [],
};

function calendarReducer(
  calendarState: CalendarState,
  action: Action
): CalendarState {
  switch (action.type) {
    case 'events': {
      return {
        events: [...action.payload, ...calendarState.events],
        weekends: calendarState.weekends,
      };
    }
    case 'weekends': {
      return { weekends: action.payload, events: calendarState.events };
    }
    default:
      return calendarState;
  }
}

const index: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(calendarReducer, calendarState);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const currMonth = monthMap[new Date().getMonth()];
    const events = eventMap[currMonth.toLowerCase()];

    dispatch({ type: 'events', payload: events });
  }, []);

  return (
    <div className="calendar">
      {edit ? (
        <EditCalendar state={state} setEdit={setEdit} dispatch={dispatch} />
      ) : (
        <StaticCalendar state={state} setEdit={setEdit} dispatch={dispatch} />
      )}
    </div>
  );
};

export default index;
