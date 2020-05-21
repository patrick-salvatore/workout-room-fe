import { EventInput } from '@fullcalendar/core';

export interface Event extends EventInput {
  id: number;
  idx: number;
  title?: string;
  start?: Date | undefined;
  end?: Date | undefined;
  notes?: any;
}

interface View {
  toggleButtonText: string;
  isWeek: boolean;
  type: string;
}

interface ModalState {
  show: boolean;
  name: string;
  event: Event;
}

export type Action =
  | { type: 'events'; payload: Event[] }
  | { type: 'weekends'; payload: boolean }
  | { type: 'view'; payload: View }
  | { type: 'edit'; payload: boolean }
  | { type: 'modal'; payload: ModalState };

export interface CalendarState {
  weekends: boolean;
  events: Event[];
  view: View;
  edit: boolean;
  modalState: ModalState;
}
