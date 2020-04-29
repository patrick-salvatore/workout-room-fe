import React, { useState } from 'react';
// import Fade from 'components/fade';

import { ModalContentProps } from './interfaces';

import Suspense from '../suspense';
import BaseEvent from './bodies/base-event';
import EditEvent from './bodies/owner/base-event';
import NewEvent from './bodies/owner/new-event';

import './modal-content.scss';

const getModalContents = name => {
  switch (name) {
    case 'base_event_owner':
      return EditEvent;
    case 'new_event':
      return NewEvent;
    default:
      return BaseEvent;
  }
};

const ModalContent: React.FC<ModalContentProps> = ({
  event,
  name,
  children,
  saveEvent,
  saveNewEvent,
  closeModal,
}): JSX.Element => {
  const [editEvent, setEditEvent] = useState(false);
  const Body = name && getModalContents(name);

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
      <div
        className="modal__content_wrapper"
        style={{ animation: 'fadeIn 500ms' }}
      >
        {(Body &&
          React.createElement(Body, {
            _saveEvent,
            editEvent,
            event,
            setEditEvent,
            _saveNewEvent,
          })) ||
          children}
      </div>
    </Suspense>
  );
};

export default ModalContent;
