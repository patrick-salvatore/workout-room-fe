import React from 'react';
import { BaseErrorType } from 'components/modal/interfaces';

interface Props {
  errors: {
    [type: string]: BaseErrorType;
  };
}

const index = (props: Props) => {
  return <div>ERRORS</div>;
};

export default index;
