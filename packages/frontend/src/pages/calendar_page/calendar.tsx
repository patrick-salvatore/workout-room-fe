import React from 'react';
import { add, sub } from 'date-fns';
import { useLocation, useNavigate } from '@reach/router';

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
import { query_params_map, query_map_to_string } from '@helpers/index';

const calendarFactory = get_calendar_fact();

const set_next_month = (
  date: Date,
  dispatch: React.Dispatch<React.SetStateAction<CalendarState>>
) => dispatch({ date: add(date, { months: 1 }) });

const set_prev_month = (
  date: Date,
  dispatch: React.Dispatch<React.SetStateAction<CalendarState>>
) => dispatch({ date: sub(date, { months: 1 }) });

const set_next_day = (date: Date, dispatch: React.Dispatch<React.SetStateAction<CalendarState>>) =>
  dispatch({ date: add(date, { days: 1 }) });

const set_prev_day = (date: Date, dispatch: React.Dispatch<React.SetStateAction<CalendarState>>) =>
  dispatch({ date: sub(date, { days: 1 }) });

const set_next_week = (date: Date, dispatch: React.Dispatch<React.SetStateAction<CalendarState>>) =>
  dispatch({ date: add(date, { days: 7 }) });

const set_prev_week = (date: Date, dispatch: React.Dispatch<React.SetStateAction<CalendarState>>) =>
  dispatch({ date: sub(date, { days: 7 }) });

export const Calendar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { view, ...other_params } = query_params_map(useLocation().search);
  const [{ date }, setCalendar] = React.useState(calendarFactory.get_calendar_state(new Date()));

  const set_today = () => setCalendar(calendarFactory.get_calendar_state(new Date()));

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

  const toggle_view = (view: ViewTypes) => {
    navigate(`?${query_map_to_string({ view, ...other_params })}`);
    setCalendar({ date });
  };

  const go_to_day_view = (date: Date) => {
    navigate(`?${query_map_to_string({ view: DAY_CONST, ...other_params })}`);
    setCalendar({ date });
  };

  React.useEffect(() => {
    if (!view) {
      navigate(`?${query_map_to_string({ view: MONTH_CONST, ...other_params })}`);
    }
  }, []);

  // React.useEffect(() => {
  //   const keyPress = e => {
  //     const { code } = e;

  //     if (code === 'ArrowLeft') {
  //       decrement_date();
  //     }

  //     if (code === 'ArrowRight') {
  //       increment_date();
  //     }
  //   };

  //   document.addEventListener('keyup', keyPress);
  //   return () => document.removeEventListener('keyup', keyPress);
  // }, [date, view]);

  return (
    <div id="calendar--view" className="calendar--view" tabIndex={0}>
      <CalendarHeader
        previous={decrement_date}
        next={increment_date}
        setToday={set_today}
        toggleView={toggle_view}
        date={date}
        view={view as ViewTypes}
      />
      <CalendarBody date={date} view={view as ViewTypes} goToDayView={go_to_day_view} />
    </div>
  );
};
