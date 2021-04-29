import React, { Fragment } from 'react';
import { format, isSameDay } from 'date-fns';

import { capitalize } from '@helpers/index';
import { get_name_from_date, Week } from './calendar.utils';
import { ActivityMetaDataList, activities } from './mock.data';

const ActivityBlock: React.FC<{
  activitiesMeta: ActivityMetaDataList;
  date: Date;
}> = ({ activitiesMeta, date }) => {
  const activity = activitiesMeta.find(act => isSameDay(act.date, date));

  return activity ? (
    <div className="activity-block-wrapper">
      <span className="activity-title">{activity.title}</span>
      <p>{activity.notes}</p>
      <ul className="activity-list-wrapper">
        {activities[activity.activity_id].flatMap((list, list_index) => (
          <Fragment key={list_index}>
            <p>Session: {list_index + 1}</p>
            {list.map((workout, workout_index) => (
              <span
                className="activity-list-item"
                key={`${list_index}-${workout.title}-${workout_index}`}
              >
                {workout.title}
              </span>
            ))}
          </Fragment>
        ))}
      </ul>
    </div>
  ) : null;
};

export const WeekView: React.FC<{
  activitiesMeta: ActivityMetaDataList;
  week: Week;
  goToDayView: (d: Date) => void;
}> = ({ week, goToDayView, activitiesMeta }) => {
  return (
    <table className="calendar--table week-view">
      <thead className="week-view-header">
        <tr>
          {week.map(({ date }) => {
            return (
              <td
                key={format(date, 'yyyy/MM/dd')}
                className={`cal-header-cell cal-day cal-day-${get_name_from_date(
                  date
                )} cal-day-past`}
                data-date={format(date, 'yyyy/MM/dd')}
              >
                <div className="cal-sync-inner">
                  {capitalize(get_name_from_date(date))} -
                  <a
                    onClick={() => goToDayView(date)}
                    className="cal-header-cell-cushion cal-header-cell-number-tag"
                    data-navlink={{ date: format(date, 'yyyy/MM/dd'), type: 'day' }}
                  >
                    {format(date, 'dd')}
                  </a>
                </div>
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody className="week-view-body">
        <tr className="cal-body-section">
          {week.map(({ date, dateString, isToday }) => (
            <td
              key={dateString}
              className={`cal-body-cell ${isToday ? 'cal-body-cell--today' : ''}`}
              data-date={dateString}
            >
              <a className="cal-body-cell-cushion" data-navlink={{ date: dateString, type: 'day' }}>
                <ActivityBlock {...{ activitiesMeta, date }} />
              </a>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
