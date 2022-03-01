import { format } from 'date-fns';
import { useLocation } from 'solid-app-router';
import { createSignal, Switch, Match } from 'solid-js';

import { capitalize, query_params_map } from '@helpers/index';
import { Pencil, Plus } from '@svgs/index';

import { get_name_from_date } from './calendar.utils';
import { useCalendarContext } from './calendar_context';
import { SessionsStatic, SessionsForms, CalActivityMetaDataType } from './activity';

export const DayView = props => {
  const [day_view, update_day_view] = createSignal({
    is_editing_activity: false,
    is_creating_activity: false,
  });

  return (
    <table class="calendar--table day-view">
      <thead class="day-view-header">
        <tr>
          <td
            class={`cal-header-cell cal-day cal-day-${get_name_from_date(props.date)} cal-day-past`}
            data-date={format(props.date, 'yyyy/MM/dd')}
          >
            <div class="cell">
              <a
                class="cal-header-cell-cushion "
                data-navlink={{ date: format(props.date, 'yyyy/MM/dd'), type: 'day' }}
              >
                {capitalize(get_name_from_date(props.date))} {format(props.date, 'MM/dd')}
              </a>
            </div>
          </td>
        </tr>
      </thead>
      <tbody class="day-view-body">
        <tr>
          <td class="day-view-body-cell">
            <div class="activity-wrapper grid-view">
              <div
                class={`${
                  day_view().is_editing_activity || day_view().is_creating_activity
                    ? 'activity-form-wrapper'
                    : 'activity-view-wrapper'
                }`}
              >
                <Switch>
                  <Match when={day_view().is_editing_activity}>
                    {/* <SessionsForms {...{ activityMeta: props.activityMeta }} /> */}
                  </Match>
                  <Match when={day_view().is_creating_activity}>
                    {/* <SessionsForms {...{ activityMeta: null }} /> */}
                  </Match>
                  <Match when={true}>
                    <SessionsStatic activityMeta={props.activityMeta} />
                  </Match>
                </Switch>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
