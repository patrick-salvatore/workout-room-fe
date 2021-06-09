import React from 'react';
import { navigate, useLocation } from '@reach/router';
import { MONTH_CONST, ViewTypes, view_types } from './calendar.utils';
import { query_map_to_string, query_params_map } from '@helpers/index';

type DayView = {
  is_editing_activity: boolean;
  is_creating_activity: boolean;
};

type CalendarContextT = {
  date: Date;
  day_view: DayView;
  set_calendar_date: (date: Date) => void;
  set_calendar_day_view: (arg: keyof DayView) => (boolean: boolean) => void;
  cleanup_calendar_day_view: () => void;
};

const initial_day_view = {
  is_editing_activity: false,
  is_creating_activity: false,
};

const initial_calendar_state = {
  date: new Date(),
  day_view: initial_day_view,
  set_calendar_date: () => undefined,
  set_calendar_day_view: () => () => undefined,
  cleanup_calendar_day_view: () => undefined,
};

export const CalendarContext = React.createContext<CalendarContextT>(initial_calendar_state);

export const CalendarProvider: React.FC = (props): any => {
  const { Provider } = CalendarContext;
  const { view, ...other_params } = query_params_map(useLocation().search).all();

  const [calendar_data, set_calendar_data] = React.useState<CalendarContextT>(
    initial_calendar_state
  );

  React.useEffect(() => {
    if (!view_types.includes(view as ViewTypes)) {
      navigate(query_map_to_string({ view: MONTH_CONST, ...other_params }));
    }
  }, [view]);

  const set_calendar_date = (date: Date) =>
    set_calendar_data(prev => ({
      ...prev,
      date,
    }));

  const set_calendar_day_view = (day_view_state: keyof DayView) => (boolean: boolean) =>
    set_calendar_data(prev => ({
      ...prev,
      day_view: {
        ...prev.day_view,
        [day_view_state]: boolean,
      },
    }));

  const cleanup_calendar_day_view = () =>
    set_calendar_data(prev => ({
      ...prev,
      day_view: initial_day_view,
    }));

  const memoObject = {
    ...calendar_data,
    set_calendar_date,
    set_calendar_day_view,
    cleanup_calendar_day_view,
  };

  return React.createElement(Provider, { value: memoObject, ...props });
};

export const useCalendarContext = (): CalendarContextT => React.useContext(CalendarContext);
