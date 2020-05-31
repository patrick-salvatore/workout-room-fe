export interface Event {
  id: number | null;
  idx?: number | null;
  title?: string;
  start?: Date | string | undefined | null;
  end?: Date | string | undefined | null;
  notes?: any;
  grid: {
    rows: any[];
    cols: any[];
  };
}

interface View {
  toggleButtonText: string;
  isWeek: boolean;
  type: string;
}

interface ModalState {
  show: boolean;
  name: string;
  workout: Event;
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
