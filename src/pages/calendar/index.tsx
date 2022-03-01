import { Component } from 'solid-js';
import { Calendar } from './calendar';
import { CalendarProvider } from './calendar_context';

const CalendarScreen: Component = () => {
  return (
    <div class="calendar">
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </div>
  );
};

export default CalendarScreen;
