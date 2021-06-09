import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { fromNullable, match } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

import { CalActivityMetaData, CalSessionSetType } from './calendar_types';

import { activities_map } from './mock.data';
import { ActivityForm, ActivitiesType } from './activity_form';

export type CalActivityMetaDataType = CalActivityMetaData | null;

//     <div
//       className="activity-table-wrapper"
//       style={{
//         gridTemplateColumns: `repeat(${activity.length}, 1fr)`,
//         display: 'grid',
//         gridColumnGap: '16px',
//         marginTop: '24px',
//       }}
//     >
//       {activity.flatMap((session, key) => (
//         <table key={key} className="activity-table">
//           <tbody>
//             <tr className="session-row">
//               <td className="activity-session">Session: {key + 1}</td>
//             </tr>
//             {session.map(
//               ({ activity_title, activity_schema, activity_input, activity_id }, i) => (
//                 <Fragment key={`${activity_id}-${activity_title}-${i}`}>
//                   {i === 0 && (
//                     <tr className="activity-row activity-row-title">
//                       <td className="activity-cell title-cell">Title</td>
//                       {session.some(({ activity_input }) => activity_input) ? (
//                         <td className="activity-cell title-cell">Notes</td>
//                       ) : null}
//                       <td className="activity-cell title-cell">Sets x Reps, Weight</td>
//                     </tr>
//                   )}
//                   <tr className="activity-row">
//                     <td className="activity-cell">
//                       <div className="activity-title">{activity_title}</div>
//                     </td>
//                     {session.some(({ activity_input }) => activity_input) ? (
//                       <td className="activity-cell">
//                         <div className="activity-input">{activity_input}</div>
//                       </td>
//                     ) : null}
//                     <td className="activity-cell">
//                       <div className="activity-schema">
//                         {Object.entries(activity_schema).map(([key, { sets, reps, weight }]) => (
//                           <div
//                             key={`${activity_title}-schema-${i}-${key}`}
//                             className="activity-schema--schema"
//                           >
//                             {`${sets} x ${reps}${weight ? `, ${weight}` : ''}`}
//                           </div>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                 </Fragment>
//               )
//             )}
//           </tbody>
//         </table>
//       ))}
//     </div>

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

export const SessionsForms: React.FC<{
  activityMeta: CalActivityMetaDataType;
}> = ({ activityMeta = {} }) => {
  activityMeta?.activity_id && console.log(activities_map[activityMeta.activity_id]);

  return (
    <>
      {(activityMeta?.activity_id ? activities_map[activityMeta.activity_id] : []).map((__, i) => (
        <ActivityForm
          {...useForm({
            shouldUnregister: true,
          })}
          key={`activity_form_${i}`}
        />
      ))}
    </>
  );
};
