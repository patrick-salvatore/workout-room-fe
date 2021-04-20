import React from 'react';
import { isThisMonth, sub } from 'date-fns';

import ChevronLeft from '@svgs/ChevronLeft';
import ChevronRight from '@svgs/ChevronRight';

import {
  DAY_CONST,
  MonthNumbers,
  months,
  MONTH_CONST,
  ViewTypes,
  WEEK_CONST,
} from './calendar.utils';

type CalendarHeaderProps = {
  date: Date;
  view: ViewTypes;
  prevMonth: () => void;
  nextMonth: () => void;
  resetMonth: () => void;
  toggleView: (view: ViewTypes, d?: Date) => void;
};

const getDateForWeekToggle = (date: Date) =>
  isThisMonth(date) ? date : sub(date, { days: date.getDate() - 1 });

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  prevMonth,
  nextMonth,
  date,
  resetMonth,
  view,
  toggleView,
}) => {
  return (
    <div className="cal-header-toolbar cal-toolbar">
      <div className="cal-toolbar-left">
        <div className="cal-button-group">
          <button
            className="cal-prev-button cal-button button-primary"
            aria-label="prev"
            onClick={prevMonth}
          >
            <ChevronLeft height={21} />
          </button>
          <button
            className="cal-next-button cal-button button-primary"
            aria-label="next"
            onClick={nextMonth}
          >
            <ChevronRight height={21} />
          </button>
        </div>
        <button className="cal-today-button cal-button button-primary" onClick={resetMonth}>
          today
        </button>
      </div>
      <div className="cal-toolbar-middle">
        <h2 className="cal-toolbar-title">
          {months[date.getMonth() as MonthNumbers]} {date.getFullYear()}
        </h2>
      </div>
      <div className="cal-toolbar-right">
        <button
          onClick={() => toggleView(MONTH_CONST)}
          disabled={view === MONTH_CONST}
          className={`cal-dayGridMonth-button cal-button button-primary ${
            view === MONTH_CONST ? 'button-active' : ''
          }`}
        >
          month
        </button>
        <button
          onClick={() => toggleView(WEEK_CONST, getDateForWeekToggle(date))}
          disabled={view === WEEK_CONST}
          className={`cal-dayGridMonth-button cal-button button-primary ${
            view === WEEK_CONST ? 'button-active' : ''
          }`}
        >
          week
        </button>
        <button
          onClick={() => toggleView(DAY_CONST)}
          disabled={view === DAY_CONST}
          className={`cal-dayGridMonth-button cal-button button-primary ${
            view === DAY_CONST ? 'button-active' : ''
          }`}
        >
          day
        </button>
      </div>
    </div>
  );
};
