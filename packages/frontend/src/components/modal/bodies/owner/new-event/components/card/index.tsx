import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface SimpleCardProps {
  details?: any;
  children?: React.ReactChild;
  onClick?: () => void;
}

const useStyles = makeStyles({
  root: {
    width: '250px',
    maxHeight: '150px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#397be6',
    '&:hover': {
      backgroundColor: '#4681e0',
    },
  },
});

const SimpleCard: React.FC<SimpleCardProps> = ({
  details,
  children,
  onClick,
}): JSX.Element => {
  const classes = useStyles();
  const [clicked, setClicked] = React.useState(false);

  const PropsComponent = (): JSX.Element => (
    <Card className={classes.root} onClick={onClick}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {details.title}
        </Typography>
        <Typography variant="body2" component="p">
          {details.summary}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div
      className={`card__wrapper ${clicked ? 'pressed' : ''}`}
      onClick={(): void => setClicked(true)}
      onAnimationEnd={(): void => setClicked(false)}
    >
      {children ? children : <PropsComponent />}
    </div>
  );
};

export default SimpleCard;
