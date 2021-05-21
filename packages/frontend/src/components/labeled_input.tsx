import React, { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

type LabeledInputProps = {
  register: (name: string) => ReturnType<UseFormRegister<any>>;
  name: string;
  label: string;
  inputWrapperClass?: string;
  hasValue: boolean;
  // error?: Errors;
};

export const LabeledInput: React.FC<LabeledInputProps & InputHTMLAttributes<any>> = ({
  register,
  name,
  label,
  inputWrapperClass,
  hasValue = false,
  ...props
}) => {
  const { onChange: registerOnChange, ...register_values } = register(name);
  const [innerValue, setInnerValue] = React.useState<string>();
  const [focused, setFocused] = React.useState(hasValue);
  const finalClassName = `shared-input ${focused ? 'shared-input-grow' : ''} ${
    props.className ? props.className : ''
  }`;

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!innerValue) {
      setInnerValue(e.target.value);
    }
    setFocused(true);
  };

  const handleBlur = () => {
    if (!innerValue) {
      setFocused(false);
    }
  };

  return (
    <div className={`${inputWrapperClass ? inputWrapperClass : ''} shared-input-wrapper`}>
      <label
        className={`shared-input-label ${
          focused ? 'shared-input-animated-color shared-input-animated-shrink' : ''
        }`}
        data-shrink="false"
        htmlFor="standard-basic"
      >
        {label}
      </label>
      <div className="shared-input-base-wrapper shared-input shared-input-underline">
        <input
          {...{
            ...props,
            ...register_values,
            type: 'text',
            'aria-invalid': 'false',
            autoComplete: 'off',
            className: finalClassName,
            onFocusCapture: handleFocus,
            onBlurCapture: handleBlur,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setInnerValue(e.target.value);
              registerOnChange(e);
            },
          }}
        />
      </div>
    </div>
  );
};
