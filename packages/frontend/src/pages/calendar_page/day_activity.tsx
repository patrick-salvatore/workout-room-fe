import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';

import { ActivityMetaData } from './calendar_types';
import { ActivitiesType, ActivityForm } from './activity_form';

import { activities } from './mock.data';
import { useCalendarContext } from './calendar_context';

export const DayActivity: React.FC<{
  activityMeta: ActivityMetaData;
  isEditing: boolean;
}> = ({ activityMeta, isEditing }) => (
  <>
    {isEditing ? (
      <DayActivityForm {...{ activityMeta }} />
    ) : (
      <DayActivityStatic {...{ activityMeta }} />
    )}
  </>
);

export const DayActivityStatic: React.FC<{
  activityMeta: ActivityMetaData;
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
      <div className="activity-table-wrapper">
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
                        <td className="activity-cell title-cell">Setx x Reps, Weight</td>
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

export const empty_activity_schema = {
  a: { sets: '', reps: '', weight: '' },
};

export const empty_activity = {
  activity_title: '',
  activity_schema: empty_activity_schema,
  activity_input: null,
};

const reduce_activity_map = (activityList: ActivitiesType) =>
  activityList.reduce(
    (_activity_map, _activity, _activity_index) => ({
      ..._activity_map,
      ..._activity.reduce(
        (activity_map, { _renderId, ...activity }) => ({
          ...activity_map,
          [`activity_${_activity_index + 1}__${_renderId}`]: activity,
        }),
        {}
      ),
    }),
    {}
  );

const default_values = (activityMeta: ActivityMetaData, activity: ActivitiesType) => ({
  title: activityMeta.title,
  notes: activityMeta.notes || '',
  ...reduce_activity_map(activity),
});

export const DayActivityForm: React.FC<{
  activityMeta: ActivityMetaData;
}> = ({ activityMeta }) => {
  const { cleanup_calendar_day_view } = useCalendarContext();

  const activity = activities[activityMeta.activity_id].map(a =>
    a.map(_a => ({ ..._a, _renderId: nanoid(4) }))
  );
  const form_methods = useForm<any>({
    defaultValues: default_values(activityMeta, activity),
    shouldUnregister: true,
  });

  React.useEffect(() => {
    return () => {
      cleanup_calendar_day_view();
    };
  }, []);

  return <ActivityForm {...form_methods} {...{ defaultSessions: activity }} />;
};
