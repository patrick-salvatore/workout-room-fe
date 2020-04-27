export interface ModalProps {
  closeModal: (
    e: React.MouseEvent | React.KeyboardEvent | KeyboardEvent
  ) => void;
  children: any;
}

export interface ModalContentProps {
  content: any;
}
