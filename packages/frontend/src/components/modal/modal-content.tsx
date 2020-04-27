import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { ModalContentProps } from './interfaces';

import Suspense from '../suspense';

import './modal-content.scss';

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

const ModalContent: React.FC<ModalContentProps> = ({
  content,
}): JSX.Element => {
  const [edit, setEdit] = useState(false);
  const classes = useStyles();

  const saveEvent = e => {
    e.preventDefault();
    setEdit(false);
    alert('SAVING EVENT');
  };

  return (
    <Suspense>
      {content && (
        <div className="modal-content">
          <div className="modal-content__header"></div>
          <h2 className="modal-content__title">{content.title}</h2>
          <div className="modal-content__description">
            <p className="modal-content__description-text">
              {content.description || 'empty description'}
            </p>
          </div>
          <div className="modal-content__grid">
            <p className="modal-content__grid-text">
              {content.grid || 'empty grid'}
            </p>
          </div>
          <div className="modal-content__button">
            {edit ? (
              <Button
                variant="contained"
                className={classes.greenButton}
                onClick={saveEvent}
              >
                SAVE
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={(): void => setEdit(true)}
              >
                EDIT
              </Button>
            )}
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default ModalContent;
