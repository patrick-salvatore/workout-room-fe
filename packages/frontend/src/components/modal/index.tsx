import React, { useEffect } from 'react';
import { ModalProps } from './interfaces';
import './modal.scss';

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  const escFunction = (e: KeyboardEvent): void => {
    if (e.keyCode === 27) {
      closeModal(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    document.getElementsByTagName('html')[0].classList.add('noscroll');

    return (): void => {
      document.removeEventListener('keydown', escFunction);
      document.body.classList.remove('noscroll');
      document.getElementsByTagName('html')[0].classList.remove('noscroll');
    };
  }, []);

  return (
    <div id="modal-root" className="modal">
      <div className="modal__container">
        <div className="modal__wrapper">
          <div className="modal__close-container">
            <button onClick={closeModal} className="modal__close-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
              </svg>
            </button>
          </div>
          <div className="modal__content_container">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
