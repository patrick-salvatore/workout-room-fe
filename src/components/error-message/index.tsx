import React from 'react';

import './error-message.scss';

interface ErrorMessageProps {
  errors: {
    [type: string]: any;
  };
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }): JSX.Element => (
  <>
    {Object.keys(errors).map(
      k =>
        errors[k].error && (
          <div key={k} className="alert">
            {errors[k].message}
          </div>
        )
    )}
  </>
);

export default ErrorMessage;
