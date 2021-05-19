import React from 'react';
import { useForm } from 'react-hook-form';

import { ActivityForm } from './activity_form';
import { useCalendarContext } from './calendar_context';

export const CreateActivityForm = (): JSX.Element => {
  const { cleanup_calendar_day_view } = useCalendarContext();
  const form_methods = useForm({
    shouldUnregister: true,
  });

  React.useEffect(() => {
    return () => {
      cleanup_calendar_day_view();
    };
  }, []);

  return <ActivityForm {...form_methods} />;
};
