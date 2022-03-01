import { createSignal, createContext, useContext, Accessor, onMount } from 'solid-js';
import { useLocation, useNavigate } from 'solid-app-router';
import { add, sub } from 'date-fns';

import { query_map_to_string, query_params_map } from '@helpers/index';

import * as constants from './constants';
import { ViewTypes } from './calendar.utils';

type DayView = {
  is_editing_activity: boolean;
  is_creating_activity: boolean;
};

export type CalendarContextData = Accessor<typeof initial_calendar_state>;

type CalendarContextFunctions = {
  set_calendar_date: (date: Date) => void;
  set_calendar_day_view: (arg: keyof DayView) => (boolean: boolean) => void;
  cleanup_calendar_day_view: () => void;
  set_calendar_view: (v: ViewTypes) => void;
  decrement_date: () => void;
  increment_date: () => void;
};

type CalendarContextT = [CalendarContextData, CalendarContextFunctions];

const initial_day_view = {
  is_editing_activity: false,
  is_creating_activity: false,
};

const initial_calendar_state = {
  date: new Date(),
  day_view: initial_day_view,
  calendar_view: constants.MONTH_CONST as ViewTypes,
};

const set_next_month = (date: Date) => add(date, { months: 1 });

const set_prev_month = (date: Date) => sub(date, { months: 1 });

const set_next_day = (date: Date) => add(date, { days: 1 });

const set_prev_day = (date: Date) => sub(date, { days: 1 });

const set_next_week = (date: Date) => add(date, { days: 7 });

const set_prev_week = (date: Date) => sub(date, { days: 7 });

const CalendarContext = createContext<CalendarContextT>();

export const CalendarProvider = (props): any => {
  const params = query_params_map(useLocation().search).all();
  const navigate = useNavigate();

  const [calendar_data, set_calendar_data] = createSignal(initial_calendar_state);

  onMount(() => {
    if (!constants.view_types.includes(params.view as ViewTypes)) {
      navigate(query_map_to_string({ ...params, view: constants.MONTH_CONST }));
    }

    set_calendar_data(prev => ({
      ...prev,
      calendar_view: params.view as ViewTypes,
    }));
  });

  return (
    <CalendarContext.Provider
      value={[
        calendar_data,
        {
          set_calendar_view(v: ViewTypes) {
            set_calendar_data(prev => ({
              ...prev,
              calendar_view: v,
            }));
          },

          decrement_date: () => {
            set_calendar_data(prev => ({
              ...prev,
              date: (calendar_data().calendar_view === constants.MONTH_CONST
                ? set_prev_month
                : calendar_data().calendar_view === constants.WEEK_CONST
                ? set_prev_week
                : set_prev_day)(calendar_data().date),
            }));
          },

          increment_date: () => {
            set_calendar_data(prev => ({
              ...prev,
              date: (calendar_data().calendar_view === constants.MONTH_CONST
                ? set_next_month
                : calendar_data().calendar_view === constants.WEEK_CONST
                ? set_next_week
                : set_next_day)(calendar_data().date),
            }));
          },

          set_calendar_date: (date: Date) =>
            set_calendar_data(prev => ({
              ...prev,
              date,
            })),

          set_calendar_day_view: (day_view_state: keyof DayView) => (boolean: boolean) =>
            set_calendar_data(prev => ({
              ...prev,
              day_view: {
                ...prev.day_view,
                [day_view_state]: boolean,
              },
            })),

          cleanup_calendar_day_view: () =>
            set_calendar_data(prev => ({
              ...prev,
              day_view: initial_day_view,
            })),
        },
      ]}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext) as CalendarContextT;
