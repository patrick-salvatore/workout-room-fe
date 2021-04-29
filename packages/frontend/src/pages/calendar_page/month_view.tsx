import React from 'react';
import { isSameDay } from 'date-fns';

import { Month, days_of_week } from './calendar.utils';
import { capitalize } from '@helpers/index';
import { ActivityMetaDataList } from './mock.data';

const static_day_headers = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export const MonthView: React.FC<{
  activitiesMeta: ActivityMetaDataList;
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
                    {static_day_headers.map(day_name => (
                      <th className={`cal-header-cell cal-day-${day_name}`} key={day_name}>
                        <div className="cal-sync-inner">
                          <a className="cal-header-cell-cushion">{capitalize(day_name)}</a>
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
                      {week.map(({ date, dateString, isToday, thisMonth }, day_index) => {
                        const activity = activitiesMeta.find(act => isSameDay(act.date, date));

                        return (
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
                                {activity && (
                                  <div className="activity" key={`${activity?.id}-${day_index}`}>
                                    <a className="activity-text">{activity?.title}</a>
                                  </div>
                                )}
                              </div>
                              <div className="cal-day-bg"></div>
                            </div>
                          </td>
                        );
                      })}
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
