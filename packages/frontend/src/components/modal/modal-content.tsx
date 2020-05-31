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
  editEvent,
  closeModal,
  deleteEvent, 
  updateEvent,
  saveNewEvent,
  modalWorkOut,
  setEditEvent,
}): JSX.Element => {
  const Body = name && getModalContents(name);
  const [workoutDetails, setWorkoutDetails] = useState(modalWorkOut);
  const [errors, setErrorState] = useState<Errors>({
    startDateChange: { error: false, message: '' },
    endDateChange: { error: false, message: '' },
    gridColumnError: { error: false, message: '' },
  });
  const emptyColumnHeader =
    workoutDetails?.grid?.cols &&
    workoutDetails?.grid?.cols.filter(
      (c: string) => c.toLowerCase() === 'empty'
    ).length;
  const hasErrors = Object.keys(errors).filter(e => errors[e].error).length;

  const _updateEvent = (newWorkoutDetails): void => {
    if (updateEvent && !Boolean(emptyColumnHeader) && !Boolean(hasErrors)) {
      newWorkoutDetails.start = new Date(newWorkoutDetails.start.setHours(12));
      newWorkoutDetails.end =
        newWorkoutDetails.end && new Date(newWorkoutDetails.end.setHours(12));

      setEditEvent(false);
      updateEvent(newWorkoutDetails);
      setErrorState({
        ...errors,
        gridColumnError: { error: false, message: '' },
      });
      return;
    }
    setErrorState({ ...errors, gridColumnError: { error: true, message: '' } });
  };

  const _saveNewEvent = (workoutEvent, extraData): void => {
    if (saveNewEvent && !Boolean(emptyColumnHeader) && !Boolean(hasErrors)) {
      Object.keys(extraData).forEach(k => (workoutEvent[k] = extraData[k]));
      saveNewEvent(workoutEvent);
      closeModal && closeModal();
      return;
    }
  };

  const _deleteEvent = () => { 
    deleteEvent({id: parseFloat(workoutDetails.id), idx: workoutDetails.idx})
  }

  const handleModalDateChange = (date, type: string): void => {
    switch (type) {
      case 'endDate': {
        if (isBefore(date, workoutDetails.start as any)) {
          setErrorState({
            ...errors,
            endDateChange: {
              error: true,
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
              error: true,
              message: 'start date must be before end date',
            },
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
        //  do nothing
        return;
    }
  };
   
  const handleGridChange = React.useCallback(grid => {
    setWorkoutDetails({ ...workoutDetails, grid });
  }, []);

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
            _deleteEvent,
            errors, // errors
            editEvent, // can edit workout state
            setEditEvent, // function to change edit state
            workoutDetails, // workout object
            handleGridChange, // function to handle grid data change
            handleModalDateChange, // function to handle date change
            emptyColumnHeader: Boolean(emptyColumnHeader), // does the grid have empty column header?
          })) ||
          children}
      </div>
    </Suspense>
  );
};

export default React.memo(ModalContent);
