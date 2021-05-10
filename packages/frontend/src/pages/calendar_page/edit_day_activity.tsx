import React from 'react';
import { nanoid } from 'nanoid';
import { Control, useForm, Controller } from 'react-hook-form';

import { LabeledInput } from '@components/labeled_input';
import { Plus, TrashCan } from '@svgs/index';
import { Button } from '@components/button';
import { ActivitySchemaType } from './calendar_types';

type ActivityType = {
  activity_title: string;
  activity_schema: ActivitySchemaType;
  activity_input: string | null;
};

export const empty_activity_schema = {
  a: { sets: '', reps: '', weight: '' },
};

export const empty_activity = {
  activity_title: '',
  activity_schema: empty_activity_schema,
  activity_input: null,
};

type SchemaPathArgs = {
  session_index: number;
  schema_key: string;
  name: string;
  _renderId: string;
};
const schema_path = ({ session_index, schema_key, name, _renderId }: SchemaPathArgs): string =>
  `activity_${session_index + 1}-${_renderId}.activity_schema.${schema_key}.${name}`;

type RenderActivityType = ActivityType & { _renderId: string };
type MainListType = RenderActivityType[][];

export const CeateDayActivityForm = (): JSX.Element => {
  const { register, control } = useForm({
    shouldUnregister: true,
  });
  const controlRef = React.useRef(control);
  const [sessionsList, setSessionsList] = React.useState<MainListType>([]);

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
      const activity = [...prev[session_index]];
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

  return (
    <div className="create-activity-wrapper">
      <LabeledInput
        {...{
          register,
          hasValue: false,
          name: 'title',
          className: 'create-activity-title-input',
          label: 'Title',
          inputWrapperClass: 'input-wrapper create-activity-title-input-wrapper',
        }}
      />
      <LabeledInput
        {...{
          register,
          hasValue: false,
          name: 'notes',
          label: 'Notes',
          inputWrapperClass: 'input-wrapper create-activity-notes-input-wrapper',
        }}
      />
      <div className="create-activity-table-wrapper">
        <SessionTable
          sessionsList={sessionsList}
          addRow={add_row}
          deleteRow={delete_row}
          control={controlRef.current}
        />
        {sessionsList.length < 2 && (
          <div className="create-activity-button-wrapper">
            <Button
              variant="outlined"
              className="create-activity-button"
              onClick={() =>
                setSessionsList(prev =>
                  prev.length
                    ? [...prev, [{ ...empty_activity, _renderId: nanoid(4) }]]
                    : [[{ ...empty_activity, _renderId: nanoid(4) }]]
                )
              }
            >
              <Plus height={24} width={24} /> Create Session
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const SessionTable: React.FC<{
  sessionsList: MainListType;
  addRow: (arg0: number) => void;
  deleteRow: (arg0: number, arg1: number) => void;
  control: Control<any>;
}> = ({ sessionsList, addRow, deleteRow, control }) => {
  return (
    <>
      {sessionsList.flatMap((activity, session_index) => (
        <table className="create-activity-table" key={`session-${session_index}`}>
          <tbody>
            <tr className="create-activity-meta">
              <td className="activity-session">Session: {session_index + 1}</td>
              <td className="activity-button-cell">
                <Button className="add-row-button" onClick={() => addRow(session_index)}>
                  <Plus className="plus-icon" /> Add Row
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                {activity.map(({ activity_schema, _renderId }, activity_index) => (
                  <table key={`${session_index}-${activity_index}`} className="table-wrapper">
                    <thead className="table-header">
                      <tr>
                        <th className="header-cell title-cell">Title</th>
                        <th className="header-cell title-cell">Notes</th>
                        <th className="header-cell title-cell">Sets x Reps, Weight</th>
                        <th className="header-cell empty-cell"></th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      <tr className="activity-row" key={`${session_index}-${_renderId}`}>
                        <td className="activity-cell">
                          <CreateFormTextArea
                            {...{
                              _renderId,
                              control,
                              session_index,
                              activity_index,
                              name: 'activity_title',
                              className: 'activity-cell-input activity-cell-title-input',
                            }}
                          />
                        </td>
                        <td className="activity-cell">
                          <CreateFormTextArea
                            {...{
                              _renderId,
                              control,
                              session_index,
                              activity_index,
                              name: 'activity_input',
                              className: 'activity-cell-input activity-cell-input-input',
                            }}
                          />
                        </td>
                        <td className="activity-cell">
                          <div className="activity-schema">
                            {Object.entries(activity_schema).map(([schema_key], schema_index) => (
                              <div
                                className="activity-schema-input-wrapper"
                                key={`schema-${schema_key}-${schema_index}`}
                              >
                                <CreateFormInput
                                  {...{
                                    _renderId,
                                    control,
                                    session_index,
                                    activity_index,
                                    schema_key,
                                    name: 'sets',
                                    className: 'activity-schema-input activity-schema-input-sets',
                                  }}
                                />
                                <div className="activity-schema-input-spacer">x</div>
                                <CreateFormInput
                                  {...{
                                    _renderId,
                                    control,
                                    session_index,
                                    activity_index,
                                    schema_key,
                                    name: 'reps',
                                    className: 'activity-schema-input activity-schema-input-reps',
                                  }}
                                />
                                <div className="activity-schema-input-spacer">,</div>
                                <CreateFormInput
                                  {...{
                                    _renderId,
                                    control,
                                    session_index,
                                    activity_index,
                                    schema_key,
                                    name: 'weight',
                                    className: 'activity-schema-input activity-schema-input-weight',
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="activity-cell action-cell">
                          <TrashCan onClick={() => deleteRow(session_index, activity_index)} />
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
    </>
  );
};

const CreateFormTextArea: React.FC<{
  session_index: number;
  activity_index: number;
  control: any;
  name: string;
  _renderId: string;
}> = ({ session_index, name, control, _renderId }) => {
  return (
    <Controller
      name={`activity_${session_index + 1}-${_renderId}.${name}`}
      control={control}
      render={({ field }) => (
        <textarea
          {...field}
          {...{
            className: 'activity-cell-input activity-cell-input-input',
          }}
        />
      )}
    />
  );
};

const CreateFormInput: React.FC<{
  control: any;
  session_index: number;
  schema_key: string;
  name: string;
  className: string;
  _renderId: string;
}> = ({ control, session_index, schema_key, name, className, _renderId }) => {
  return (
    <Controller
      name={schema_path({
        session_index,
        schema_key,
        name,
        _renderId,
      })}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          {...{
            className,
          }}
        />
      )}
    />
  );
};
