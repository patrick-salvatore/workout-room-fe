import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FullPage, Container } from 'styledComponents/containers';
import NavBar from 'components/navbar';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const index = function(): JSX.Element {
  const classes = useStyles();

  return (
    <FullPage>
      <Container>
        <NavBar />
        <h1>FEED</h1>
      </Container>
    </FullPage>
  );
};

export default index;
