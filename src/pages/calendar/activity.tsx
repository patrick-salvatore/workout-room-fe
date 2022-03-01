import { nanoid } from 'nanoid';
import { fromNullable, match } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

import { CalActivityMetaData } from './calendar_types';

import { activities_map } from './mock.data';
import { ActivityForm, ActivitiesType } from './activity_form';

export type CalActivityMetaDataType = CalActivityMetaData | null;

const Sessions = ({ sessions }) => {
  return (
    <>
      {sessions.map(activity => (
        <>
          <div class="activity-title-wrapper">
            <h1 id="title" class="title">
              {activity.session_main_title}
            </h1>
          </div>
          <div class="activity-notes-wrapper">
            {activity.session_main_notes ? (
              <p id="notes" class="notes">
                {activity.session_main_notes}
              </p>
            ) : null}
          </div>
        </>
      ))}
    </>
  );
};

export const SessionsStatic = ({ activityMeta }) =>
  pipe(
    fromNullable(activityMeta),
    match(
      () => null,
      meta => <Sessions sessions={activities_map[meta.activity_id]} />
    )
  );

export const SessionsForms = ({ activityMeta }) => {
  return (
    <>
      {(activityMeta?.activity_id ? activities_map[activityMeta.activity_id] : []).map((__, i) => (
        <ActivityForm
          key={`activity_form_${i}`}
          // {...useForm({
          //   shouldUnregister: true,
          // })}
        />
      ))}
    </>
  );
};
