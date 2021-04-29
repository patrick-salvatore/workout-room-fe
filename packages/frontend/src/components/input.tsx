import React from 'react';
// import { Register, Errors } from '@components/form/_form';
// // import { FieldElement, FieldValues } from 'react-hook-form';
// import ErrorMessage from '@components/FormErrorMessage';

import './styles.scss';

type FormInputType = {
  register: any; //Register | ((ref: FieldElement<FieldValues> | null) => void);
  name: string;
  inputClassName?: string;
  rootClassName?: string;
  // error?: Errors;
  as?: string | JSX.Element;
  sublabel?: string;
};
export const FormInput: React.FC<FormInputType> = ({
  register,
  name,
  inputClassName,
  rootClassName,
  // error,
  as,
  sublabel,
}) => {
  const props = {
    ref: register,
    name,
    className: inputClassName,
    autoComplete: 'off',
  };
  return (
    <>
      <div className={rootClassName ? `${rootClassName} form-input-wrapper` : 'form-input-wrapper'}>
        {as === 'object' ? (
          as
        ) : as ? (
          React.createElement(as as string, props)
        ) : (
          <input className={inputClassName} name={name} ref={register} autoComplete="off" />
        )}
        {sublabel && <span className="input-sublabel">{sublabel}</span>}
        {/* {error && <ErrorMessage error={error.message} />} */}
      </div>
    </>
  );
};
