import React from 'react';

import Loader from '../loader';

const Suspense = props => {
  const { children } = props;
  return (
    <React.Suspense fallback={<Loader {...props.loader} />}>
      {children}
    </React.Suspense>
  );
};

export default Suspense;
