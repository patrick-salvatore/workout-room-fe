import React, { useReducer, useEffect } from 'react';
import { render } from 'react-dom';
import { isToday } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarState, Action, Event } from './interfaces';
import { updateIdxOfArray } from './calendar.utils';

import Modal from 'components/modal';
import ModalContent from 'components/modal/modal-content';

import { eventMap } from './mock.data';

import './calendar.scss';

const calendarState: CalendarState = {
  weekends: true,
  events: [],
  view: { toggleButtonText: 'Week', isWeek: false, type: 'dayGridMonth' },
  edit: false,
  modalState: {
    show: false,
    name: '',
    workout: {
      id: null,
      idx: null,
      notes: null,
      grid: { rows: [], cols: [] },
      start: null,
      end: null,
    },
  },
};

function calendarReducer(calendarState: CalendarState, action: Action): CalendarState {
  switch (action.type) {
    case 'events': {
      return {
        weekends: calendarState.weekends,
        events: action.payload,
        view: calendarState.view,
        edit: calendarState.edit,
        modalState: calendarState.modalState,
      };
    }
    case 'weekends': {
      return {
        weekends: action.payload,
        events: calendarState.events,
        view: calendarState.view,
        edit: calendarState.edit,
        modalState: calendarState.modalState,
      };
    }
    case 'view': {
      return {
        weekends: calendarState.weekends,
        events: calendarState.events,
        view: action.payload,
        edit: calendarState.edit,
        modalState: calendarState.modalState,
      };
    }
    case 'edit': {
      return {
        weekends: calendarState.weekends,
        events: calendarState.events,
        view: calendarState.view,
        edit: action.payload,
        modalState: calendarState.modalState,
      };
    }
    case 'modal': {
      return {
        weekends: calendarState.weekends,
        events: calendarState.events,
        view: calendarState.view,
        edit: calendarState.edit,
        modalState: action.payload,
      };
    }
    default:
      return calendarState;
  }
}

const Calendar: React.FC = (): JSX.Element => {
  const calendarRef = React.createRef<FullCalendar>();
  const [state, dispatch] = useReducer(calendarReducer, calendarState);

  const closeModal = (): void => {
    dispatch({
      type: 'modal',
      payload: {
        show: false,
        name: state.modalState.name,
        workout: state.modalState.workout,
      },
    });
  };

  const backMonthClick = (): void => {
    const api = calendarRef.current?.getApi();
    api && api.prev();
  };

  const nextMonthClick = (): void => {
    const api = calendarRef.current?.getApi();
    api && api.next();
  };

  const toggleWeekView = (): void => {
    const api = calendarRef.current?.getApi();
    let newViewData;

    if (!state.view.isWeek) {
      api && api.changeView('dayGridWeek');
      newViewData = {
        toggleButtonText: 'Month',
        isWeek: !state.view.isWeek,
        type: 'dayGridWeek',
      };
    } else {
      api && api.changeView('dayGridMonth');
      newViewData = {
        toggleButtonText: 'Week',
        isWeek: !state.view.isWeek,
        type: 'dayGridMonth',
      };
    }

    dispatch({ type: 'view', payload: newViewData });
  };

  const handleDateClick = (event: any): void => {
    // TODO: Change this mock event to be BE generated.
    // ID cannot be FE generated
    /**
     * eg. const newEvent = await service('/events/', changedData)
     */

    dispatch({
      type: 'modal',
      payload: {
        workout: {
          start: event?.date,
          end: event?.date,
          grid: { cols: ['Lifts', 'Weight', 'Sets', 'Reps'], rows: [] },
          id: state.modalState.workout.id,
          idx: state.modalState.workout.idx,
        },
        show: !state.modalState.show,
        name: 'new_event',
      },
    });
  };

  const handleEventClick = ({ event }): void => {
    const workoutDetails = {
      ...event.extendedProps,
      title: event.title,
      start: event.start,
      end: event.end,
      id: event.id,
    };

    dispatch({
      type: 'modal',
      payload: {
        show: true,
        workout: workoutDetails,
        name: state.edit ? 'base_event_owner' : 'base_event',
      },
    });
  };

  const handleUpdateEvent = (workoutDetails: Event): void => {
    const api = calendarRef.current?.getApi();
    const event = api?.getEventById(workoutDetails.id as any);
    event?.setStart(workoutDetails.start as any);
    workoutDetails.end && event?.setEnd(workoutDetails.end);
    event?.setExtendedProp('grid', workoutDetails.grid);
    workoutDetails?.notes && event?.setExtendedProp('notes', workoutDetails?.notes);
    workoutDetails?.title && event?.setProp('title', workoutDetails?.title);

    // todo add error handling here
    if (!workoutDetails.idx) {
      return;
    }
    /**
     * TODO: send saved data to BE
     */
    dispatch({
      type: 'events',
      payload: updateIdxOfArray<Event>(workoutDetails.idx, state.events, workoutDetails),
    });
  };

  const handleNewEvent = (newEventDetails: Event): void => {
    /**
     * TODO: send saved data to BE
     */
    newEventDetails.id = Math.floor(Math.random());

    dispatch({
      type: 'events',
      payload: [...state.events, newEventDetails],
    });

    dispatch({
      type: 'modal',
      payload: { ...state.modalState, show: false },
    });
  };

  const handleDeleteEventClick = ({ id, idx }): void => {
    /**
     * TODO: add BE call to remove event from DB
     */

    const api = calendarRef.current?.getApi();
    const event = api?.getEventById(id as any);
    event?.remove();

    const newEvents = state.events;
    newEvents.splice(idx, 1);

    dispatch({
      type: 'events',
      payload: [...newEvents],
    });

    dispatch({
      type: 'modal',
      payload: { ...state.modalState, show: false },
    });
  };

  const handleEventDrop = ({ event }): void => {
    const newStart = new Date(event.start);
    const { id, title } = event;
    const { idx } = event.extendedProps;
    const changedData = {
      title,
      id: parseInt(id),
      start: newStart,
      ...event.extendedProps,
    };
    const newEvents = updateIdxOfArray<Event>(idx, state.events, changedData);

    dispatch({
      type: 'events',
      payload: newEvents,
    });

    // TODO add BE call to update events table with changed date.
    /**
     * eg. service('/event/[:id]', changedData)
     */
  };

  const staticDetail = ({ event, el }): JSX.Element => {
    const isEventTodayClass = isToday(event.start) ? 'event-today' : '';

    const content = (
      <div className={`event__wrapper ${isEventTodayClass}`}>
        <span className="event-text">{event.title}</span>
      </div>
    );
    render(content, el);
    return el;
  };

  const editableDetail = ({ event, el }): JSX.Element => {
    const isEventTodayClass = isToday(event.start) ? 'event-today' : '';

    const content = (
      <div className={`event__wrapper--edit ${isEventTodayClass}`}>
        <span className="event-text--edit">{event.title}</span>
      </div>
    );
    render(content, el);
    return el;
  };

  const staticProps = {
    customButtons: {
      editButton: {
        text: 'Edit',
        click: (): void => dispatch({ type: 'edit', payload: true }),
      },
      nextBtn: {
        text: 'Next',
        click: (): void => nextMonthClick(),
      },
      backBtn: {
        text: 'Back',
        click: (): void => backMonthClick(),
      },
      toggleView: {
        text: state.view.toggleButtonText,
        click: (): void => toggleWeekView(),
      },
    },
    header: {
      left: 'title, toggleView, today',
      center: 'backBtn, nextBtn',
      right: 'editButton',
    },
    defaultView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    ref: calendarRef,
    weekends: state?.weekends,
    events: state?.events,
    eventRender: staticDetail,
    eventClick: handleEventClick,
    dateClick: () => null,
    eventBackgroundColor: '#3F51B5',
  };

  const editProps = {
    customButtons: {
      submitEdit: {
        text: 'Finish',
        click: (): void => dispatch({ type: 'edit', payload: false }),
      },
      toggleView: {
        text: state.view.toggleButtonText,
        click: (): void => toggleWeekView(),
      },
    },
    header: {
      left: 'title',
      center: 'toggleView',
      right: 'submitEdit',
    },
    defaultView: 'dayGridMonth',
    rerenderDelay: 10,
    eventDurationEditable: false,
    editable: true,
    droppable: true,
    plugins: [dayGridPlugin, interactionPlugin],
    ref: calendarRef,
    weekends: state?.weekends,
    events: state?.events,
    dateClick: handleDateClick,
    eventDrop: handleEventDrop,
    eventClick: handleEventClick,
    eventRender: editableDetail,
    eventBackgroundColor: '#424242',
  };

  useEffect(() => {
    /**
     * TODO: fetch user events from BE
     */
    const events = eventMap.map((e, i) => {
      return {
        ...e,
        idx: i,
      };
    });

    dispatch({ type: 'events', payload: events as any });
  }, []);

  return (
    <>
      <div className="calendar">
        {React.createElement(FullCalendar, state.edit ? editProps : staticProps)}
      </div>
      {state.modalState.show && (
        <Modal
          closeModal={closeModal}
          render={({ editEvent, setEditEvent }) => (
            <ModalContent
              editEvent={editEvent}
              closeModal={closeModal}
              setEditEvent={setEditEvent}
              name={state.modalState.name}
              saveNewEvent={handleNewEvent}
              updateEvent={handleUpdateEvent}
              deleteEvent={handleDeleteEventClick}
              modalWorkOut={state.modalState.workout}
            />
          )}
        />
      )}
    </>
  );
};

export default Calendar;
