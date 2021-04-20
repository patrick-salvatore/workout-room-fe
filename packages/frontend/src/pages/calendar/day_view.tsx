import React from 'react';
import { format } from 'date-fns';

import { capitalize } from '@helpers/index';
import { days_of_week } from './calendar.utils';

export const DayView: React.FC<{ day: Date }> = ({ day }) => (
  <table className="calendar--table day-view">
    <thead className="day-view-header">
      <tr>
        <td
          key={format(day, 'yyyy/MM/dd')}
          className={`cal-header-cell cal-day cal-day-${days_of_week[day.getDay()].day} cal-day-past`}
          data-date={format(day, 'yyyy/MM/dd')}
        >
          <div className="cal-sync-inner">
            <a
              className="cal-header-cell-cushion "
              data-navlink={{ date: format(day, 'yyyy/MM/dd'), type: 'day' }}
            >
              {capitalize(days_of_week[day.getDay()].day)} {format(day, 'MM/dd')}
            </a>
          </div>
        </td>
      </tr>
    </thead>
    <tbody className="day-view-body">
      <tr className="day-view-body-section">
        <td className="day-view-body-cell"></td>
      </tr>
    </tbody>
  </table>
);
