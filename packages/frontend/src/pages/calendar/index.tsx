import React, { useReducer } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './calendar.scss';

type Action =
  | { type: 'events'; payload: EventInput }
  | { type: 'weekends'; payload: boolean };

interface CalendarState {
  weekends: boolean;
  events: EventInput[];
}

const calendarState: CalendarState = {
  weekends: true,
  events: [{ title: 'Event Now', start: new Date() }],
};

function calendarReducer(
  calendarState: CalendarState,
  action: Action
): CalendarState {
  switch (action.type) {
    case 'events': {
      return {
        events: [action.payload, ...calendarState.events],
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
  const calendarComponentRef = React.createRef<FullCalendar>();
  const [state, dispatch] = useReducer(calendarReducer, calendarState);

  console.log(state);

  const handleDateClick = (arg: any): void => {
    const newEvent = {
      title: `New Event ${state.events.length + 1}`,
      start: new Date(arg.date),
      allDay: arg.allDay,
    };

    dispatch({ type: 'events', payload: newEvent });
  };

  return (
    <div className="calendar">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        ref={calendarComponentRef}
        weekends={state?.weekends}
        events={state?.events}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default index;
