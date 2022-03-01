import { query_params_map, query_map_to_string } from '@helpers/index';

import { CalendarHeader } from './calendar_header';
import { CalendarBody } from './calendar_body';
import { useCalendarContext } from './calendar_context';
import { ViewTypes } from './calendar.utils';
import { useArrowDateIncrement } from './hooks';
import { Component } from 'solid-js';
import { useLocation, useNavigate } from 'solid-app-router';
import * as constants from './constants';

export const Calendar: Component = () => {
  const navigate = useNavigate();
  const other_params = query_params_map(useLocation().search).all();
  const [
    calendarState,
    { set_calendar_date, set_calendar_view, decrement_date, increment_date },
  ] = useCalendarContext();
  const view = calendarState().calendar_view;

  const set_today = () => set_calendar_date(new Date());

  const toggle_view = (_view: ViewTypes) => {
    navigate(query_map_to_string({ ...other_params, view: _view }));
    set_calendar_date(calendarState().date);
    set_calendar_view(_view);
  };

  const go_to_day_view = (date: Date) => {
    navigate(query_map_to_string({ ...other_params, view: constants.DAY_CONST }));
    set_calendar_date(date);
    set_calendar_view(constants.DAY_CONST);
  };

  useArrowDateIncrement({
    increment_date,
    decrement_date,
  });

  return (
    <div id="calendar--view" class="calendar--view" tabIndex={0}>
      <CalendarHeader
        previous={decrement_date}
        next={increment_date}
        setToday={set_today}
        toggleView={toggle_view}
      />
      <CalendarBody
        calendarState={calendarState}
        date={calendarState().date}
        view={view as ViewTypes}
        goToDayView={go_to_day_view}
      />
    </div>
  );
};
