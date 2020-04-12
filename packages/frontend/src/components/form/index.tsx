import { useState } from 'react';
import { FormProps } from './interfaces';

const Form: React.FC<FormProps> = ({ formFields, render }) => {
  const [fields, setFields] = useState(formFields);

  const handleChange = (e: React.ChangeEvent): void => {
    const { name, value } = e.target as HTMLInputElement;

    setFields({ ...fields, [name]: value });
  };

  const handleCheckbox = (e: React.MouseEvent): void => {
    const { name, value } = e.target as HTMLButtonElement;

    setFields({ ...fields, [name]: !!value });
  };

  const handleSubmit = (e: React.MouseEvent): void => {
    e.preventDefault();
    alert(`
        -- SUBMITTING FORM --
        ${JSON.stringify(fields, null, 2)}
      `);
  };

  return render({ fields, handleChange, handleSubmit, handleCheckbox });
};

export default Form;
