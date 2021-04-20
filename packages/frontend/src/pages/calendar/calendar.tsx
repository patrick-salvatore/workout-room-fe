import React from 'react';
import { add, sub } from 'date-fns';

import { CalendarHeader } from './calendar_header';
import { CalendarBody } from './calendar_body';

import {
  CalendarState,
  DAY_CONST,
  get_calendar_fact,
  MONTH_CONST,
  ViewTypes,
  WEEK_CONST,
} from './calendar.utils';

const calendarFactory = get_calendar_fact();

const set_next_month = (
  date: Date,
  dispatch: React.Dispatch<React.SetStateAction<CalendarState>>
) => dispatch({ date: add(date, { months: 1 }), view: MONTH_CONST });

const set_prev_month = (
  date: Date,
  dispatch: React.Dispatch<React.SetStateAction<CalendarState>>
) => dispatch({ date: sub(date, { months: 1 }), view: MONTH_CONST });

const set_next_day = (date: Date, dispatch: React.Dispatch<React.SetStateAction<CalendarState>>) =>
  dispatch({ date: add(date, { days: 1 }), view: DAY_CONST });

const set_prev_day = (date: Date, dispatch: React.Dispatch<React.SetStateAction<CalendarState>>) =>
  dispatch({ date: sub(date, { days: 1 }), view: DAY_CONST });

const set_next_week = (date: Date, dispatch: React.Dispatch<React.SetStateAction<CalendarState>>) =>
  dispatch({ date: add(date, { days: 7 }), view: WEEK_CONST });

const set_prev_week = (date: Date, dispatch: React.Dispatch<React.SetStateAction<CalendarState>>) =>
  dispatch({ date: sub(date, { days: 7 }), view: WEEK_CONST });

export const Calendar: React.FC = (): JSX.Element => {
  const [{ date, view }, setCalendar] = React.useState(
    calendarFactory.get_calendar_state(new Date(), MONTH_CONST)
  );

  const set_this_month = () => setCalendar(calendarFactory.get_calendar_state(new Date(), view));

  const decrement_date = () =>
    (view === MONTH_CONST ? set_prev_month : view === WEEK_CONST ? set_prev_week : set_prev_day)(
      date,
      setCalendar
    );

  const increment_date = () =>
    (view === MONTH_CONST ? set_next_month : view === WEEK_CONST ? set_next_week : set_next_day)(
      date,
      setCalendar
    );

  const toggle_view = (view: ViewTypes, nextDate = date) => setCalendar({ date: nextDate, view });

  return (
    <div className="calendar--view">
      <CalendarHeader
        prevMonth={decrement_date}
        nextMonth={increment_date}
        resetMonth={set_this_month}
        toggleView={toggle_view}
        date={date}
        view={view}
      />
      <CalendarBody
        date={date}
        view={view}
        goToDayView={(date: Date) => setCalendar({ date, view: DAY_CONST })}
      />
    </div>
  );
};
