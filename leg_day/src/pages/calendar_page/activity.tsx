import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';

import { CalActivityMetaData } from './calendar_types';

import { activities } from './mock.data';
import { ActivityForm, ActivitiesType } from './activity_form';

const ActivityStatic: React.FC<{
  activityMeta: CalActivityMetaData;
}> = ({ activityMeta }) => {
  const activity = activities[activityMeta.activity_id];

  return activity ? (
    <>
      <div className="activity-title-wrapper">
        <h1 id="title" className="title">
          {activityMeta.title}
        </h1>
      </div>
      <div className="activity-notes-wrapper">
        {activityMeta.notes ? (
          <p id="notes" className="notes">
            {activityMeta.notes}
          </p>
        ) : null}
      </div>
      <div
        className="activity-table-wrapper"
        style={{
          gridTemplateColumns: `repeat(${activity.length}, 1fr)`,
          display: 'grid',
          gridColumnGap: '16px',
          marginTop: '24px',
        }}
      >
        {activity.flatMap((session, key) => (
          <table key={key} className="activity-table">
            <tbody>
              <tr className="session-row">
                <td className="activity-session">Session: {key + 1}</td>
              </tr>
              {session.map(
                ({ activity_title, activity_schema, activity_input, activity_id }, i) => (
                  <Fragment key={`${activity_id}-${activity_title}-${i}`}>
                    {i === 0 && (
                      <tr className="activity-row activity-row-title">
                        <td className="activity-cell title-cell">Title</td>
                        {session.some(({ activity_input }) => activity_input) ? (
                          <td className="activity-cell title-cell">Notes</td>
                        ) : null}
                        <td className="activity-cell title-cell">Sets x Reps, Weight</td>
                      </tr>
                    )}
                    <tr className="activity-row">
                      <td className="activity-cell">
                        <div className="activity-title">{activity_title}</div>
                      </td>
                      {session.some(({ activity_input }) => activity_input) ? (
                        <td className="activity-cell">
                          <div className="activity-input">{activity_input}</div>
                        </td>
                      ) : null}
                      <td className="activity-cell">
                        <div className="activity-schema">
                          {Object.entries(activity_schema).map(([key, { sets, reps, weight }]) => (
                            <div
                              key={`${activity_title}-schema-${i}-${key}`}
                              className="activity-schema--schema"
                            >
                              {`${sets} x ${reps}${weight ? `, ${weight}` : ''}`}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                )
              )}
            </tbody>
          </table>
        ))}
      </div>
    </>
  ) : null;
};

export const Activity: React.FC<{
  activityMeta: CalActivityMetaData;
}> = ActivityStatic;

export const empty_activity_schema = {
  a: { sets: '', reps: '', weight: '' },
};

export const empty_activity = {
  activity_title: '',
  activity_schema: empty_activity_schema,
  activity_input: null,
};

const reduce_session_map = (sessions: ActivitiesType[]) =>
  sessions.reduce(
    (map, activities) => ({
      ...map,
      [nanoid(5)]: activities,
    }),
    {} as Record<string, ActivitiesType>
  );

const reduce_session_map_to_map = (map: Record<string, ActivitiesType>) =>
  Object.entries(map).reduce(
    (map, [key, activites]) => ({
      ...map,
      [key]: activites.reduce(
        (_map, { _renderId, ...activity }) => ({
          ..._map,
          [_renderId]: { _renderId, ...activity },
        }),
        {}
      ),
    }),
    {}
  );

export const EditActivityForm: React.FC<{
  activityMeta: CalActivityMetaData;
}> = ({ activityMeta }) => {
  const sessions = reduce_session_map(
    // soon to be data coming from store -- 05/20 --
    activities[activityMeta.activity_id].map(
      // find a better way to ensure the ids are unified - right not - DO NOT REMOVE -- 05/20 --
      activity => activity.map(_a => ({ ..._a, _renderId: nanoid(5) }))
    )
  );
  const form_methods = useForm<any>({
    defaultValues: {
      title: activityMeta.title,
      notes: activityMeta.notes || '',
      ...reduce_session_map_to_map(sessions),
    },
    shouldUnregister: true,
  });

  return (
    <ActivityForm
      {...form_methods}
      {...{
        defaultSessions: sessions,
      }}
    />
  );
};

export const CreateActivityForm = (): JSX.Element => {
  const form_methods = useForm({
    shouldUnregister: true,
  });

  return <ActivityForm {...form_methods} />;
};
