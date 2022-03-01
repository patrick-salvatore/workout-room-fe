type LabeledInputProps = {
  // register: (name: string) => ReturnType<UseFormRegister<any>>;
  name: string;
  label: string;
  inputWrapperClass?: string;
};

export const LabeledInput = ({ register, name, label, inputWrapperClass, ...props }) => (
  <div class={`${inputWrapperClass || ''} shared-input-wrapper shared-input`}>
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
        class: 'shared-input',
      }}
    />
    <label htmlFor={`standard-basic--${name}`} class="shared-input__label" data-content={label}>
      <span class="hidden--visually">{label}</span>
    </label>
  </div>
);
