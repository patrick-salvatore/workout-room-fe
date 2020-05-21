export interface FormFields {
  name?: string;
  password?: string;
  passwordRepeat?: string;
  username?: string;
  email?: string;
  msg?: string;
  owner?: string;
  type?: string;
  body?: string;
  date?: Date;
  newPassword?: string;
  rememberMe?: boolean;
  firstname?: string;
  lastname?: string;
  notes?: string;
}

export interface FormProps {
  formFields: FormFields;
  render: Function;
  className?: string;
  customHandleSubmit?: (formFields: FormFields) => void;
}
