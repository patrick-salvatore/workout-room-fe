import React from 'react';
import _Card from '../../components/card';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { findAttribute } from 'utils/index';

interface OptionsProps {
  changeView: (args: { type: string; prevEventDetails?: any }) => void;
}

const workouts = [
  {
    id: 0,
    title: 'title0',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, aut?',
  },
  {
    id: 1,
    title: 'title1',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, aut?',
  },
  {
    id: 22,
    title: 'title2',
    summary:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, aut?',
  },
];

const useStyles = makeStyles({
  root: {
    width: '345px',
    height: '400px',
  },
  icon: {
    fontSize: '128px',
  },
  bigCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    padding: 0,
  },
});

const Options: React.FC<OptionsProps> = ({ changeView }): JSX.Element => {
  const classes = useStyles();

  const setPrevEventView = (e): void => {
    const data = findAttribute(e.target, 'data-details');
    const prevEventDetails = data && JSON.parse(data);

    changeView({ type: 'prev-event', prevEventDetails });
  };

  const setNewEventFormView = (): void => {
    changeView({ type: 'new-event-form' });
  };

  return (
    <div className="options__container">
      <div className="previous-events__container">
        <h1 className="previous-events__title">PREVIOUS EVENTS</h1>
        <div className="card__container">
          {workouts.map(el => (
            <_Card key={el.id} details={el} onClick={setPrevEventView} />
          ))}
        </div>
      </div>
      <div className="new-event__container">
        <h1 className="new-event__title">NEW EVENT</h1>
        <_Card>
          <Card onClick={setNewEventFormView} className={classes.root}>
            <CardContent className={classes.bigCard}>
              <AddIcon className={classes.icon} />
              <Typography variant="body2" component="h4">
                Create a new workout
              </Typography>
            </CardContent>
          </Card>
        </_Card>
      </div>
    </div>
  );
};

export default Options;
