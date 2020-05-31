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
  date?: string | number | Date | number[] | undefined;
  newPassword?: string;
  rememberMe?: boolean;
  firstname?: string;
  lastname?: string;
  notes?: string;
  grid?: { rows: any[]; cols: string[] };
  end?: string | number | Date | number[] | undefined;
  start?: string | number | Date | number[] | undefined;
  title?: string;
}

export interface FormProps {
  formFields: FormFields;
  render: Function;
  className?: string;
  customHandleSubmit?: (formFields: FormFields) => void;
}
