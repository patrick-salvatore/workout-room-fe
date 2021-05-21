import React from 'react';
import { isSameDay } from 'date-fns';
import { fold, fromNullableK } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

import { Month, days_of_week } from './calendar.utils';
import { CalActivityMetaDataList } from './calendar_types';

export const MonthView: React.FC<{
  activitiesMeta: CalActivityMetaDataList;
  month: Month;
  goToDayView: (d: Date) => void;
}> = ({ month, goToDayView, activitiesMeta }): JSX.Element => (
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
                          <div className="cal-day-activity">
                            {pipe(
                              activitiesMeta,
                              fromNullableK(activity_meta =>
                                activity_meta.find(act => isSameDay(act.date, date))
                              ),
                              fold(
                                () => null,
                                activity => (
                                  <div className="activity" key={`${activity?.id}-${day_index}`}>
                                    <a className="activity-text">{activity?.title}</a>
                                  </div>
                                )
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
