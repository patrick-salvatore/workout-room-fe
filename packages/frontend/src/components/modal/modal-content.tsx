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
  name,
  children,
  closeModal,
  updateEvent,
  saveNewEvent,
  modalWorkOut,
  editEvent,
  setEditEvent,
}): JSX.Element => {
  const Body = name && getModalContents(name);
  const [workoutDetails, setWorkoutDetails] = useState(() => {
    return name === 'new_event' ? {} : modalWorkOut;
  });
  const [errors, setErrorState] = useState<Errors>({
    startDateChange: { error: false, message: '' },
    endDateChange: { error: false, message: '' },
    gridColumnError: { error: false, message: '' },
  });

  const _updateEvent = (e): void => {
    if (updateEvent) {
      console.log('CUSTOM -- UPDATING EVENT');

      workoutDetails.start = new Date(workoutDetails.start.setHours(12));
      workoutDetails.end =
        workoutDetails.end && new Date(workoutDetails.end.setHours(12));

      updateEvent(workoutDetails);
      setEditEvent(false);
      return;
    }

    console.log('UPDATING EVENT');
    setEditEvent(false);
    closeModal && closeModal(e);
  };

  const _saveNewEvent = (workoutEvent): void => {
    if (saveNewEvent) {
      console.log('CUSTOM -- CREATED EVENT');
      console.log(workoutEvent);

      // saveNewEvent(workoutDetails);
      // closeModal && closeModal(e);

      return;
    }

    console.log('CREATED EVENT');
    setEditEvent(false);
  };

  const handleModalDateChange = (date, type: string): void => {
    switch (type) {
      case 'endDate': {
        if (isBefore(date, workoutDetails.start as any)) {
          setErrorState({
            ...errors,
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
            ...errors,
            startDateChange: { error: false, message: '' },
            endDateChange: { error: false, message: '' },
          });
        }
        return;
      }
      case 'startDate': {
        if (isAfter(date, workoutDetails.end as any)) {
          setErrorState({
            ...errors,
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
            ...errors,
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

  const handleGridChange = grid => {
    setWorkoutDetails({ ...workoutDetails, grid });
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
            _saveNewEvent,
            errors, // Date change errors
            editEvent, // can edit workout state
            setEditEvent, // function to change edit state
            workoutDetails, // workout object
            handleGridChange, // function to handle grid data change
            handleModalDateChange, // function to handle date change
          })) ||
          children}
      </div>
    </Suspense>
  );
};

export default React.memo(ModalContent);
