import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type FormTextAreaType = {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  inputWrapperClass?: string;
  hasValue: boolean;
  // error?: Errors;
};

export const FormTextArea: React.FC<FormTextAreaType & React.TextareaHTMLAttributes<any>> = ({
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
  const finalclass = `shared-text-area ${focused ? 'shared-text-area-grow' : ''} ${
    props.class ? props.class : ''
  }`;

  const handleFocus = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div class={`${inputWrapperClass ? inputWrapperClass : ''} shared-text-area-wrapper`}>
      <label
        class={`shared-text-area-label ${
          focused ? 'shared-text-area-animated-color shared-text-area-animated-shrink' : ''
        }`}
        data-shrink="false"
        htmlFor="standard-basic"
      >
        {label}
      </label>
      <div class="shared-text-area-base-wrapper shared-text-area shared-text-area-underline">
        <textarea
          {...{
            ...props,
            ...register_values,
            type: 'text',
            'aria-invalid': 'false',
            autoComplete: 'off',
            class: finalclass,
            onFocusCapture: handleFocus,
            onBlurCapture: handleBlur,
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setInnerValue(e.target.value);
              registerOnChange(e);
            },
          }}
        />
      </div>
    </div>
  );
};
