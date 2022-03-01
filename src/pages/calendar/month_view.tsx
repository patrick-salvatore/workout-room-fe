import { For } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import { isSameDay } from 'date-fns';
import { fold, fromNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

import { query_map_to_string, query_params_map } from '@helpers/index';

import { Month } from './calendar.utils';
import * as constants from './constants';
import { CalActivityMetaDataList } from './calendar_types';
import { activities_map } from './mock.data';
import { useCalendarContext } from './calendar_context';

const SessionCell = props => {
  const navigate = useNavigate();
  const [calendarState, { set_calendar_date, set_calendar_view }] = useCalendarContext();

  return (
    <div
      class={`session-cell-wrapper session-cell--${props.variant} cursor`}
      // onClick={() => {
      //   set_calendar_date(calendarState().date);
      //   set_calendar_view(DAY_CONST);
      //   navigate(
      //     query_map_to_string({
      //       ...query_params_map(window.location.search).exclude('view'),
      //       view: DAY_CONST,
      //       a: props.session_id,
      //     })
      //   );
      // }}
    >
      {props.session_main_title}
    </div>
  );
};

export const MonthView = (props: {
  activitiesMeta: CalActivityMetaDataList;
  month: Month;
  goToDayView: (d: Date) => void;
}) => (
  <table class="calendar--table month-view">
    <thead>
      <tr class="cal-section cal-section-header">
        <td>
          <div class="cal-header">
            <table>
              <tbody>
                <tr>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day_name => (
                    <th class={`cal-header-cell cal-day-${day_name}`}>
                      <div class="cal-sync-inner">
                        <a class="cal-header-cell-cushion">{day_name}</a>
                      </div>
                    </th>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </thead>
    <tbody class="cal-month-body">
      <tr class="cal-section cal-section-body cal-section-liquid">
        <td>
          <div class="cal-body">
            <table class="cal-table">
              <tbody>
                <For each={props.month}>
                  {week => (
                    <tr>
                      <For each={week}>
                        {(day, day_index) => (
                          <td
                            data-date={day.dateString}
                            class={`cal-day cal-day-${constants.DAYS_OF_WEEK[day_index()].day} ${
                              day.isToday ? 'cal-day--today' : ''
                            }`}
                          >
                            <div class="cal-day-frame">
                              <div class="cal-day-top">
                                <a
                                  onClick={() => props.goToDayView(day.date)}
                                  class={`cal-day-number ${
                                    day.isToday ? 'cal-day-number--today' : ''
                                  } ${day.thisMonth ? '' : 'cal-day-number--not-this-month'}`}
                                >
                                  {day.date.getDate()}
                                </a>
                              </div>
                              <div class="cal-day-session">
                                {pipe(
                                  fromNullable(
                                    props.activitiesMeta.find(act => isSameDay(act.date, day.date))
                                  ),
                                  fold(
                                    () => null,
                                    meta =>
                                      activities_map[meta.activity_id].map((session, i) => (
                                        <SessionCell {...session} />
                                      ))
                                  )
                                )}
                              </div>
                              <div class="cal-day-bg"></div>
                            </div>
                          </td>
                        )}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
);
