import React from 'react';
import { Field, Form } from 'react-final-form';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/images/app-logo.svg';
import showPass from '../../assets/images/showPass.svg';
import hidePass from '../../assets/images/hidePass.svg';
import TextInput from '../../components/formFields/TextInput';
import Checkbox from '../../components/formFields/Checkbox';
import { composeValidators, required, validateEmail } from '../../utils/validation';
import { loginRequest } from '../../store/user/actions';
import { AppState } from '../../store/rootReducer';
import localStorageServices from '../../global/localStorageServices';
import { decryptData } from '../../utils/commonUtils';
import APPCONSTANTS from '../../constants/appConstants';
import styles from './Authentication.module.scss';
import { PUBLIC_ROUTES } from '../../constants/route';
import { ILoginRequestPayload } from '../../store/user/types';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';

interface IStateProps {
  loggingIn: boolean;
}

interface IDispatchProps {
  loginRequest: (payload: ILoginRequestPayload) => void;
}

interface ILoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ILoginState {
  isShowPassword: boolean;
}

type Props = IStateProps & IDispatchProps;

/**
 * Component that handles the user login
 */
class Login extends React.Component<Props, ILoginState> {
  private initialFormValues?: ILoginForm;
  public constructor(props: Props) {
    super(props);
    const username = localStorageServices.getItem(APPCONSTANTS.USERNAME);
    const password = localStorageServices.getItem(APPCONSTANTS.PASSWORD);
    if (username && password) {
      this.initialFormValues = {
        email: username,
        password: decryptData(password),
        rememberMe: true
      };
    }
    this.state = {
      isShowPassword: false
    };
  }

  public componentWillUnmount() {
    toastCenter.dismissAllToast();
  }

  public render() {
    const { isShowPassword } = this.state;
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginFormContainer}>
          <div className={`${styles.brand} text-center`}>
            <Logo aria-labelledby='Medtronic' />
          </div>
          <div className='primary-title text-center'>
            <b>Welcome</b>
          </div>
          <div className={`primary-title text-center ${styles.loginTitle}`}>Login to your account</div>
          <Form
            onSubmit={this.onSubmit}
            initialValues={this.initialFormValues}
            render={({ handleSubmit, valid }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name='email'
                  type='text'
                  validate={composeValidators(required, validateEmail)}
                  render={({ input, meta }) => (
                    <TextInput
                      {...input}
                      label='Email'
                      errorLabel='email'
                      error={(meta.touched && meta.error) || undefined}
                    />
                  )}
                />
                <div className={styles.togglePassword}>
                  <Field
                    name='password'
                    type={isShowPassword ? 'text' : 'password'}
                    validate={required}
                    render={({ input, meta }) => (
                      <TextInput
                        {...input}
                        label='Password'
                        errorLabel='password'
                        error={(meta.touched && meta.error) || undefined}
                        className={styles.passwordBox}
                      />
                    )}
                  />
                  <img
                    className={styles.eyeIcon}
                    title={isShowPassword ? 'Hide password' : 'Show password'}
                    src={isShowPassword ? hidePass : showPass}
                    onClick={this.setShowPassword}
                    alt={isShowPassword ? 'Hide password' : 'Show password'}
                  />
                </div>
                <div className='d-flex align-items-center justify-content-between mt-1'>
                  <div>
                    <Field
                      name='rememberMe'
                      type='checkbox'
                      render={({ input }) => <Checkbox label='Remember me' {...input} />}
                    />
                  </div>
                  <div className={`link-text ${styles.forgotPassword}`}>
                    <Link to={PUBLIC_ROUTES.forgotPassword}>Forgot password?</Link>
                  </div>
                </div>
                <button disabled={!valid || this.props.loggingIn} type='submit' className='mt-2 btn primary-btn w-100'>
                  Login
                </button>
              </form>
            )}
          />
        </div>
      </div>
    );
  }

  /**
   * Submit handler for the login form
   * @param { email: string; password: string; } param0
   */
  private onSubmit = ({
    email,
    password,
    rememberMe = false
  }: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    this.props.loginRequest({
      username: email,
      password,
      rememberMe,
      failureCb: (e: Error) => {
        toastCenter.error(
          ...getErrorToastArgs(
            e,
            APPCONSTANTS.LOGIN_FAILED_TITLE,
            e?.message === APPCONSTANTS.INVALID_CREDENTIALS ? e.message : APPCONSTANTS.LOGIN_FAILED_MESSAGE
          )
        );
      }
    });
  };

  private setShowPassword = () => {
    this.setState((prevState) => ({
      isShowPassword: !prevState.isShowPassword
    }));
  };
}

const mapStateToProps = (state: AppState): IStateProps => ({
  loggingIn: state.user.loggingIn
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loginRequest: (payload: ILoginRequestPayload) => dispatch(loginRequest(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
