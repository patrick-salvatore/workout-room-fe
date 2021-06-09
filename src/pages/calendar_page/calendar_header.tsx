import React from 'react';
import { useLocation } from '@reach/router';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';

import ChevronLeft from '@svgs/ChevronLeft';
import ChevronRight from '@svgs/ChevronRight';
import { query_params_map } from '@helpers/index';
import { DropDown, DropDownProps } from '@components/dropdown_menu';

import { MonthNumbers, months, MONTH_CONST, ViewTypes, WEEK_CONST } from './calendar.utils';
import { useCalendarContext } from './calendar_context';
import { Button } from '@components/button';

type CalendarHeaderProps = {
  previous: () => void;
  next: () => void;
  setToday: () => void;
  toggleView: (v: ViewTypes, d?: Date) => void;
};

const menuItems: DropDownProps<ViewTypes>['menuItems'] = [
  { label: 'Month', value: 'MONTH', actionSymbol: 'M' },
  { label: 'Week', value: 'WEEK', actionSymbol: 'W' },
  { label: 'Day', value: 'DAY', actionSymbol: 'D' },
] as const;

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  previous,
  next,
  setToday,
  toggleView,
}) => {
  const { date } = useCalendarContext();
  const query_map = query_params_map(useLocation().search);
  const view = query_map.get('view');

  return (
    <div className="cal-header-toolbar cal-toolbar">
      <div className="cal-toolbar-cell cal-toolbar-cell-left">
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
        <Button
          disabled={(view === MONTH_CONST
            ? isThisMonth
            : view === WEEK_CONST
            ? isThisWeek
            : isToday)(date)}
          className="cal-today-button cal-button button-primary"
          onClick={setToday}
        >
          today
        </Button>
        <DropDown<ViewTypes>
          {...{
            onSelect: v => toggleView(v),
            menuItems,
            defaultItem: view ? { label: view, value: view as ViewTypes } : null,
          }}
        />
      </div>
      <div className="cal-toolbar-cell cal-toolbar-cell-middle">
        <h2 className="cal-toolbar-title">
          {months[date.getMonth() as MonthNumbers]} {date.getFullYear()}
        </h2>
      </div>
    </div>
  );
};
