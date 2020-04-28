import React, { useState } from 'react';

import { ModalContentProps } from './interfaces';

import Suspense from '../suspense';
import bodies from './modal-contents';

import './modal-content.scss';

const ModalContent: React.FC<ModalContentProps> = ({
  event,
  name,
  children,
  saveEvent,
  saveNewEvent,
  closeModal,
}): JSX.Element => {
  const [editEvent, setEditEvent] = useState(false);
  const Body = name && bodies[name];

  const _saveEvent = (e): void => {
    if (saveEvent) {
      saveEvent();
      setEditEvent(false);
      console.log('CUSTOM -- SAVING EVENT');

      return;
    }

    e.preventDefault();
    setEditEvent(false);
    console.log('SAVING EVENT');
  };

  const _saveNewEvent = (e): void => {
    if (saveNewEvent) {
      console.log('CUSTOM -- CREATED EVENT');
      saveNewEvent();
      closeModal && closeModal(e);

      return;
    }

    e.preventDefault();
    console.log('CREATED EVENT');
    closeModal && closeModal(e);
  };

  return (
    <Suspense loader={{ height: 50, width: 50, label: 'loader' }}>
      {(Body &&
        React.createElement(Body, {
          _saveEvent,
          editEvent,
          event,
          setEditEvent,
          _saveNewEvent,
        })) ||
        children}
    </Suspense>
  );
};

export default ModalContent;
