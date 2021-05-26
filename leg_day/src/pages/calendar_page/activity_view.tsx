import React from 'react';

import { Activity, CreateActivityForm, EditActivityForm } from './activity';
import { CalActivityMetaDataType } from './day_view';

type ActivityViewProps = {
  isCreatingActivity: boolean;
  activityMeta: CalActivityMetaDataType;
  iEditingActivity: boolean;
};

export const ActivityView = ({
  isCreatingActivity,
  activityMeta,
  iEditingActivity,
}: ActivityViewProps): JSX.Element => (
  <>
    {isCreatingActivity ? (
      <CreateActivityForm />
    ) : activityMeta ? (
      iEditingActivity ? (
        <EditActivityForm {...{ activityMeta }} />
      ) : (
        <>
          {
            <Activity
              {...{
                activityMeta,
              }}
            />
          }
        </>
      )
    ) : null}
  </>
);
