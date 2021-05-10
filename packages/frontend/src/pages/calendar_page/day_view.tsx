import React from 'react';
import { format } from 'date-fns';

import { capitalize } from '@helpers/index';
import { Check, Pencil, Plus } from '@svgs/index';
import { get_name_from_date } from './calendar.utils';
import { ActivityMetaData } from './calendar_types';
import { DayActivity } from './day_activity';
import { useCalendarContext } from './calendar_context';
import { CeateDayActivityForm } from './create_day_activity';

export const DayView: React.FC<{ date: Date; activityMeta: ActivityMetaData | null }> = ({
  date,
  activityMeta,
}) => {
  const {
    set_calendar_day_view,
    day_view: { is_editing_activity, is_creating_activity },
  } = useCalendarContext();

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
                  <Check
                    height={22}
                    width={22}
                    onClick={() => set_calendar_day_view('is_editing_activity')(false)}
                  />
                ) : (
                  <Pencil
                    height={22}
                    width={22}
                    onClick={() => set_calendar_day_view('is_editing_activity')(true)}
                  />
                )
              ) : is_creating_activity ? (
                <Check
                  height={22}
                  width={22}
                  onClick={() => set_calendar_day_view('is_creating_activity')(false)}
                />
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
            {is_creating_activity ? (
              <CeateDayActivityForm />
            ) : (
              <>
                {activityMeta && (
                  <DayActivity
                    {...{
                      activityMeta,
                      isEditing: is_editing_activity,
                      isCreating: is_creating_activity,
                    }}
                  />
                )}
              </>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
