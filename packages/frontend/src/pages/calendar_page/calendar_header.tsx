import React from 'react';
import { useLocation } from '@reach/router';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';

import ChevronLeft from '@svgs/ChevronLeft';
import ChevronRight from '@svgs/ChevronRight';

import { MonthNumbers, months, MONTH_CONST, ViewTypes, WEEK_CONST } from './calendar.utils';
import { useCalendarContext } from './calendar_context';
import { query_params_map } from '@helpers/index';

type CalendarHeaderProps = {
  previous: () => void;
  next: () => void;
  setToday: () => void;
  toggleView: (view: ViewTypes, d?: Date) => void;
};

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  previous,
  next,
  setToday,
  toggleView,
}) => {
  const { date } = useCalendarContext();
  const { view } = query_params_map(useLocation().search);

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
          disabled={(view === MONTH_CONST
            ? isThisMonth
            : view === WEEK_CONST
            ? isThisWeek
            : isToday)(date)}
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
