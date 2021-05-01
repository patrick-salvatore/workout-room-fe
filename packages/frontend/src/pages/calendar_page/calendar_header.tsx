import React from 'react';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';

import ChevronLeft from '@svgs/ChevronLeft';
import ChevronRight from '@svgs/ChevronRight';

import { MonthNumbers, months, MONTH_CONST, ViewTypes, WEEK_CONST } from './calendar.utils';

type CalendarHeaderProps = {
  date: Date;
  view: ViewTypes;
  previous: () => void;
  next: () => void;
  setToday: () => void;
  toggleView: (view: ViewTypes, d?: Date) => void;
};

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  previous,
  next,
  date,
  setToday,
  view,
  toggleView,
}) => {
  const is_today_func =
    view === MONTH_CONST ? isThisMonth : view === WEEK_CONST ? isThisWeek : isToday;

  return (
    <div className="cal-header-toolbar cal-toolbar">
      <div className="cal-toolbar-left">
        <div className="cal-button-group">
          <button
            className="cal-prev-button cal-button button-primary"
            aria-label="prev"
            onClick={previous}
          >
            <ChevronLeft height={21} />
          </button>
          <button
            className="cal-next-button cal-button button-primary"
            aria-label="next"
            onClick={next}
          >
            <ChevronRight height={21} />
          </button>
        </div>
        <button
          disabled={is_today_func(date)}
          className={`cal-today-button cal-button button-primary`}
          onClick={setToday}
        >
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
          onClick={() => toggleView(WEEK_CONST)}
          disabled={view === WEEK_CONST}
          className={`cal-dayGridMonth-button cal-button button-primary ${
            view === WEEK_CONST ? 'button-active' : ''
          }`}
        >
          week
        </button>
      </div>
    </div>
  );
};
