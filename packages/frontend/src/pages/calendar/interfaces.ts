import { EventInput } from '@fullcalendar/core';

export interface Event extends EventInput {
  id: number;
}

export type Action =
  | { type: 'events'; payload: Event[] }
  | { type: 'weekends'; payload: boolean };

export interface CalendarState {
  weekends: boolean;
  events: Event[];
}
