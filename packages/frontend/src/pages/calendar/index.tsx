import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Calendar } from './calendar';

export const CalendarScreen: React.FC<unknown & RouteComponentProps> = () => (
  <div className="calendar">
    <Calendar />
  </div>
);
