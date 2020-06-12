import React from 'react';

import Loader from '../loader';

import { SuspenseProps } from './interfaces';

const Suspense: React.FC<SuspenseProps> = props => {
  const { children } = props;
  return <React.Suspense fallback={<Loader {...props.loader} />}>{children}</React.Suspense>;
};

export default Suspense;
