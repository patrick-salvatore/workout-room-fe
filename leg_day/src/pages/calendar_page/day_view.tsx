import React from 'react';
import { format } from 'date-fns';

import { capitalize, query_params_map } from '@helpers/index';
import { Pencil, Plus } from '@svgs/index';
import { get_name_from_date } from './calendar.utils';
import { CalActivityMetaData } from './calendar_types';
import { useCalendarContext } from './calendar_context';
import { ActivityView } from './activity_view';
import { useLocation } from '@reach/router';

export type CalActivityMetaDataType = CalActivityMetaData | null;

export const DayView: React.FC<{ date: Date; activityMeta: CalActivityMetaDataType }> = ({
  date,
  activityMeta,
}) => {
  const {
    date: cal_date,
    set_calendar_day_view,
    cleanup_calendar_day_view,
    day_view: { is_editing_activity, is_creating_activity },
  } = useCalendarContext();
  const { view } = query_params_map(useLocation().search);

  React.useEffect(() => {
    return () => cleanup_calendar_day_view();
  }, [cal_date, view]);

  return (
    <table className="calendar--table day-view">
      <thead className="day-view-header">
        <tr>
          <td
            key={format(date, 'yyyy/MM/dd')}
            className={`cal-header-cell cal-day cal-day-${get_name_from_date(date)} cal-day-past`}
            data-date={format(date, 'yyyy/MM/dd')}
          >
            <div className="cell">
              <a
                className="cal-header-cell-cushion "
                data-navlink={{ date: format(date, 'yyyy/MM/dd'), type: 'day' }}
              >
                {capitalize(get_name_from_date(date))} {format(date, 'MM/dd')}
              </a>
            </div>
            <div className="icon-wrapper">
              {activityMeta ? (
                is_editing_activity ? (
                  <></>
                ) : (
                  <Pencil
                    height={22}
                    width={22}
                    onClick={() => set_calendar_day_view('is_editing_activity')(true)}
                  />
                )
              ) : is_creating_activity ? (
                <></>
              ) : (
                <Plus
                  height={22}
                  width={22}
                  onClick={() => set_calendar_day_view('is_creating_activity')(true)}
                />
              )}
            </div>
          </td>
        </tr>
      </thead>
      <tbody className="day-view-body">
        <tr>
          <td className="day-view-body-cell">
            <div className="activity-wrapper grid-view">
              <div
                className={`${
                  is_editing_activity || is_creating_activity
                    ? 'activity-form-wrapper'
                    : 'activity-view-wrapper'
                }`}
              >
                <ActivityView
                  {...{
                    isCreatingActivity: is_creating_activity,
                    iEditingActivity: is_editing_activity,
                    activityMeta,
                  }}
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
