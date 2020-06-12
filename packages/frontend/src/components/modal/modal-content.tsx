import React, { useState } from 'react';
import { isBefore, isAfter } from 'date-fns';

import { ModalContentProps, Errors } from './interfaces';

import Suspense from '../suspense';
import BaseEvent from './bodies/base-event/index';
import EditEvent from './bodies/owner/base-event/index';
import NewEvent from './bodies/owner/new-event/index';

import './modal-content.scss';

const baseErrorsObject: Errors = {
  dateErrors: {
    startDateChange: { error: false, message: '' },
    endDateChange: { error: false, message: '' },
  },
  gridErrors: { gridColumnError: { error: false, message: '' } },
  workoutEntriesErrors: { title: { error: false, message: '' } },
};

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

const validateWorkoutEntry = (
  newWorkoutData
): { errorType: string; notValidNewWorkout: boolean } => {
  console.log(newWorkoutData);

  return { errorType: '', notValidNewWorkout: true };
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
  const [errors, setErrorState] = useState<Errors>(baseErrorsObject);
  const hasErrors = Object.keys(errors).filter(e => errors[e].error).length;

  const emptyColumnHeader =
    workoutDetails?.grid?.cols &&
    workoutDetails?.grid?.cols.filter((c: string) => c.toLowerCase() === 'empty').length;

  const _updateEvent = (newWorkoutDetails): void => {
    if (Boolean(emptyColumnHeader) && Boolean(hasErrors)) {
      setErrorState({
        ...errors,
        gridErrors: Object.assign(errors.gridErrors, {
          gridColumnError: { error: true, message: '' },
        }),
      });
      return;
    }

    if (updateEvent) {
      newWorkoutDetails.start = new Date(newWorkoutDetails.start.setHours(12));
      newWorkoutDetails.end = newWorkoutDetails.end && new Date(newWorkoutDetails.end.setHours(12));

      setEditEvent(false);
      updateEvent(newWorkoutDetails);
      setErrorState({
        ...errors,
        gridErrors: Object.assign(errors.gridErrors, {
          gridColumnError: { error: false, message: '' },
        }),
      });
    }
  };

  const _saveNewEvent = (workoutEvent, extraData): void => {
    Object.keys(extraData).forEach(k => (workoutEvent[k] = extraData[k]));
    const newWorkoutData = workoutEvent;
    const { errorType, notValidNewWorkout } = validateWorkoutEntry(newWorkoutData);

    if (Boolean(emptyColumnHeader) && Boolean(hasErrors)) {
      return;
    }

    if (notValidNewWorkout) {
      return;
    }

    if (saveNewEvent) {
      saveNewEvent(workoutEvent);
      closeModal && closeModal();
    }
  };

  const _deleteEvent = () => {
    deleteEvent &&
      deleteEvent({
        id: parseFloat(workoutDetails.id),
        idx: workoutDetails.idx,
      });
  };

  const handleModalDateChange = (date, type: string): void => {
    switch (type) {
      case 'endDate': {
        if (isBefore(date, workoutDetails.start as any)) {
          setErrorState({
            ...errors,
            dateErrors: {
              ...errors.dateErrors,
              endDateChange: {
                error: true,
                message: 'end date must be after start date',
              },
            },
          });
        } else {
          const newEvent = { ...workoutDetails, end: date };
          setWorkoutDetails(newEvent);
          setErrorState({
            ...errors,
            dateErrors: baseErrorsObject.dateErrors,
          });
        }
        return;
      }
      case 'startDate': {
        let newErrors;

        if (isAfter(date, workoutDetails.end as any)) {
          setErrorState({
            ...errors,
            dateErrors: {
              ...errors.dateErrors,
              startDateChange: {
                error: true,
                message: 'start date must be before end date',
              },
            },
          });

          setErrorState(newErrors);
        } else {
          const newEvent = { ...workoutDetails, start: date };
          newErrors = Object.assign(errors, {
            dateErrors: baseErrorsObject.dateErrors,
          });
          setWorkoutDetails(newEvent);
          setErrorState(newErrors);
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
      <div className="modal__content_wrapper" style={{ animation: 'fadeIn 500ms' }}>
        {(Body &&
          React.createElement(Body, {
            _updateEvent,
            _saveNewEvent,
            _deleteEvent,
            errors, // modal content errors
            editEvent, // can edit workout modal flag
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
