import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import logo from '../../assets/images/app-logo.svg';
import { AppState } from '../../store/rootReducer';
import { info } from '../../utils/toastCenter';
import styles from './Authentication.module.scss';
import APPCONSTANTS from '../../constants/appConstants';
import { getUserName, resetPassword, createPasswordRequest } from '../../store/user/actions';
import { PUBLIC_ROUTES } from '../../constants/route';
import { Form } from 'react-final-form';
import ResetPasswordFields, { generatePassword } from './ResetPasswordFields';

interface IDispatchProps {
  createPassword: ({
    email,
    password,
    token,
    successCB
  }: {
    email: string;
    password: string;
    token: string;
    successCB: () => void;
  }) => void;
  getUserName: ({ token, successCB }: { token: string; successCB: () => void }) => void;
  resetPassword: ({
    email,
    password,
    token,
    successCB
  }: {
    email: string;
    password: string;
    token: string;
    successCB: () => void;
  }) => void;
}

interface IStateProps {
  isPasswordSet: boolean;
  email: string;
}

interface IRouteProps extends RouteComponentProps<{ token: string }> {}

type Props = IRouteProps & IDispatchProps & IStateProps;

interface IResetPasswordState {
  isResetPassword: boolean;
  token: string;
  isShowPassword: boolean;
  isShowConfirmPassword: boolean;
}
class ResetPassword extends React.PureComponent<Props, IResetPasswordState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isResetPassword: false,
      token: '',
      isShowPassword: false,
      isShowConfirmPassword: false
    };
  }

  componentDidMount() {
    const url = this.props.history.location.search;
    const params = new URLSearchParams(url);
    const isResetPassword = Boolean(params.get('reset_password'));
    this.setState({ isResetPassword });
    let canRequest: boolean = true;
    if (isResetPassword) {
      const expiresValue = params.get('expires');
      const expiresTime = Number(expiresValue);
      if (expiresTime < new Date().getTime()) {
        canRequest = false;
        info('', APPCONSTANTS.LINK_EXPIRED);
        this.backToLogin();
      }
    }
    if (canRequest) {
      this.getUsername();
    }
  }

  backToLogin = () => {
    this.props.history.push({ pathname: PUBLIC_ROUTES.login });
  };

  getUsername = () => {
    const { token } = this.props.match.params;
    this.setState({ token });
    this.props.getUserName({ token, successCB: this.showToast });
  };

  showToast = () => {
    const { isResetPassword } = this.state;
    if (this.props.isPasswordSet && isResetPassword) {
      info('', APPCONSTANTS.LINK_EXPIRED);
      this.backToLogin();
    } else if (this.props.isPasswordSet) {
      info('', APPCONSTANTS.ACCOUNT_ALREADY_ACTIVATED);
      this.backToLogin();
    }
  };

  onSubmitForm = (values: any) => {
    const email = values.email;
    const password = generatePassword(values.password);
    const { token, isResetPassword } = this.state;
    if (isResetPassword) {
      this.props.resetPassword({
        email,
        password,
        token,
        successCB: this.backToLogin
      });
    } else {
      this.props.createPassword({
        email,
        password,
        token,
        successCB: this.backToLogin
      });
    }
  };

  render() {
    const { email } = this.props;
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginFormContainer}>
          <div className={`${styles.brand} text-center`}>
            <img src={logo} alt='Medtronics' />
          </div>
          <div className={`primary-title text-center ${styles.loginTitle}`}>Reset your password</div>
          <Form
            onSubmit={this.onSubmitForm}
            initialValues={{ email }}
            render={({ handleSubmit, form }) => {
              const formState = form.getState();
              return (
                <form onSubmit={handleSubmit}>
                  <ResetPasswordFields email={email} />
                  <button disabled={!formState?.valid} type='submit' className='mt-2 btn primary-btn w-100'>
                    Submit
                  </button>
                </form>
              );
            }}
          />
          <div className={styles.backToLoginFooter} onClick={this.backToLogin}>
            <Link to={PUBLIC_ROUTES.login}>Go to login page</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IStateProps => ({
  isPasswordSet: state.user.isPasswordSet,
  email: state.user.email
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createPassword: ({
    email,
    password,
    token,
    successCB
  }: {
    email: string;
    password: string;
    token: string;
    successCB: () => void;
  }) => dispatch(createPasswordRequest({ email, password }, token, successCB)),
  getUserName: ({ token, successCB }: { token: string; successCB: () => void }) =>
    dispatch(getUserName(token, successCB)),
  resetPassword: ({
    email,
    password,
    token,
    successCB
  }: {
    email: string;
    password: string;
    token: string;
    successCB: () => void;
  }) => dispatch(resetPassword({ email, password, token, successCB }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
