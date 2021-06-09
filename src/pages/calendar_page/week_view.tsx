import React, { Fragment } from 'react';
import { format, isSameDay } from 'date-fns';
import { fold, fromNullableK } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

import { capitalize } from '@helpers/index';
import { get_name_from_date, Week } from './calendar.utils';
import { CalActivityMetaDataList } from './calendar_types';
// import { activities } from './mock.data';

const format_notes = <S extends string>(notes_string?: S) =>
  pipe(
    notes_string,
    fromNullableK(n_string => n_string || null),
    fold(
      () => 'Empty Notes',
      n => `${n.substr(0, 60)}...`
    )
  );

const ActivityBlock: React.FC<{
  activitiesMeta: CalActivityMetaDataList;
  date: Date;
}> = ({ activitiesMeta, date }) =>
  pipe(
    activitiesMeta,
    fromNullableK(activity_meta => activity_meta.find(act => isSameDay(act.date, date))),
    fold(
      () => null,
      activity => (
        <div className="activity-block-wrapper">
          {/* <span className="activity-title">{activity.title}</span> */}
          {/* <p className="activity-notes">{format_notes(activity.notes)}</p> */}
          <ul className="activity-list-wrapper">
            {/* {activities[activity.activity_id].flatMap((list, list_index) => (
              <Fragment key={list_index}>
                <p className="activity-list-title">Session: {list_index + 1}</p>
                {list.map((workout, workout_index) => (
                  <span
                    className="activity-list-item"
                    key={`${list_index}-${workout.activity_title}-${workout_index}`}
                  >
                    {workout.activity_title}
                  </span>
                ))}
              </Fragment>
            ))} */}
          </ul>
        </div>
      )
    )
  );

export const WeekView: React.FC<{
  activitiesMeta: CalActivityMetaDataList;
  week: Week;
  goToDayView: (d: Date) => void;
}> = ({ week, goToDayView, activitiesMeta }) => (
  <table className="calendar--table week-view">
    <thead className="week-view-header">
      <tr>
        {week.map(({ date }) => (
          <td
            key={format(date, 'yyyy/MM/dd')}
            className={`cal-header-cell cal-day cal-day-${get_name_from_date(date)} cal-day-past`}
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
        ))}
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
