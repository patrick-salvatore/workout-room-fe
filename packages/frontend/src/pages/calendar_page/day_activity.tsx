import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { ActivitiesType, ActivityMetaData } from './calendar_types';
import { LabeledInput } from '@components/labeled_input';
import { activities } from './mock.data';

export const DayActivity: React.FC<{ activityMeta: ActivityMetaData; isEditing: boolean }> = ({
  activityMeta,
  isEditing,
}) => {
  return (
    <div
      className={`activity-wrapper  grid-view ${
        isEditing ? 'activity-form-wrapper' : 'activity-view-wrapper'
      }`}
    >
      {isEditing ? (
        <DayActivityForm {...{ activityMeta }} />
      ) : (
        <DayActivityStatic {...{ activityMeta }} />
      )}
    </div>
  );
};

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

const reduce_activity_map = (activity: ActivitiesType, map = {}, step = 0) => {
  if (step !== activity.length) {
    map[`activity_${step + 1}`] = activity[step];
    reduce_activity_map(activity, map, (step += 1));
  }

  return map;
};

const default_values = (activityMeta: ActivityMetaData, activity: ActivitiesType) => {
  return {
    title: activityMeta.title,
    notes: activityMeta.notes || '',
    ...reduce_activity_map(activity),
  };
};

const schema_path = ({ session_key, activity_index, schema_key, name }) =>
  `activity_${session_key + 1}.${activity_index}.activity_schema.${schema_key}.${name}`;

export const DayActivityForm: React.FC<{
  activityMeta: ActivityMetaData;
}> = ({ activityMeta }) => {
  const activity = activities[activityMeta.activity_id];

  const { register, getValues } = useForm<any>({
    defaultValues: default_values(activityMeta, activity),
  });

  console.log(getValues());

  return (
    <>
      <LabeledInput
        {...{
          register,
          hasValue: Boolean(getValues().title),
          name: 'title',
          className: 'activity-title-input',
          label: 'Title',
          inputWrapperClass: 'input-wrapper activity-title-input-wrapper',
        }}
      />
      <LabeledInput
        {...{
          register,
          hasValue: Boolean(getValues().notes),
          name: 'notes',
          label: 'Notes',
          inputWrapperClass: 'input-wrapper activity-notes-input-wrapper',
        }}
      />
      <div className="activity-table-wrapper">
        {activity.flatMap((session, session_key) => (
          <table key={session_key} className="activity-table">
            <tbody>
              <tr className="session-row">
                <td className="activity-session">Session: {session_key + 1}</td>
              </tr>
              {session.map(({ activity_title, activity_schema, activity_id }, activity_index) => (
                <Fragment key={`${activity_title}-${activity_id}`}>
                  {activity_index === 0 && (
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
                      <textarea
                        {...{
                          ...register(
                            `activity_${session_key + 1}[${activity_index}].activity_title`
                          ),
                          className: 'activity-cell-input activity-cell-title-input',
                        }}
                      />
                    </td>
                    {session.some(({ activity_input }) => activity_input) ? (
                      <td className="activity-cell">
                        <textarea
                          {...{
                            ...register(
                              `activity_${session_key + 1}[${activity_index}].activity_input`
                            ),
                            className: 'activity-cell-input activity-cell-input-input',
                          }}
                        />
                      </td>
                    ) : null}
                    <td className="activity-cell">
                      <div className="activity-schema">
                        {Object.entries(activity_schema).map(([schema_key], schema_index) => (
                          <div
                            className="activity-schema-input-wrapper"
                            key={`schema-${activity_id}-${schema_key}-${schema_index}`}
                          >
                            <input
                              {...{
                                ...register(
                                  schema_path({
                                    session_key,
                                    activity_index,
                                    schema_key,
                                    name: 'sets',
                                  })
                                ),
                                className: 'activity-schema-input activity-schema-input-sets',
                              }}
                            />
                            <div className="activity-schema-input-spacer">x</div>
                            <input
                              {...{
                                ...register(
                                  schema_path({
                                    session_key,
                                    activity_index,
                                    schema_key,
                                    name: 'reps',
                                  })
                                ),
                                className: 'activity-schema-input activity-schema-input-reps',
                              }}
                            />
                            <div className="activity-schema-input-spacer">,</div>
                            <input
                              {...{
                                ...register(
                                  schema_path({
                                    session_key,
                                    activity_index,
                                    schema_key,
                                    name: 'weight',
                                  })
                                ),
                                className: 'activity-schema-input activity-schema-input-weight',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </>
  );
};
