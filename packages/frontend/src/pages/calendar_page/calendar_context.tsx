import { query_map_to_string, query_params_map } from '@helpers/index';
import { useLocation, useNavigate } from '@reach/router';

import React from 'react';
import { MONTH_CONST, view_types } from './calendar.utils';

type DayView = {
  is_editing_activity: boolean;
  is_creating_activity: boolean;
};

type CalendarContextT = {
  date: Date;
  day_view: DayView;
  set_calendar_date: (date: Date) => void;
  set_calendar_day_view: (arg: keyof DayView) => (boolean: boolean) => void;
};

const initialCalendarState = {
  date: new Date(),
  day_view: {
    is_editing_activity: false,
    is_creating_activity: false,
  },
  set_calendar_date: () => undefined,
  set_calendar_day_view: () => () => undefined,
};

export const CalendarContext = React.createContext<CalendarContextT>(initialCalendarState);

export const CalendarProvider: React.FC = (props): any => {
  const navigate = useNavigate();
  const { view, ...other_params } = query_params_map(useLocation().search);
  const { Provider } = CalendarContext;
  const [calendar_data, set_calendar_data] = React.useState<CalendarContextT>(initialCalendarState);

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

  // initial update of the view query param - maybe this isn't the way
  React.useEffect(() => {
    const new_view = view_types.includes(view as any) ? view : MONTH_CONST;

    navigate(
      `?${query_map_to_string({
        view: new_view,
        ...other_params,
      })}`
    );
  }, []);

  const memoObject = {
    ...calendar_data,
    set_calendar_date,
    set_calendar_day_view,
  };

  return React.createElement(Provider, { value: memoObject, ...props });
};

export const useCalendarContext = (): CalendarContextT => React.useContext(CalendarContext);
