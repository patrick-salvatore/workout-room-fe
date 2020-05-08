import React, { useState } from 'react';
import { isBefore, isAfter } from 'date-fns';

import { ModalContentProps, Errors } from './interfaces';

import Suspense from '../suspense';
import BaseEvent from './bodies/base-event';
import EditEvent from './bodies/owner/base-event-owner';
import NewEvent from './bodies/owner/new-event';

import './modal-content.scss';

const getModalContents = (name: string): any => {
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
  modalEvent,
  name,
  children,
  saveEvent,
  saveNewEvent,
  closeModal,
}): JSX.Element => {
  const Body = name && getModalContents(name);
  const [editEvent, setEditEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState(modalEvent);
  const [errors, setErrorState] = useState<Errors>({
    startDateChange: { error: false, message: '' },
    endDateChange: { error: false, message: '' },
  });

  const _saveEvent = (): void => {
    if (saveEvent) {
      console.log('CUSTOM -- SAVING EVENT');
      eventDetails.start = new Date(eventDetails.start).toISOString();
      eventDetails.end =
        eventDetails.end && new Date(eventDetails.end).toISOString();

      saveEvent(eventDetails);
      setEditEvent(false);

      return;
    }

    console.log('SAVING EVENT');
    setEditEvent(false);
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

  const handleModalDateChange = (date, type: string): void => {
    switch (type) {
      case 'endDate': {
        if (isBefore(date, eventDetails.start as any)) {
          setErrorState({
            startDateChange: errors.startDateChange,
            endDateChange: {
              error: !errors.endDateChange.error,
              message: 'end date must be after start date',
            },
          });
        } else {
          const newEvent = { ...eventDetails, end: date };
          setEventDetails(newEvent);
          setErrorState({
            startDateChange: { error: false, message: '' },
            endDateChange: { error: false, message: '' },
          });
        }
        return;
      }
      case 'startDate': {
        if (isAfter(date, eventDetails.end as any)) {
          setErrorState({
            startDateChange: {
              error: !errors.startDateChange.error,
              message: 'start date must be before end date',
            },
            endDateChange: errors.endDateChange,
          });
        } else {
          const newEvent = { ...eventDetails, start: date };
          setEventDetails(newEvent);
          setErrorState({
            startDateChange: { error: false, message: '' },
            endDateChange: { error: false, message: '' },
          });
        }
        return;
      }
      default:
        return;
    }
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
            eventDetails,
            setEditEvent,
            _saveNewEvent,
            handleModalDateChange,
            errors,
          })) ||
          children}
      </div>
    </Suspense>
  );
};

export default ModalContent;
