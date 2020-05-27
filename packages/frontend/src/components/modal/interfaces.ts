import { ReactNode } from 'react';

export interface ModalProps {
  closeModal: (
    e: React.MouseEvent | React.KeyboardEvent | KeyboardEvent
  ) => void;
  children: any;
}

export interface Errors {
  startDateChange: { error: boolean; message: string };
  endDateChange: { error: boolean; message: string };
}

export interface ModalContentProps {
  modalWorkOut: any;
  name?: string;
  children?: ReactNode;
  updateEvent?: (eventDetails) => void;
  saveNewEvent?: (newEvent) => void;
  closeModal?: (e: KeyboardEvent | React.MouseEvent) => void;
  handleModalDateChange?: (date: Date, type: string) => void;
  errors?: Errors;
}
