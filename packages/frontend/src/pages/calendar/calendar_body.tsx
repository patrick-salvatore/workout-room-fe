import React from 'react';

import {
  construct_month,
  get_week,
  MonthNumbers,
  MONTH_CONST,
  ViewTypes,
  WEEK_CONST,
  DAY_CONST,
} from './calendar.utils';
import { MonthView } from './month_view';
import { DayView } from './day_view';
import { WeekView } from './week_view';

type CalendarBodyProps = {
  date: Date;
  view: ViewTypes;
  goToDayView: (date: Date) => void;
};

export const CalendarBody: React.FC<CalendarBodyProps> = ({
  date,
  view,
  goToDayView,
}): JSX.Element => {
  switch (view) {
    case MONTH_CONST:
      return (
        <MonthView
          month={construct_month(date.getMonth() as MonthNumbers, date.getFullYear())}
          goToDayView={goToDayView}
        />
      );
    case WEEK_CONST:
      return <WeekView week={get_week(date)} goToDayView={goToDayView} />;
    case DAY_CONST:
      return <DayView day={date} />;
    default:
      return (
        <MonthView
          month={construct_month(date.getMonth() as MonthNumbers, date.getFullYear())}
          goToDayView={goToDayView}
        />
      );
  }
};
