import { Switch, Match } from 'solid-js';
import { isSameDay, isSameISOWeek } from 'date-fns';

import { construct_month, get_week, MonthNumbers, ViewTypes } from './calendar.utils';
import { MonthView } from './month_view';
import { DayView } from './day_view';
import { WeekView } from './week_view';
import { CalendarContextT } from './calendar_context';
import * as constants from './constants';

import { activitiesMetaData } from './mock.data';

type CalendarBodyProps = {
  date: Date;
  view: ViewTypes;
  goToDayView: (date: Date) => void;
  calendarState: CalendarContextT;
};

export const CalendarBody = (props: CalendarBodyProps) => {
  return (
    <Switch>
      <Match when={props.calendarState().calendar_view === constants.MONTH_CONST}>
        <MonthView
          activitiesMeta={activitiesMetaData}
          month={construct_month(props.date.getMonth() as MonthNumbers, props.date.getFullYear())}
          goToDayView={props.goToDayView}
        />
      </Match>
      <Match when={props.calendarState().calendar_view === constants.WEEK_CONST}>
        <WeekView
          week={get_week(props.date)}
          activitiesMeta={activitiesMetaData.filter(act => isSameISOWeek(act.date, props.date))}
          goToDayView={props.goToDayView}
        />
      </Match>
      <Match when={props.calendarState().calendar_view === constants.DAY_CONST}>
        <DayView
          date={props.date}
          activityMeta={activitiesMetaData.find(act => isSameDay(act.date, props.date)) || null}
        />
      </Match>
    </Switch>
  );
};
