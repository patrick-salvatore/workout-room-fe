import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FullPageColor, Container } from 'styledComponents/containers';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const index = function(): JSX.Element {
  return (
    // <FullPageColor>
    <Container>
      <h1>FEED</h1>
    </Container>
    // </FullPageColor>
  );
};

export default index;
