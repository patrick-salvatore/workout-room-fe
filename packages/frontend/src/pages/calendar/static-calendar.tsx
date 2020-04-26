import React from 'react';
import { render } from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const StaticCalendar = ({ state, setEdit, dispatch }): JSX.Element => {
  const calendarComponentRef = React.createRef<FullCalendar>();

  const staticDetail = ({ event, el }): JSX.Element => {
    const content = (
      <div className="event__wrapper">
        <span className="event-text">{event.title}</span>
        <div>{event.description}</div>
      </div>
    );
    render(content, el);
    return el;
  };

  return (
    <FullCalendar
      customButtons={{
        editButton: {
          text: 'Edit',
          click: (): void => setEdit(true),
        },
      }}
      header={{
        left: 'title',
        center: 'editButton',
      }}
      defaultView="dayGridMonth"
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      ref={calendarComponentRef}
      weekends={state?.weekends}
      events={state?.events}
      eventRender={staticDetail}
    />
  );
};

export default StaticCalendar;
