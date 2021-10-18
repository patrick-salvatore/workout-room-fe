import React, { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

type LabeledInputProps = {
  register: (name: string) => ReturnType<UseFormRegister<any>>;
  name: string;
  label: string;
  inputWrapperClass?: string;
};

export const LabeledInput: React.FC<LabeledInputProps & InputHTMLAttributes<any>> = ({
  register,
  name,
  label,
  inputWrapperClass,
  ...props
}) => (
  <div className={`${inputWrapperClass || ''} shared-input-wrapper shared-input`}>
    <input
      {...{
        ...props,
        ...register(name),
        name: label,
        placeholder: label,
        type: 'text',
        'aria-invalid': 'false',
        id: `standard-basic--${name}`,
        autoComplete: 'off',
        className: 'shared-input',
      }}
    />
    <label htmlFor={`standard-basic--${name}`} className="shared-input__label" data-content={label}>
      <span className="hidden--visually">{label}</span>
    </label>
  </div>
);
