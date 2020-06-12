import { ReactNode } from 'react';
import { Event } from 'pages/calendar/interfaces';

export interface ModalProps {
  closeModal: () => void;
  children?: any;
  render: (args: any) => JSX.Element;
}

export type BaseError = { error: boolean; message: string };

export interface Errors {
  dateErrors: {
    startDateChange: BaseError;
    endDateChange: BaseError;
  };
  gridErrors: { gridColumnError: BaseError };
  workoutEntriesErrors: { title: BaseError };
}

export interface ModalContentProps {
  modalWorkOut: any;
  name?: string;
  children?: ReactNode;
  errors?: Errors;
  editEvent: boolean;
  closeModal?: () => void;
  updateEvent?: (eventDetails) => void;
  saveNewEvent?: (newEvent) => void;
  handleModalDateChange?: (date: Date, type: string) => void;
  setEditEvent: (boolean: boolean) => void;
  deleteEvent: ({ id, idx }: { id: number; idx: number }) => void;
}

export interface EventFormProps {
  _saveNewEvent: any;
  errors: Errors;
  workoutDetails: Event;
  emptyColumnHeader: boolean;
  handleGridChange: (grid: any) => void;
  handleModalDateChange: (date: Date, type: string) => void;
}
