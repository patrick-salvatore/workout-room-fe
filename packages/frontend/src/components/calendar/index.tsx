import React, { useReducer, useEffect, useState } from 'react';
import { render } from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarState, Action, Event } from './interfaces';
import { updateIdxOfArray, compareDates } from './calendar.utils';

import Fade from 'components/fade';
import Modal from 'components/modal';
import ModalContent from 'components/modal/modal-content';

import './calendar.scss';

const calendarState: CalendarState = {
  weekends: true,
  events: [],
  view: { toggleButtonText: 'Week', isWeek: false, type: 'dayGridMonth' },
  edit: false,
  // currentView: 'Wed Apr 01 2020 00:00:00 GMT-0400 (Eastern Daylight Time)',
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
      };
    }
    case 'weekends': {
      return {
        weekends: action.payload,
        events: calendarState.events,
        view: calendarState.view,
        edit: calendarState.edit,
      };
    }
    case 'view': {
      return {
        weekends: calendarState.weekends,
        events: calendarState.events,
        view: action.payload,
        edit: calendarState.edit,
      };
    }
    case 'edit': {
      return {
        weekends: calendarState.weekends,
        events: calendarState.events,
        view: calendarState.view,
        edit: action.payload,
      };
    }
    default:
      return calendarState;
  }
}

const eventMap = [
  {
    title: 'April 1',
    start: new Date().toISOString(),
    id: Math.floor(Math.random() * 100),
    className: 'test',
  },
  {
    title: 'April 2',
    start: new Date('April 19, 2020').toISOString(),
    id: Math.floor(Math.random() * 100),
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
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
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
  },
];

const index: React.FC = (): JSX.Element => {
  const calendarRef = React.createRef<FullCalendar>();
  const [state, dispatch] = useReducer(calendarReducer, calendarState);
  const [modalState, setModalState] = useState({
    show: false,
    name: '',
    event: {},
  });

  const closeModal = (e): void => {
    e.preventDefault();
    setModalState({
      show: false,
      name: modalState.name,
      event: modalState.event,
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
    // TODO: Change this mock event to be BE generated
    /**
     * eg. const newEvent = await service('/events/', changedData)
     */
    setModalState({
      show: true,
      name: 'new',
      event: { startDate: event.dateStr },
    });
    // dispatch({ type: 'events', payload: [...state.events, newEvent] });
  };

  const handleEventClick = ({ event }): void => {
    const eventDetails = {
      ...event.extendedProps,
      title: event.title,
    };

    setModalState({ show: true, event: eventDetails, name: 'base' });
  };

  const handleEventDrop = ({ event }): void => {
    const newStart = event.start;
    const { id, title } = event;
    const { idx } = event.extendedProps;
    const changedData = {
      title,
      id: parseInt(id),
      idx,
      start: newStart,
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
    const isEventTodayClass = compareDates(event.start, new Date())
      ? 'event-today'
      : '';

    const content = (
      <div className={`event__wrapper ${isEventTodayClass}`}>
        <span className="event-text">{event.title}</span>
      </div>
    );
    render(content, el);
    return el;
  };

  const editableDetail = ({ event, el }): JSX.Element => {
    const isEventTodayClass = compareDates(event.start, new Date())
      ? 'event-today'
      : '';

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
     * TODO: fetch user events
     */

    const events = eventMap.map((e, i) => {
      return {
        ...e,
        idx: i,
      };
    });

    dispatch({ type: 'events', payload: events });
  }, []);

  // useEffect(() => {}, []);

  return (
    <>
      <div className="calendar">
        {React.createElement(
          FullCalendar,
          state.edit ? editProps : staticProps
        )}
      </div>
      {modalState.show && (
        <Modal closeModal={closeModal}>
          <Fade show={true}>
            <ModalContent
              name={modalState.name}
              event={modalState.event}
              closeModal={closeModal}
            />
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default index;
