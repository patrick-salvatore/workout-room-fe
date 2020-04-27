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
                <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
              </svg>
            </button>
          </div>
          <div className="modal__content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
