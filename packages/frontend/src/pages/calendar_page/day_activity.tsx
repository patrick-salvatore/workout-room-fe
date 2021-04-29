import React, { Fragment } from 'react';
import { activities, ActivityMetaData } from './mock.data';
import { useForm } from 'react-hook-form';

export const DayActivity: React.FC<{ activityMeta: ActivityMetaData; isEditing: boolean }> = ({
  activityMeta,
  isEditing,
}) => {
  return isEditing ? (
    <DayActivityForm {...{ activityMeta }} />
  ) : (
    <DayActivityStatic {...{ activityMeta }} />
  );
};

export const DayActivityStatic: React.FC<{
  activityMeta: ActivityMetaData;
}> = ({ activityMeta }) => {
  const activity = activities[activityMeta.activity_id];

  return activity ? (
    <div className="activity-wrapper">
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
        {activity.flatMap((list, key) => (
          <table key={key} className="activity-table">
            <tbody>
              <tr className="session-row">
                <td className="activity-session">Session: {key + 1}</td>
              </tr>
              {list.map(({ title, schema, input }, i) => (
                <Fragment key={`${title}-${i}`}>
                  {i === 0 && (
                    <tr className="activity-row activity-row-title">
                      <td className="activity-cell title-cell">Title</td>
                      {list.some(({ input }) => input) ? (
                        <td className="activity-cell title-cell">Notes</td>
                      ) : null}
                      <td className="activity-cell title-cell">Sets x Reps, Weight</td>
                    </tr>
                  )}
                  <tr className="activity-row">
                    <td className="activity-cell">
                      <div className="activity-title">{title}</div>
                    </td>
                    {list.some(({ input }) => input) ? (
                      <td className="activity-cell">
                        <div className="activity-input">{input}</div>
                      </td>
                    ) : null}
                    <td className="activity-cell">
                      <div className="activity-schema">
                        {Object.entries(schema).map(([key, [sets, reps, weight]]) => (
                          <div
                            key={`${title}-schema-${i}-${key}`}
                            className="activity-schema--schema"
                          >
                            {`${sets} x ${reps}${weight ? `, ${weight}` : ''}`}
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
    </div>
  ) : null;
};

export const DayActivityForm: React.FC<{
  activityMeta: ActivityMetaData;
}> = ({ activityMeta }) => {
  const activity = activities[activityMeta.activity_id];
  const { register } = useForm();
  console.log(activity);
  return (
    <h1>Cool Form</h1>
    // <div className="activity-wrapper">
    //   <div className="activity-title-wrapper">
    //     <h1 id="title" className="title">
    //       {activityMeta.title}
    //     </h1>
    //   </div>
    //   <div className="activity-notes-wrapper">
    //     {activityMeta.notes ? (
    //       <p id="notes" className="notes">
    //         {activityMeta.notes}
    //       </p>
    //     ) : null}
    //   </div>
    //   <div className="activity-table-wrapper">
    //     {activity.flatMap((list, key) => (
    //       <table key={key} className="activity-table">
    //         <tbody>
    //           <tr className="session-row">
    //             <td className="activity-session">Session: {key + 1}</td>
    //           </tr>
    //           {list.map(({ title, schema, input }, i) => (
    //             <Fragment key={`${title}-${i}`}>
    //               {i === 0 && (
    //                 <tr className="activity-row activity-row-title">
    //                   <td className="activity-cell title-cell">Title</td>
    //                   {list.some(({ input }) => input) ? (
    //                     <td className="activity-cell title-cell">Notes</td>
    //                   ) : null}
    //                   <td className="activity-cell title-cell">Setx x Reps, Weight</td>
    //                 </tr>
    //               )}
    //               <tr className="activity-row">
    //                 <td className="activity-cell">
    //                   <div className="activity-title">{title}</div>
    //                 </td>
    //                 {list.some(({ input }) => input) ? (
    //                   <td className="activity-cell">
    //                     <div className="activity-input">{input}</div>
    //                   </td>
    //                 ) : null}
    //                 <td className="activity-cell">
    //                   <div className="activity-schema">
    //                     {Object.entries(schema).map(([key, [sets, reps, weight]]) => (
    //                       <div
    //                         key={`${title}-schema-${i}-${key}`}
    //                         className="activity-schema--schema"
    //                       >
    //                         {`${sets} x ${reps}${weight ? `, ${weight}` : ''}`}
    //                       </div>
    //                     ))}
    //                   </div>
    //                 </td>
    //               </tr>
    //             </Fragment>
    //           ))}
    //         </tbody>
    //       </table>
    //     ))}
    //   </div>
    // </div>
  );
};
