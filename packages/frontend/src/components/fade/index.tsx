import React from 'react';
import { FadeProps } from './interface';

const Fade: React.FC<FadeProps> = ({ show, children }): JSX.Element => {
  const fadeIn = 'fadeIn 500ms';

  return <>{show && <div style={{ animation: fadeIn }}>{children}</div>}</>;
};

export default Fade;
