import React from 'react';

export default function index({ event }): JSX.Element {
  return (
    <>
      <div className="base-event__header"></div>
      <h2 className="base-event__title">{event.title}</h2>
      <div className="base-event__description">
        <p className="base-event__description-text">
          {event.description || 'empty description'}
        </p>
      </div>
      <div className="base-event__grid">
        <p className="base-event__grid-text">{event.grid || 'empty grid'}</p>
      </div>
    </>
  );
}
