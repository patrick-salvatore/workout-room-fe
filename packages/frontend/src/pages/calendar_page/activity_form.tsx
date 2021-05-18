import React from 'react';
import { nanoid } from 'nanoid';
import { UseFormReturn, UseFormRegister } from 'react-hook-form';

import { LabeledInput } from '@components/labeled_input';
import { Button } from '@components/button';

import { omit } from '@helpers/index';
import { Minus, Plus, TrashCan } from '@svgs/index';
import { ActivitySchemaType } from './calendar_types';

type ActivityFormProps = {
  defaultSessions?: ActivitiesType;
} & UseFormReturn<any>;

export const concat_activities = (fields: Record<string, any>) =>
  [new RegExp('activity_1'), new RegExp('activity_2')].reduce((map, regex) => {
    map[regex.source] = Object.keys(fields).reduce(
      (list, k) => (regex.test(k) ? [...list, fields[k]] : list),
      [] as string[]
    );

    return map;
  }, {});

export const ActivityForm = ({
  register,
  handleSubmit,
  getValues,
  defaultSessions = [],
}: ActivityFormProps): JSX.Element => {
  return (
    <div className="form-wrapper">
      <div className="form-top">
        <div className="inputs-wrapper">
          <LabeledInput
            {...{
              register,
              hasValue: Boolean(getValues().title),
              name: 'title',
              className: 'create-activity-title-input',
              label: 'Title',
              inputWrapperClass: 'input-wrapper title-input-wrapper',
            }}
          />
          <LabeledInput
            {...{
              register,
              hasValue: Boolean(getValues().notes),
              name: 'notes',
              label: 'Notes',
              inputWrapperClass: 'input-wrapper notes-input-wrapper',
            }}
          />
        </div>
        <div className="save-button-wrapper">
          <Button
            className="save-button"
            onClick={handleSubmit(({ title, notes, ...other }) => {
              console.log({ title, notes, ...concat_activities(other) });
            })}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="form-bottom">
        <SessionTable
          {...{
            register,
            defaultSessions,
          }}
        />
      </div>
    </div>
  );
};

export type ActivitiesType = {
  _renderId: string;
  activity_title: string;
  activity_schema: ActivitySchemaType;
  activity_input: string | null;
  activity_id?: string | number;
}[][];

const empty_activity_schema = { sets: '', reps: '', weight: '' };

const empty_activity = {
  activity_title: '',
  activity_schema: { 0: empty_activity_schema },
  activity_input: null,
};

export const SessionTable: React.FC<{
  register: UseFormRegister<any>;
  defaultSessions: ActivitiesType;
}> = ({ register, defaultSessions }) => {
  const [sessionsList, setSessionsList] = React.useState<ActivitiesType>(defaultSessions);

  const add_schema = (session_index: number, activity_index: number) => {
    const activity = sessionsList[session_index][activity_index];
    const old_schema = activity.activity_schema;
    const new_schema: ActivitySchemaType = {
      ...old_schema,
      [Object.keys(old_schema).length + 1]: empty_activity_schema,
    };
    activity.activity_schema = new_schema;
    setSessionsList([...sessionsList]);
  };

  const remove_schema = (session_index: number, activity_index: number) => {
    const activity = sessionsList[session_index][activity_index];

    activity.activity_schema = omit(
      Object.keys(activity.activity_schema).length,
      activity.activity_schema
    );
    setSessionsList([...sessionsList]);
  };

  const add_row = (session_index: number) =>
    setSessionsList(prev => {
      const activity = [
        ...sessionsList[session_index],
        { ...empty_activity, _renderId: nanoid(4) },
      ];
      return prev.length > 1
        ? session_index === 1
          ? [prev[0], activity]
          : [activity, prev[1]]
        : [activity];
    });

  const delete_row = (session_index: number, activity_index: number) =>
    setSessionsList(prev => {
      const activity = [...prev[session_index]]; // create a new array literal since splice mutates
      activity.splice(activity_index, 1);

      if (activity.length < 1) {
        return prev.length > 1 ? (session_index === 1 ? [prev[0]] : [prev[1]]) : [];
      }

      return prev.length > 1
        ? session_index === 1
          ? [prev[0], activity]
          : [activity, prev[1]]
        : [activity];
    });

  const add_session = () =>
    setSessionsList(prev =>
      prev.length
        ? [...prev, [{ ...empty_activity, _renderId: nanoid(4) }]]
        : [[{ ...empty_activity, _renderId: nanoid(4) }]]
    );

  return (
    <div className="session-table-wrapper">
      {sessionsList.flatMap((activity, session_index) => (
        <table className="session-table" key={`session-${session_index}`}>
          <tbody>
            <tr className="session-meta">
              <td className="session-session">Session: {session_index + 1}</td>
              <td className="session-button-cell">
                <Button className="add-row-button" onClick={() => add_row(session_index)}>
                  <Plus className="plus-icon" /> Add
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                {activity.map(({ activity_schema, _renderId }, activity_index) => (
                  <table key={`${session_index}-${activity_index}`} className="activity-table">
                    <thead className="activity-table-header">
                      <tr>
                        <th className="header-cell title-cell">Title</th>
                        <th className="header-cell title-cell">Notes</th>
                        <th className="header-cell title-cell">Sets x Reps, Weight</th>
                        <th className="header-cell empty-cell"></th>
                      </tr>
                    </thead>
                    <tbody className="activity-table-body">
                      <tr className="activity-row" key={`${session_index}-${_renderId}`}>
                        <td className="activity-cell">
                          <textarea
                            {...register(
                              `activity_${session_index + 1}__${_renderId}.activity_title`,
                              {
                                required: true,
                              }
                            )}
                            {...{
                              className: 'activity-cell-input activity-cell-input-input',
                            }}
                          />
                        </td>
                        <td className="activity-cell">
                          <textarea
                            {...register(
                              `activity_${session_index + 1}__${_renderId}.activity_input`
                            )}
                            {...{
                              className: 'activity-cell-input activity-cell-input-input',
                            }}
                          />
                        </td>
                        <td className="activity-cell activity-schema">
                          <div className="activity-schema-wrapper">
                            <div className="activity-buttons-wrapper">
                              {Object.keys(activity_schema).length > 1 && (
                                <div>
                                  <Minus
                                    className="plus-icon"
                                    height={15}
                                    width={15}
                                    onClick={() => remove_schema(session_index, activity_index)}
                                  />
                                </div>
                              )}
                              {Object.keys(activity_schema).length < 4 && (
                                <div>
                                  <Plus
                                    className="plus-icon"
                                    height={15}
                                    width={15}
                                    onClick={() => add_schema(session_index, activity_index)}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="activity-schema">
                              {Object.entries(activity_schema).map(([schema_key], schema_index) => (
                                <div
                                  className="activity-schema-input-wrapper"
                                  key={`schema-${schema_key}-${schema_index}`}
                                >
                                  <input
                                    type="string"
                                    {...register(
                                      `activity_${
                                        session_index + 1
                                      }__${_renderId}.activity_schema.${schema_key}.sets`
                                    )}
                                    {...{
                                      className: 'activity-schema-input activity-schema-input-sets',
                                    }}
                                  />
                                  <div className="activity-schema-input-spacer">x</div>
                                  <input
                                    type="string"
                                    {...register(
                                      `activity_${
                                        session_index + 1
                                      }__${_renderId}.activity_schema.${schema_key}.reps`
                                    )}
                                    {...{
                                      className: 'activity-schema-input activity-schema-input-reps',
                                    }}
                                  />
                                  <div className="activity-schema-input-spacer">,</div>
                                  <input
                                    type="string"
                                    {...register(
                                      `activity_${
                                        session_index + 1
                                      }__${_renderId}.activity_schema.${schema_key}.weight`
                                    )}
                                    {...{
                                      className:
                                        'activity-schema-input activity-schema-input-weight',
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="activity-cell action-cell">
                          <TrashCan onClick={() => delete_row(session_index, activity_index)} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
      {sessionsList.length < 2 && (
        <div className="session-button-wrapper">
          <Button variant="outlined" className="session-button" onClick={add_session}>
            <Plus height={24} width={24} /> Create Session
          </Button>
        </div>
      )}
    </div>
  );
};
