import React, { useState } from 'react';

import Options from './views/options';
import NewEventForm from './views/event-form';
import PrevEvent from './views/prev-event';

import './new-event.scss';

const newEventStep = {
  options: { component: Options, props: {} },
  form: {
    component: NewEventForm,
    props: {},
  },
  'prev-event': {
    component: PrevEvent,
    props: {},
  },
};

function NewEvent({ _saveNewEvent }): JSX.Element {
  const [view, setView] = useState(newEventStep.options);

  const changeView = (type): void => {
    type && setView(newEventStep[type]);
  };

  return (
    <div className="new-event__container">
      {React.createElement(view.component, {
        ...view.props,
        changeView,
        _saveNewEvent,
      } as any)}
    </div>
  );
}

export default NewEvent;
