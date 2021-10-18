import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { fromNullable, match } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

import { CalActivityMetaData, CalSessionSetType } from './calendar_types';

import { activities_map } from './mock.data';
import { ActivityForm, ActivitiesType } from './activity_form';

export type CalActivityMetaDataType = CalActivityMetaData | null;

const Sessions: React.FC<{ sessions: CalSessionSetType }> = ({ sessions }) => {
  return (
    <>
      {sessions.map(activity => (
        <Fragment key={activity.session_id}>
          <div className="activity-title-wrapper">
            <h1 id="title" className="title">
              {activity.session_main_title}
            </h1>
          </div>
          <div className="activity-notes-wrapper">
            {activity.session_main_notes ? (
              <p id="notes" className="notes">
                {activity.session_main_notes}
              </p>
            ) : null}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export const SessionsStatic: React.FC<{
  activityMeta: CalActivityMetaDataType;
}> = ({ activityMeta }) =>
  pipe(
    fromNullable(activityMeta),
    match(
      () => null,
      meta => <Sessions sessions={activities_map[meta.activity_id]} />
    )
  );

export const SessionsForms: React.FC<{
  activityMeta: CalActivityMetaDataType;
}> = ({ activityMeta = {} }) => {
  return (
    <>
      {(activityMeta?.activity_id ? activities_map[activityMeta.activity_id] : []).map((__, i) => (
        <ActivityForm
          key={`activity_form_${i}`}
          {...useForm({
            shouldUnregister: true,
          })}
        />
      ))}
    </>
  );
};
