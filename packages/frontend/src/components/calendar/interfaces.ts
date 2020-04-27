import { EventInput } from '@fullcalendar/core';

export interface Event extends EventInput {
  id: number;
  idx: number;
}

interface View {
  toggleButtonText: string;
  isWeek: boolean;
  type: string;
}

export type Action =
  | { type: 'events'; payload: Event[] }
  | { type: 'weekends'; payload: boolean }
  | { type: 'view'; payload: View }
  | { type: 'edit'; payload: boolean };

export interface CalendarState {
  weekends: boolean;
  events: Event[];
  view: View;
  edit: boolean;
}
