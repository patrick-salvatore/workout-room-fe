import React, { useState } from 'react';
import { isBefore, isAfter } from 'date-fns';

import { ModalContentProps, Errors } from './interfaces';

import Suspense from '../suspense';
import BaseEvent from './bodies/base-event';
import EditEvent from './bodies/owner/base-event/index';
import NewEvent from './bodies/owner/new-event/index';

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
  modalWorkOut,
  name,
  children,
  updateEvent,
  saveNewEvent,
  closeModal,
}): JSX.Element => {
  const Body = name && getModalContents(name);
  const [editEvent, setEditEvent] = useState(false);
  const [workoutDetails, setWorkoutDetails] = useState(() => {
    return name === 'new_event' ? {} : modalWorkOut;
  });
  const [errors, setErrorState] = useState<Errors>({
    startDateChange: { error: false, message: '' },
    endDateChange: { error: false, message: '' },
  });

  const _updateEvent = (e): void => {
    if (updateEvent) {
      console.log('CUSTOM -- SAVING EVENT');

      workoutDetails.start = new Date(workoutDetails.start.setHours(12));

      workoutDetails.end =
        workoutDetails.end && new Date(workoutDetails.end.setHours(12));

      updateEvent(workoutDetails);
      setEditEvent(false);
      closeModal && closeModal(e);
      return;
    }

    console.log('SAVING EVENT');
    setEditEvent(false);
    closeModal && closeModal(e);
  };

  const _saveNewEvent = (e): void => {
    if (saveNewEvent) {
      console.log('CUSTOM -- CREATED EVENT');
      console.log(workoutDetails);

      // saveNewEvent(workoutDetails);
      // closeModal && closeModal(e);

      return;
    }

    e.preventDefault();
    console.log('CREATED EVENT');
    closeModal && closeModal(e);
  };

  const handleModalDateChange = (date, type: string): void => {
    switch (type) {
      case 'endDate': {
        if (isBefore(date, workoutDetails.start as any)) {
          setErrorState({
            startDateChange: errors.startDateChange,
            endDateChange: {
              error: !errors.endDateChange.error,
              message: 'end date must be after start date',
            },
          });
        } else {
          const newEvent = { ...workoutDetails, end: date };
          setWorkoutDetails(newEvent);
          setErrorState({
            startDateChange: { error: false, message: '' },
            endDateChange: { error: false, message: '' },
          });
        }
        return;
      }
      case 'startDate': {
        if (isAfter(date, workoutDetails.end as any)) {
          setErrorState({
            startDateChange: {
              error: !errors.startDateChange.error,
              message: 'start date must be before end date',
            },
            endDateChange: errors.endDateChange,
          });
        } else {
          const newEvent = { ...workoutDetails, start: date };
          setWorkoutDetails(newEvent);
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
            _updateEvent,
            editEvent,
            workoutDetails,
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
