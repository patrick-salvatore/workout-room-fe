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
  modalEvent: any;
  name?: string;
  children?: ReactNode;
  saveEvent?: (eventDetails) => void;
  saveNewEvent?: () => void;
  closeModal?: (e: KeyboardEvent | React.MouseEvent) => void;
  handleModalDateChange?: (date: Date, type: string) => void;
  errors?: Errors;
}
