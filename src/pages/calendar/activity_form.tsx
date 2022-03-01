import { nanoid } from 'nanoid';

import { LabeledInput } from '@components/labeled_input';
import { Button } from '@components/button';

import { len, omit } from '@helpers/index';
import { Minus, Plus, TrashCan } from '@svgs/index';
import { CalActivitySchemaType } from './calendar_types';
import { useCalendarContext } from './calendar_context';

export type ActivityType = {
  activity_title: string;
  activity_schema: CalActivitySchemaType;
  activity_input: string | null;
  _renderId: string;
  activity_id?: string | number;
};
export type ActivitiesType = ActivityType[];
export type TActivitiesType = { [_: string]: ActivitiesType };
export type ActivityFormProps = {
  defaultSessions?: TActivitiesType;
} & UseFormReturn<any>;

export const concat_activities = (
  fields: Record<string, Record<string, ActivityType>>,
  ticks: ReadonlyArray<string>
): Record<string, ActivitiesType> =>
  Object.entries(fields).reduce(
    (acc, [key, activity]) => ({
      ...acc,
      [key === ticks[0] ? 'activity_1' : 'activity_2']: Object.values(activity),
    }),
    {}
  );

export const ActivityForm = ({
  register,
  handleSubmit,
  getValues,
  defaultSessions = {},
  watch,
}: ActivityFormProps) => {
  const [ticks, setTicks] = React.useState<ReadonlyArray<string>>([]);

  return (
    <div class="form-wrapper">
      <div class="form-top">
        <div class="inputs-wrapper">
          <LabeledInput
            {...{
              register: name => register(name, { required: true }),
              name: 'title',
              class: 'create-activity-title-input',
              label: 'Title',
              inputWrapperClass: 'input-wrapper title-input-wrapper',
            }}
          />
          <LabeledInput
            {...{
              register: name => register(name, { required: true }),
              name: 'notes',
              label: 'Notes',
              inputWrapperClass: 'input-wrapper notes-input-wrapper',
            }}
          />
        </div>
        <div class="buttons-wrapper">
          <Button
            class="save-button"
            onClick={handleSubmit(({ title, notes, ...other }) => {
              console.log({ title, notes, ...concat_activities(other, ticks) });
            })}
          >
            Save
          </Button>
          <Button class="cancel-button" onClick={() => cleanup_calendar_day_view()}>
            Cancel
          </Button>
        </div>
      </div>
      <div class="form-bottom">
        <SessionTable
          {...{
            register,
            defaultSessions,
            watch,
            ticks,
            setTicks,
            getValues,
          }}
        />
      </div>
    </div>
  );
};

const empty_activity_schema = { sets: '', reps: '', weight: '' };

const empty_activity = {
  activity_title: '',
  activity_schema: { 1: empty_activity_schema },
  activity_input: null,
};

export const SessionTable: React.FC<{
  register: UseFormRegister<any>;
  defaultSessions: TActivitiesType;
  setTicks: React.Dispatch<React.SetStateAction<readonly string[]>>;
}> = ({ register, defaultSessions, setTicks }) => {
  const [sessionsMap, setSessionsMap] = React.useState<TActivitiesType>(defaultSessions);

  const add_row = (session_key: string) =>
    setSessionsMap(prev => ({
      ...prev,
      [session_key]: [{ ...empty_activity, _renderId: nanoid(4) }, ...sessionsMap[session_key]],
    }));

  const add_session = () => {
    const sessionTick = nanoid(4); // DO NOT MOVE: key sync ticks and sessions
    setTicks(prev => [...prev, sessionTick]);
    setSessionsMap(prev =>
      len(prev)
        ? {
            ...prev,
            [sessionTick]: [{ ...empty_activity, _renderId: nanoid(4) }],
          }
        : {
            [sessionTick]: [{ ...empty_activity, _renderId: nanoid(4) }],
          }
    );
  };

  const add_schema = (session_key: string, activity_index: number) => {
    const activity = sessionsMap[session_key][activity_index];
    const old_schema = activity.activity_schema;
    const new_schema: CalActivitySchemaType = {
      ...old_schema,
      [nanoid(2)]: empty_activity_schema,
    };
    activity.activity_schema = new_schema;
    setSessionsMap(prev => ({ ...prev, [session_key]: sessionsMap[session_key] }));
  };

  const delete_session = (session_key: string) => {
    setTicks(prev => {
      const [first, second] = prev;
      return prev.length > 1 ? [first === session_key ? second : first] : [];
    });

    setSessionsMap(prev => omit(session_key, prev));
  };

  const delete_row = (session_key: string, activity_index: number) => {
    const old_session = sessionsMap[session_key].filter((__, i) => i !== activity_index);

    setTicks(prev => {
      if (!old_session.length) {
        const [first, second] = prev;
        return prev.length > 1 ? [first === session_key ? second : first] : [];
      } else {
        return prev;
      }
    });

    setSessionsMap(prev => {
      if (!old_session.length) {
        return omit(session_key, prev);
      }
      return {
        ...prev,
        [session_key]: old_session,
      };
    });
  };

  const delete_schema = (session_key: string, activity_index: number) => {
    const activity = sessionsMap[session_key][activity_index]; // assigning activity to reference
    const keys = Object.keys(activity.activity_schema);

    activity.activity_schema = omit(keys[keys.length - 1], activity.activity_schema); // mutating reference to activity scheam
    setSessionsMap(prev => ({ ...prev, [session_key]: sessionsMap[session_key] }));
  };

  return (
    <div class="session-table-wrapper">
      {Object.entries(sessionsMap).flatMap(([session_key, session_activities], session_index) => (
        <table class="session-table" key={`session-${session_index}`}>
          <tbody>
            <tr class="session-meta">
              <td class="session-session">Session: {session_index + 1}</td>
              <td class="session-button-cell">
                <Button class="session-button" onClick={() => delete_session(session_key)}>
                  <Minus class="minus-icon" /> Delete Session
                </Button>
                <Button class="session-button" onClick={() => add_row(session_key)}>
                  <Plus class="plus-icon" /> Add
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                {session_activities.map(({ activity_schema, _renderId }, activity_index) => (
                  <table key={`${session_index}-${activity_index}`} class="activity-table">
                    <thead class="activity-table-header">
                      <tr>
                        <th class="header-cell title-cell">Title</th>
                        <th class="header-cell title-cell">Notes</th>
                        <th class="header-cell title-cell">Sets x Reps, Weight</th>
                        <th class="header-cell empty-cell"></th>
                      </tr>
                    </thead>
                    <tbody class="activity-table-body">
                      <tr class="activity-row" key={`${session_index}-${_renderId}`}>
                        <td class="activity-cell">
                          <textarea
                            {...register(`${session_key}.${_renderId}.activity_title`, {
                              required: true,
                            })}
                            {...{
                              class: 'activity-cell-input activity-cell-input-input',
                            }}
                          />
                        </td>
                        <td class="activity-cell">
                          <textarea
                            {...register(`${session_key}.${_renderId}.activity_input`)}
                            {...{
                              class: 'activity-cell-input activity-cell-input-input',
                            }}
                          />
                        </td>
                        <td class="activity-cell">
                          <div class="activity-schema-wrapper">
                            <div class="activity-buttons-wrapper">
                              {Object.keys(activity_schema).length > 1 && (
                                <div>
                                  <Minus
                                    class="plus-icon"
                                    height={15}
                                    width={15}
                                    onClick={() => delete_schema(session_key, activity_index)}
                                  />
                                </div>
                              )}
                              {Object.keys(activity_schema).length < 4 && (
                                <div>
                                  <Plus
                                    class="plus-icon"
                                    height={15}
                                    width={15}
                                    onClick={() => add_schema(session_key, activity_index)}
                                  />
                                </div>
                              )}
                            </div>
                            <div class="activity-schema">
                              {Object.entries(activity_schema).map(([schema_key], schema_index) => (
                                <div
                                  class="activity-schema-input-wrapper"
                                  key={`schema-${schema_key}-${schema_index}`}
                                >
                                  <input
                                    type="string"
                                    {...register(
                                      `${session_key}.${_renderId}.activity_schema.${schema_key}.sets`
                                    )}
                                    {...{
                                      class: 'activity-schema-input activity-schema-input-sets',
                                    }}
                                  />
                                  <div class="activity-schema-input-spacer">x</div>
                                  <input
                                    type="string"
                                    {...register(
                                      `${session_key}.${_renderId}.activity_schema.${schema_key}.reps`
                                    )}
                                    {...{
                                      class: 'activity-schema-input activity-schema-input-reps',
                                    }}
                                  />
                                  <div class="activity-schema-input-spacer">,</div>
                                  <input
                                    type="string"
                                    {...register(
                                      `${session_key}.${_renderId}.activity_schema.${schema_key}.weight`
                                    )}
                                    {...{
                                      class: 'activity-schema-input activity-schema-input-weight',
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td class="activity-cell action-cell">
                          <TrashCan onClick={() => delete_row(session_key, activity_index)} />
                          {/* <Pencil class="pencil-icon" onClick={() => console.log('click')} /> */}
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
      {len(sessionsMap) < 2 && (
        <div class="session-button-wrapper">
          <Button variant="outlined" class="session-button" onClick={add_session}>
            <Plus height={24} width={24} /> Create Session
          </Button>
        </div>
      )}
    </div>
  );
};
