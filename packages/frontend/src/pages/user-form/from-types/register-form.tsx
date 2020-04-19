import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormFields } from 'components/form/interfaces';
import Form from 'components/form';

const useStyles = makeStyles(theme => ({
  formColumn: {
    width: '100%',
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fullInput: {
    width: '100%',
    margin: '7px 0',
    padding: '10px 20px',
  },
  input: {
    width: '100%',

    margin: '7px 0',
    padding: '10px 20px',
  },
}));

const RegisterFields: React.FC<any> = ({
  handleClickShowPassword,
  handleFieldView,
  showPassword,
}) => {
  const classes = useStyles();
  const registerFields: FormFields = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    passwordRepeat: '',
    rememberMe: false,
  };

  return (
    <Form
      formFields={registerFields}
      render={({
        fields,
        handleChange,
        handleSubmit,
        handleCheckbox,
      }): JSX.Element => (
        <form className={classes.formColumn} onSubmit={handleSubmit}>
          <div className={classes.formRow}>
            <OutlinedInput
              className={classes.input}
              id="outlined"
              type={'text'}
              value={fields.firstname}
              placeholder="First Name"
              name="firstname"
              onChange={handleChange}
            />
            <OutlinedInput
              className={classes.input}
              id="outlined"
              type={'text'}
              value={fields.lastname}
              placeholder="Last Name"
              name="lastname"
              onChange={handleChange}
            />
          </div>
          <OutlinedInput
            className={classes.fullInput}
            id="outlined"
            type={'text'}
            value={fields.email}
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <OutlinedInput
            className={classes.fullInput}
            id="outlined"
            type={'text'}
            value={fields.userName}
            placeholder="User Name"
            name="username"
            onChange={handleChange}
          />
          <OutlinedInput
            className={classes.fullInput}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={fields.password}
            placeholder="New Password"
            name="password"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <OutlinedInput
            className={classes.fullInput}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={fields.passwordRepeat}
            placeholder="Confirm Password"
            name="passwordRepeat"
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={fields.rememberMe}
                color="primary"
                onChange={handleCheckbox}
                name="rememberMe"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" onClick={handleFieldView} data-key={0}>
                Sign In
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" onClick={handleFieldView} data-key={1}>
                Forgot Password?
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default RegisterFields;
