import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  greenButton: {
    backgroundColor: green[500],
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}));

export default {
  base_owner({ event, setEditEvent, _saveEvent, editEvent }): JSX.Element {
    const classes = useStyles();
    return (
      <>
        <div className="modal-content__header"></div>
        <h2 className="modal-content__title">{event.title}</h2>
        <div className="modal-content__description">
          <p className="modal-content__description-text">
            {event.description || 'empty description'}
          </p>
        </div>
        <div className="modal-content__grid">
          <p className="modal-content__grid-text">
            {event.grid || 'empty grid'}
          </p>
        </div>
        <div className="modal-content__button">
          {editEvent ? (
            <Button
              variant="contained"
              className={classes.greenButton}
              onClick={_saveEvent}
            >
              SAVE
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={(): void => setEditEvent(true)}
            >
              EDIT
            </Button>
          )}
        </div>
      </>
    );
  },
  base({ event }): JSX.Element {
    return (
      <>
        <div className="modal-content__header"></div>
        <h2 className="modal-content__title">{event.title}</h2>
        <div className="modal-content__description">
          <p className="modal-content__description-text">
            {event.description || 'empty description'}
          </p>
        </div>
        <div className="modal-content__grid">
          <p className="modal-content__grid-text">
            {event.grid || 'empty grid'}
          </p>
        </div>
      </>
    );
  },
  new({ _saveNewEvent, event }): JSX.Element {
    const classes = useStyles();
    return (
      <>
        <div className="modal-content__header"></div>
        <h1 className="modal-content__title">NEW EVENT</h1>
        <div className="modal-content__start-date">
          <p className="modal-content__start-date">{event.startDate}</p>
        </div>
        <div className="modal-content__button">
          <Button
            variant="contained"
            className={classes.greenButton}
            onClick={_saveNewEvent}
          >
            SAVE
          </Button>
        </div>
      </>
    );
  },
};
