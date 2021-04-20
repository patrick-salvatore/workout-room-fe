import React from 'react';
import { Month, days_of_week } from './calendar.utils';
import { capitalize } from '@helpers/index';

export const MonthView: React.FC<{ month: Month; goToDayView: (d: Date) => void }> = ({
  month,
  goToDayView,
}): JSX.Element => (
  <table className="calendar--table month-view">
    <thead>
      <tr className="cal-section cal-section-header">
        <td>
          <div className="cal-header">
            <table>
              <tbody>
                <tr>
                  {days_of_week.map(({ day, number }) => (
                    <th className={`cal-header-cell cal-day-${day}`} key={number}>
                      <div className="cal-sync-inner">
                        <a className="cal-header-cell-cushion">{capitalize(day)}</a>
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
    <tbody>
      <tr className="cal-section cal-section-body cal-section-liquid">
        <td>
          <div className="cal-scroller-harness cal-scroller-harness-liquid">
            <div className="cal-scroller cal-scroller-liquid-absolute">
              <div className="cal-body cal-body-balanced">
                <table className="cal-table">
                  <tbody>
                    {month.map((week, week_index) => (
                      <tr key={week_index}>
                        {week.map(({ date, dateString, isToday, thisMonth }, day_index) => (
                          <td
                            key={dateString}
                            className={`cal-day cal-day-${days_of_week[day_index].day} ${
                              isToday ? 'cal-day--today' : ''
                            }`}
                            data-date={dateString}
                          >
                            <div className="cal-day-frame cal-sync-inner">
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
                              <div className="cal-day-events"></div>
                              <div className="cal-day-bg"></div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
);
