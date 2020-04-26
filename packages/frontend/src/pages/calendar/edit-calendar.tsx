import React from 'react';
import { render } from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const EditableCalendar = ({ state, dispatch, setEdit }): JSX.Element => {
  const calendarComponentRef = React.createRef<FullCalendar>();

  const handleDateClick = (arg: any): void => {
    const newEvent = {
      title: `New click event`,
      start: new Date(arg.date),
      id: Math.floor(Math.random() * 100),
    };

    dispatch({ type: 'events', payload: [newEvent] });
  };

  const handleEventClick = (eventClick): void => {
    console.log(eventClick);
  };

  const handleEventDrop = (e): void => {
    // dispatch({ type: 'events', payload: [] });

    console.log(e);
  };

  const handleEventReceive = (arg): void => {
    console.log(arg);
  };

  const editableDetail = ({ event, el }): JSX.Element => {
    const content = (
      <div className="event__wrapper--edit">
        <span className="event__text--edit">{event.title}</span>
        <div>{event.description}</div>
      </div>
    );
    render(content, el);
    return el;
  };

  return (
    <FullCalendar
      themeSystem="bootstrap"
      customButtons={{
        editButton: {
          text: 'Finish',
          click: (): void => setEdit(false),
        },
      }}
      header={{
        left: '',
        center: 'editButton',
        right: '',
      }}
      defaultView="dayGridMonth"
      rerenderDelay={10}
      eventDurationEditable={false}
      editable={true}
      droppable={true}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      ref={calendarComponentRef}
      weekends={state?.weekends}
      events={state?.events}
      dateClick={handleDateClick}
      eventDrop={handleEventDrop}
      eventClick={handleEventClick}
      eventReceive={handleEventReceive}
      eventRender={editableDetail}
      eventBackgroundColor="#424242"
    />
  );
};

export default EditableCalendar;
