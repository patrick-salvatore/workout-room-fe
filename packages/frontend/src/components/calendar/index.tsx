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

import './calendar.scss';

const calendarState: CalendarState = {
  weekends: true,
  events: [],
  view: { toggleButtonText: 'Week', isWeek: false, type: 'dayGridMonth' },
  edit: false,
  modalState: {
    show: false,
    name: '',
    event: { id: 0, idx: 0, notes: '' },
  },
};

function calendarReducer(
  calendarState: CalendarState,
  action: Action
): CalendarState {
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

const eventMap = [
  {
    title: 'April 1',
    start: new Date('April 27, 2020').toISOString(),
    id: Math.floor(Math.random() * 100),
    className: 'test',
  },
  {
    title: 'April 2',
    start: new Date('April 19, 2020').toISOString(),
    id: Math.floor(Math.random() * 100),
    notes: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
  },
  {
    title: 'May 1',
    start: new Date('May 19, 2020').toISOString(),
    id: Math.floor(Math.random() * 100),
  },
  {
    title: 'May 2',
    start: new Date('May 2, 2020').toISOString(),
    id: Math.floor(Math.random() * 100),
    notes: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
  },
];

const index: React.FC = (): JSX.Element => {
  const calendarRef = React.createRef<FullCalendar>();
  const [state, dispatch] = useReducer(calendarReducer, calendarState);

  const closeModal = (e): void => {
    e.preventDefault();
    dispatch({
      type: 'modal',
      payload: {
        show: false,
        name: state.modalState.name,
        event: state.modalState.event,
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
    // TODO: Change this mock event to be BE generated?
    /**
     * eg. const newEvent = await service('/events/', changedData)
     */

    dispatch({
      type: 'modal',
      payload: {
        ...state.modalState,
        show: !state.modalState.show,
        name: 'new_event',
      },
    });
  };

  const handleEventClick = ({ event }): void => {
    const eventDetails = {
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
        event: eventDetails,
        name: state.edit ? 'base_event_owner' : 'base_event',
      },
    });
  };

  const handleUpdateEvent = (eventDetails: Event): void => {
    const api = calendarRef.current?.getApi();
    const event = api?.getEventById(eventDetails.id as any);
    event && event.setStart(eventDetails.start as any);
    event && eventDetails.end && event.setEnd(eventDetails.end);

    /**
     * TODO: send saved data to BE
     */

    dispatch({
      type: 'events',
      payload: updateIdxOfArray<Event>(
        eventDetails.idx,
        state.events,
        eventDetails
      ),
    });
  };

  const handleNewEvent = (newEvent: Event): void => {
    const api = calendarRef.current?.getApi();

    /**
     * TODO: send saved data to BE
     */

    // dispatch({
    //   type: 'events',
    //   payload: [...state.events, newEvent]
    // });

    dispatch({
      type: 'modal',
      payload: { ...state.modalState, show: !state.modalState.show },
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

    dispatch({ type: 'events', payload: events });
  }, []);

  return (
    <>
      <div className="calendar">
        {React.createElement(
          FullCalendar,
          state.edit ? editProps : staticProps
        )}
      </div>
      {state.modalState.show && (
        <Modal closeModal={closeModal}>
          <ModalContent
            name={state.modalState.name}
            modalEvent={state.modalState.event}
            closeModal={closeModal}
            updateEvent={handleUpdateEvent}
            saveNewEvent={handleNewEvent}
          />
        </Modal>
      )}
    </>
  );
};

export default index;
