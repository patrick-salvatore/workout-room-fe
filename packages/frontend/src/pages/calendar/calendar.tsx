import React, { useReducer, useEffect } from 'react';
import { render } from 'react-dom';
import { isToday } from 'date-fns';

import { makeReducer } from '@store/storeUtils';

import { CalendarState, Action, Event } from './interfaces';
import { eventMap } from './mock.data';
import { construct_month } from './calendar.utils';

import './calendar.scss';

const calendarState: CalendarState = {
  weekends: true,
  events: [],
  view: { toggleButtonText: 'Week', isWeek: false, type: 'dayGridMonth' },
  edit: false,
  modalState: {
    show: false,
    name: '',
    workout: {
      id: null,
      idx: null,
      notes: null,
      grid: { rows: [], cols: [] },
      start: null,
      end: null,
    },
  },
};

const closeModalAction = (payload: CalendarState['modalState']) =>
  ({
    type: 'CLOSE_MODAL',
    payload,
  } as const);

const toggleWeekView = (state: CalendarState) =>
  ({
    type: 'TO_WEEK_VIEW',
    payload: {
      toggleButtonText: 'Month',
      isWeek: !state.view.isWeek,
      type: 'dayGridWeek',
    },
  } as const);

const toggleMonthView = (state: CalendarState) =>
  ({
    type: 'TO_MONTH_VIEW',
    payload: {
      toggleButtonText: 'Week',
      isWeek: !state.view.isWeek,
      type: 'dayGridMonth',
    },
  } as const);

type CalendarActions = ReturnType<
  typeof closeModalAction | typeof toggleWeekView | typeof toggleMonthView
>;

const calendarReducer = makeReducer<CalendarState, CalendarActions>(
  {
    TO_WEEK_VIEW: (state, { payload }) => ({
      ...state,
      view: payload,
    }),
    TO_MONTH_VIEW: (state, { payload }) => ({
      ...state,
      view: payload,
    }),
    CLOSE_MODAL: (state, { payload }) => ({
      ...state,
      modalState: payload,
    }),
  },
  calendarState
);

type CalendarStruct = Array<Date[]>;
const CalendarBody = () => {
  const [calendar, setCalendar] = React.useState<CalendarStruct>(construct_month());
  return (
    <table>
      {calendar.map((week, i) => (
        <tr key={i}>
          {week.map(day => (
            <td>{day.getDate()}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export const Calendar: React.FC = (): JSX.Element => {
  return (
    <div className="calendar">
      <CalendarBody />
    </div>
  );
};
