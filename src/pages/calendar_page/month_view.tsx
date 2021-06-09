import React from 'react';
import { useNavigate } from '@reach/router';
import { isSameDay } from 'date-fns';
import { fold, fromNullable, none } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

import { Month, days_of_week } from './calendar.utils';
import { CalActivityMetaDataList, CalSessionType } from './calendar_types';
import { activities_map } from './mock.data';
import { query_map_to_string, query_params_map } from '@helpers/index';

const SessionCell: React.FC<{ session: CalSessionType; variant?: string }> = ({
  session: { session_id, session_main_title },
  variant = 'base',
}) => {
  const navigate = useNavigate();
  return (
    <div
      key={session_id}
      className={`session-cell-wrapper session-cell--${variant} cursor`}
      onClick={() =>
        navigate(
          query_map_to_string({
            ...query_params_map(window.location.search).exclude('view'),
            view: 'DAY',
            act_id: session_id,
          })
        )
      }
    >
      {session_main_title}
    </div>
  );
};

export const MonthView: React.FC<{
  activitiesMeta: CalActivityMetaDataList;
  month: Month;
  goToDayView: (d: Date) => void;
}> = ({ month, goToDayView, activitiesMeta }): JSX.Element => {
  return (
    <table className="calendar--table month-view">
      <thead>
        <tr className="cal-section cal-section-header">
          <td>
            <div className="cal-header">
              <table>
                <tbody>
                  <tr>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day_name => (
                      <th className={`cal-header-cell cal-day-${day_name}`} key={day_name}>
                        <div className="cal-sync-inner">
                          <a className="cal-header-cell-cushion">{day_name}</a>
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
      <tbody className="cal-month-body">
        <tr className="cal-section cal-section-body cal-section-liquid">
          <td>
            <div className="cal-body">
              <table className="cal-table">
                <tbody>
                  {month.map((week, week_index) => (
                    <tr key={week_index}>
                      {week.map(({ date, dateString, isToday, thisMonth }, day_index) => (
                        <td
                          key={dateString}
                          data-date={dateString}
                          className={`cal-day cal-day-${days_of_week[day_index].day} ${
                            isToday ? 'cal-day--today' : ''
                          }`}
                        >
                          <div className="cal-day-frame">
                            <div className="cal-day-top">
                              <a
                                onClick={() => goToDayView(date)}
                                className={`cal-day-number ${
                                  isToday ? 'cal-day-number--today' : ''
                                } ${thisMonth ? '' : 'cal-day-number--not-this-month'}`}
                              >
                                {date.getDate()}
                              </a>
                            </div>
                            <div className="cal-day-session">
                              {pipe(
                                fromNullable(activitiesMeta.find(act => isSameDay(act.date, date))),
                                fold(
                                  () => none,
                                  meta => fromNullable(activities_map[meta.activity_id])
                                ),
                                fold(
                                  () => null,
                                  sessions =>
                                    sessions.map((session, i) => (
                                      <SessionCell {...{ session }} key={`activity-${i}`} />
                                    ))
                                )
                              )}
                            </div>
                            <div className="cal-day-bg"></div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
