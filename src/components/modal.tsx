import React from 'react';

import { XMarkIcon } from '@svgs/index';

type ModalProps = {
  closeModal?: () => void;
  open: boolean;
};

const Modal: React.FC<ModalProps> = ({ closeModal, children, open }) => {
  React.useEffect(() => {
    const escFunction = (e: KeyboardEvent): void => {
      if (parseInt(e.code) === 27) {
        closeModal && closeModal();
      }
    };

    document.addEventListener('keydown', escFunction, false);
    return (): void => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [closeModal]);

  return (
    <>
      {open && (
        <div id="modal-root" className="modal">
          <div className="modal__container">
            <div className="modal__wrapper">
              {closeModal && (
                <div className="modal__close-container">
                  <XMarkIcon onClick={closeModal} />
                </div>
              )}
              <div className="modal__content_container">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
