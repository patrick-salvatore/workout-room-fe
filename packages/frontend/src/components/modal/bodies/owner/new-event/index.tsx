import React, { useState } from 'react';

import Options from './views/options';
import NewEventForm from './views/event-form';
import PrevEvent from './views/prev-event';

import './new-event.scss';

const newEventStep = {
  options: { component: Options, props: {} },
  'new-event-form': {
    component: NewEventForm,
    props: {},
  },
  'prev-event': {
    component: PrevEvent,
    props: {},
  },
};

function NewEvent({ _saveNewEvent, workoutDetails, ...rest }): JSX.Element {
  const [view, setView] = useState(newEventStep.options);

  const changeView = ({
    type,
    prevEventDetails,
  }: {
    type: string;
    prevEventDetails: any;
  }): void => {
    switch (type) {
      case 'prev-event': {
        prevEventDetails &&
          setView({
            component: newEventStep[type].component as any,
            props: { ...newEventStep[type].props, prevEventDetails },
          });
        break;
      }
      case 'new-event-form': {
        setView(newEventStep[type] as any);
        break;
      }
    }
  };

  return (
    <div className="new-event__container">
      {React.createElement(view.component, {
        ...view.props,
        changeView,
        workoutDetails,
        _saveNewEvent,
      } as any)}
    </div>
  );
}

export default NewEvent;
