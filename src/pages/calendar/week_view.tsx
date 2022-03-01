import { For } from 'solid-js';
import { format, isSameDay } from 'date-fns';
import { fold, fromNullableK } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

import { capitalize } from '@helpers/index';
import { get_name_from_date, Week } from './calendar.utils';
import { CalActivityMetaDataList } from './calendar_types';
import { activities_map } from './mock.data';

const format_notes = (notes: string) =>
  pipe(
    notes,
    fromNullableK(n => n || null),
    fold(
      () => 'Empty Notes',
      n => `${n.substr(0, 60)}...`
    )
  );

const ActivityBlock = props =>
  pipe(
    props.activitiesMeta,
    fromNullableK(activity_meta => activity_meta.find(act => isSameDay(act.date, props.date))),
    fold(
      () => null,
      activity => (
        <div class="activity-block-wrapper">
          <span class="activity-title">{activity.title}</span>
          <p class="activity-notes">{format_notes(activity.notes)}</p>
          {/* <ul class="activity-list-wrapper"> 
          {activities_map[activity.activity_id].flatMap((list, list_index) => (
              <>
                <p class="activity-list-title">Session: {list_index + 1}</p>
                {list.map((workout, workout_index) => (
                  <span class="activity-list-item">{workout.activity_title}</span>
                ))}
              </>
            ))} 
          </ul> */}
        </div>
      )
    )
  );

export const WeekView = (props: {
  week: Week;
  activitiesMeta: CalActivityMetaDataList;
  goToDayView: (date: Date) => void;
}) => (
  <table class="calendar--table week-view">
    <thead class="week-view-header">
      <tr>
        <For each={props.week}>
          {day => (
            <td
              class={`cal-header-cell cal-day cal-day-${get_name_from_date(day.date)} cal-day-past`}
              data-date={format(day.date, 'yyyy/MM/dd')}
            >
              <div class="cal-sync-inner">
                {capitalize(get_name_from_date(day.date))} -
                <a
                  onClick={() => day.date}
                  class="cal-header-cell-cushion cal-header-cell-number-tag"
                  data-navlink={{ date: format(day.date, 'yyyy/MM/dd'), type: 'day' }}
                >
                  {format(day.date, 'dd')}
                </a>
              </div>
            </td>
          )}
        </For>
      </tr>
    </thead>
    <tbody class="week-view-body">
      <tr class="cal-body-section">
        <For each={props.week}>
          {day => (
            <td
              class={`cal-body-cell ${day.isToday ? 'cal-body-cell--today' : ''}`}
              data-date={day.dateString}
            >
              <a class="cal-body-cell-cushion" data-navlink={{ date: day.dateString, type: 'day' }}>
                <ActivityBlock {...{ activitiesMeta: props.activitiesMeta, date: day.date }} />
              </a>
            </td>
          )}
        </For>
      </tr>
    </tbody>
  </table>
);
