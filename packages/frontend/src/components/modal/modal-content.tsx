import React, { useState } from 'react';
import { isBefore, isAfter } from 'date-fns';

import { ModalContentProps, Errors, BaseErrorType } from './interfaces';

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
  gridErrors: {
    gridColumnError: { error: false, message: '' },
    emptyColumnHeader: { error: false, message: '' },
  },
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
): { workoutEntryErrorsArr: any[]; notValidNewWorkout: boolean } => {
  console.log(newWorkoutData)

  const workoutEntryErrorsArr = [];

  if (!newWorkoutData.title) {
    workoutEntryErrorsArr.push({
      errorType: 'title',
      message: 'Please provide a workout title',
    } as never);
  }

  return { workoutEntryErrorsArr, notValidNewWorkout: Boolean(workoutEntryErrorsArr.length) };
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
  const [baseWorkoutDetails, setBaseWorkoutDetails] = useState(modalWorkOut);
  const [errors, setErrorState] = useState<Errors>(baseErrorsObject);
  const hasErrors = Object.keys(errors).filter(e => errors[e].error).length;

  React.useEffect(() => {
    const emptyColumnHeader = baseWorkoutDetails?.grid?.cols.filter(
      (c: string) => c.toLowerCase() === 'empty'
    ).length;

    if (Boolean(emptyColumnHeader)) {
      setErrorState({
        ...errors,
        gridErrors: Object.assign(errors.gridErrors, {
          emptyColumnHeader: { error: true, message: '' },
        }),
      });
    }

    return () => {
      setErrorState({
        ...errors,
        gridErrors: Object.assign(errors.gridErrors, {
          emptyColumnHeader: { error: false, message: '' },
        }),
      });
    };
  }, [baseWorkoutDetails?.grid?.cols]);

  const _updateEvent = (newWorkoutDetails): void => {
    if (errors.gridErrors.emptyColumnHeader.error && Boolean(hasErrors)) {
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
    const { workoutEntryErrorsArr, notValidNewWorkout } = validateWorkoutEntry(newWorkoutData);

    if (errors.gridErrors.emptyColumnHeader.error && Boolean(hasErrors)) {
      return;
    }

    if (notValidNewWorkout) {
      const newWorkoutEntryErrors = workoutEntryErrorsArr.reduce((acc, { errorType, message }) => {
        acc[errorType] = { error: true, message };
        return acc;
      }, {});

      setErrorState({
        ...errors,
        workoutEntriesErrors: Object.assign(errors.workoutEntriesErrors, newWorkoutEntryErrors),
      });
      return;
    } else { 
      setErrorState({
        ...errors,
        workoutEntriesErrors: Object.assign(errors.workoutEntriesErrors, baseErrorsObject.workoutEntriesErrors),
      });
    }

    if (saveNewEvent) {
      saveNewEvent(workoutEvent);
      setErrorState(baseErrorsObject)
      closeModal && closeModal();
    }
  };

  const _deleteEvent = () => {
    deleteEvent &&
      deleteEvent({
        id: parseFloat(baseWorkoutDetails.id),
        idx: baseWorkoutDetails.idx,
      });
  };

  const handleModalDateChange = (date, type: string): void => {
    switch (type) {
      case 'endDate': {
        if (isBefore(date, baseWorkoutDetails.start as any)) {
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
          const newEvent = { ...baseWorkoutDetails, end: date };
          setBaseWorkoutDetails(newEvent);
          setErrorState({
            ...errors,
            dateErrors: baseErrorsObject.dateErrors,
          });
        }
        return;
      }
      case 'startDate': {
        let newErrors;

        if (isAfter(date, baseWorkoutDetails.end as any)) {
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
          const newEvent = { ...baseWorkoutDetails, start: date };
          newErrors = Object.assign(errors, {
            dateErrors: baseErrorsObject.dateErrors,
          });
          setBaseWorkoutDetails(newEvent);
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
    setBaseWorkoutDetails({ ...baseWorkoutDetails, grid });
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
            handleGridChange, // function to handle grid data change
            baseWorkoutDetails, // workout object
            handleModalDateChange, // function to handle date change
          })) ||
          children}
      </div>
    </Suspense>
  );
};

export default React.memo(ModalContent);
