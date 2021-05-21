import React from 'react';
import { useForm } from 'react-hook-form';

import { ActivityForm } from './activity_form';

export const CreateActivityForm = (): JSX.Element => {
  const form_methods = useForm({
    shouldUnregister: true,
  });

  return <ActivityForm {...form_methods} />;
};
