import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/app-logo.svg';
import TextInput from '../../components/formFields/TextInput';
import { AppState } from '../../store/rootReducer';
import { composeValidators, required, validateEmail } from '../../utils/validation';
import styles from './Authentication.module.scss';
import { forgotPasswordRequest } from '../../store/user/actions';
import { PUBLIC_ROUTES } from '../../constants/route';

interface IRouteProps {
  history: History;
}

interface IDispatchProps {
  forgotPassword: ({ email, successCB }: { email: string; successCB: () => void }) => void;
}

type Props = IDispatchProps & IRouteProps;
class ForgotPassword extends React.Component<Props, {}> {
  onSubmitForm = (values: any) => {
    this.props.forgotPassword({ email: values.email, successCB: this.backToLogin });
  };

  backToLogin = () => {
    this.props.history.push({ pathname: '/' });
  };

  render() {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginFormContainer}>
          <div className={`${styles.brand} text-center`}>
            <img src={logo} alt='Medtronics' />
          </div>
          <div className={`primary-title text-center ${styles.loginTitle}`}>Forgot Password</div>
          <Form
            onSubmit={this.onSubmitForm}
            render={({ handleSubmit }) => (
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
                <button type='submit' className='mt-2 btn primary-btn w-100'>
                  Submit
                </button>
              </form>
            )}
          />
          <div className={styles.backToLoginFooter}>
            <Link to={PUBLIC_ROUTES.login}>Go to login page</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (_state: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  forgotPassword: ({ email, successCB }: { email: string; successCB: () => void }) =>
    dispatch(forgotPasswordRequest({ email, successCB }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
