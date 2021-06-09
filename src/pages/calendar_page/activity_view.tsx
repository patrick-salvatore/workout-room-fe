import React from 'react';

import { SessionsStatic, SessionsForms, CalActivityMetaDataType } from './activity';

type ActivityViewProps = {
  isCreatingActivity: boolean;
  activityMeta: CalActivityMetaDataType;
  isEditingActivity: boolean;
};

export const ActivityView = ({
  isCreatingActivity,
  activityMeta,
  isEditingActivity,
}: ActivityViewProps): JSX.Element => (
  <>
    {isEditingActivity ? (
      <SessionsForms {...{ activityMeta }} />
    ) : isCreatingActivity ? (
      <SessionsForms {...{ activityMeta: null }} />
    ) : (
      <SessionsStatic
        {...{
          activityMeta,
        }}
      />
    )}
  </>
);
