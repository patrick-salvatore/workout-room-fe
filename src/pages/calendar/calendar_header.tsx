import { createSignal } from 'solid-js';
import { isThisMonth, isThisWeek, isToday } from 'date-fns';
import { useLocation } from 'solid-app-router';

import { Button } from '@components/button';
import { DropDown, DropDownProps } from '@components/dropdown_menu';

import ChevronLeft from '@svgs/ChevronLeft';
import ChevronRight from '@svgs/ChevronRight';

import { capitalize } from '@/helpers';

import * as constants from './constants';
import { MonthNumbers, ViewTypes } from './calendar.utils';
import { useCalendarContext } from './calendar_context';

type CalendarHeaderProps = {
  previous: () => void;
  next: () => void;
  setToday: () => void;
  toggleView: (v: ViewTypes, d?: Date) => void;
};

const DEFAULT_MENU_ITEM = { label: 'Month', value: 'MONTH' as ViewTypes };
const menuItems: DropDownProps<ViewTypes>['menuItems'] = [
  { label: 'Month', value: 'MONTH', actionSymbol: 'M' },
  { label: 'Week', value: 'WEEK', actionSymbol: 'W' },
  { label: 'Day', value: 'DAY', actionSymbol: 'D' },
] as const;

export const CalendarDropDown = props => {
  const location = useLocation();
  const [selectedView, setSelectedView] = createSignal(
    location.query.view
      ? { label: capitalize(location.query.view), value: location.query.view as ViewTypes }
      : DEFAULT_MENU_ITEM
  );

  return (
    <DropDown<ViewTypes>
      {...{
        onSelect: v => {
          props.onSelect(v);
          setSelectedView({
            label: v,
            value: v as ViewTypes,
          });
        },
        menuItems,
        defaultItem: selectedView(),
      }}
    />
  );
};

export const CalendarHeader = (props: CalendarHeaderProps) => {
  const [calendarState] = useCalendarContext();
  const view = calendarState().calendar_view;

  return (
    <div class="cal-header-toolbar cal-toolbar">
      <div class="cal-toolbar-cell cal-toolbar-cell-left">
        <div class="cal-button-group">
          <button
            class="cal-prev-button cal-button button-primary"
            aria-label="prev"
            onClick={props.previous}
          >
            <ChevronLeft height={21} />
          </button>
          <button
            class="cal-next-button cal-button button-primary"
            aria-label="next"
            onClick={props.next}
          >
            <ChevronRight height={21} />
          </button>
        </div>
        <Button
          class="cal-today-button cal-button button-primary"
          onClick={props.setToday}
          disabled={(view === constants.MONTH_CONST
            ? isThisMonth
            : view === constants.WEEK_CONST
            ? isThisWeek
            : isToday)(calendarState().date)}
        >
          today
        </Button>
        <CalendarDropDown
          {...{
            onSelect: props.toggleView,
          }}
        />
      </div>
      <div class="cal-toolbar-cell cal-toolbar-cell-middle">
        <h2 class="cal-toolbar-title">
          {constants.MONTHS[calendarState().date.getMonth() as MonthNumbers]}{' '}
          {calendarState().date.getFullYear()}
        </h2>
      </div>
    </div>
  );
};
