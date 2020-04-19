import React from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormFields } from 'components/form/interfaces';
import Form from 'components/form';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    width: '100%',
    margin: '7px 0',
    padding: '10px 20px',
  },
}));

const SignInFields: React.FC<any> = ({
  showPassword,
  handleClickShowPassword,
  handleFieldView,
}) => {
  const classes = useStyles();
  const signinFields: FormFields = {
    username: '',
    password: '',
    rememberMe: false,
  };
  return (
    <Form
      formFields={signinFields}
      render={({
        fields,
        handleChange,
        handleSubmit,
        handleCheckbox,
      }): JSX.Element => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <OutlinedInput
            className={classes.input}
            id="outlined"
            type={'text'}
            value={fields.username}
            placeholder="User Name"
            name="username"
            onChange={handleChange}
          />
          <OutlinedInput
            className={classes.input}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={fields.password}
            placeholder="Password"
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
              <Link variant="body2" onClick={handleFieldView} data-key={1}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" onClick={handleFieldView} data-key={2}>
                <>Don&apos;t have an account? Sign Up</>
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default SignInFields;
