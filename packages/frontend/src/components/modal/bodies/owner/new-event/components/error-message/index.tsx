import React from 'react';
import { BaseError } from 'components/modal/interfaces';

interface Props {
  errors: {
    [type: string]: BaseError;
  };
}

const index = (props: Props) => {
  return <div>ERRORS</div>;
};

export default index;
