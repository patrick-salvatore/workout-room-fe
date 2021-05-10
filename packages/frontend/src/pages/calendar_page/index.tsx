import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { Calendar } from './calendar';

import { CalendarProvider } from './calendar_context';

export const CalendarScreen: React.FC<unknown & RouteComponentProps> = () => {
  return (
    <div className="calendar">
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </div>
  );
};
