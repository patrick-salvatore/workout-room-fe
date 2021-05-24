import React from 'react';
import { add, sub } from 'date-fns';
import { useLocation, useNavigate } from '@reach/router';

import { query_params_map, query_map_to_string } from '@helpers/index';

import { CalendarHeader } from './calendar_header';
import { CalendarBody } from './calendar_body';
import { useCalendarContext } from './calendar_context';
import { DAY_CONST, MONTH_CONST, ViewTypes, WEEK_CONST } from './calendar.utils';
import { useArrowDateIncrement } from './hooks';

const set_next_month = (date: Date, dispatch: (date: Date) => void) =>
  dispatch(add(date, { months: 1 }));

const set_prev_month = (date: Date, dispatch: (date: Date) => void) =>
  dispatch(sub(date, { months: 1 }));

const set_next_day = (date: Date, dispatch: (date: Date) => void) =>
  dispatch(add(date, { days: 1 }));

const set_prev_day = (date: Date, dispatch: (date: Date) => void) =>
  dispatch(sub(date, { days: 1 }));

const set_next_week = (date: Date, dispatch: (date: Date) => void) =>
  dispatch(add(date, { days: 7 }));

const set_prev_week = (date: Date, dispatch: (date: Date) => void) =>
  dispatch(sub(date, { days: 7 }));

export const Calendar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { view, ...other_params } = query_params_map(useLocation().search);
  const { set_calendar_date, date } = useCalendarContext();

  const set_today = () => set_calendar_date(new Date());

  const decrement_date = () =>
    (view === MONTH_CONST ? set_prev_month : view === WEEK_CONST ? set_prev_week : set_prev_day)(
      date,
      set_calendar_date
    );

  const increment_date = () =>
    (view === MONTH_CONST ? set_next_month : view === WEEK_CONST ? set_next_week : set_next_day)(
      date,
      set_calendar_date
    );

  const toggle_view = (view: ViewTypes) => {
    navigate(`?${query_map_to_string({ view, ...other_params })}`);
    set_calendar_date(date);
  };

  const go_to_day_view = (date: Date) => {
    navigate(`?${query_map_to_string({ view: DAY_CONST, ...other_params })}`);
    set_calendar_date(date);
  };

  useArrowDateIncrement({ date, view: view as ViewTypes, increment_date, decrement_date });

  return (
    <div id="calendar--view" className="calendar--view" tabIndex={0}>
      <CalendarHeader
        previous={decrement_date}
        next={increment_date}
        setToday={set_today}
        toggleView={toggle_view}
      />
      <CalendarBody date={date} view={view as ViewTypes} goToDayView={go_to_day_view} />
    </div>
  );
};
