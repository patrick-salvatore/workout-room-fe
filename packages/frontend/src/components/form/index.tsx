import { useState } from 'react';

interface InitialValues {
  name?: string;
  password?: string;
  userName?: string;
  title?: string;
  author?: string;
  subject?: string;
  email?: string;
  msg?: string;
  owner?: string;
  type?: string;
  body?: string;
  date?: Date;
}

interface FormProps extends React.Props<any> {
  initialValues: InitialValues;
  render: Function;
  className?: string;
}

const Form = (props: FormProps): JSX.Element => {
  const { initialValues } = props;
  const [fields, setFields] = useState(initialValues);

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

  return props.render({ fields, handleChange, handleSubmit, handleCheckbox });
};

export default Form;
