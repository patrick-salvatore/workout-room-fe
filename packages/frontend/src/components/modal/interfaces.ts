import { ReactNode } from 'react';

export interface ModalProps {
  closeModal: (
    e: React.MouseEvent | React.KeyboardEvent | KeyboardEvent
  ) => void;
  children: any;
}

export interface ModalContentProps {
  event: any;
  name?: string;
  children?: ReactNode;
  saveEvent?: () => void;
  saveNewEvent?: () => void;
  closeModal?: (e: KeyboardEvent | React.MouseEvent) => void;
}
