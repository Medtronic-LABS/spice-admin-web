import { Field } from 'react-final-form';
import TextInput from '../../components/formFields/TextInput';
import CustomTooltip from '../../components/tooltip';
import APPCONSTANTS from '../../constants/appConstants';
import { composeValidators, isEmpty, validatePassword } from '../../utils/validation';
import styles from './Authentication.module.scss';
import ShowPasswordIcon from '../../assets/images/showPass.svg';
import HidePasswordIcon from '../../assets/images/hidePass.svg';
import TickIcon from '../../assets/images/tick.svg';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import commonPassword from '../../utils/Common_Passwords';

export const generatePassword = (password: string) => {
  const hmac = CryptoJS.HmacSHA512(password, process.env.REACT_APP_PASSWORD_HASH_KEY as string);
  return hmac.toString(CryptoJS.enc.Hex);
};

export const ResetPasswordFields = ({ email, setSubmitEnabled }: { email: string; setSubmitEnabled?: any }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkUsername = (password: string) => {
    if (isEmpty(password)) {
      return APPCONSTANTS.ENTER_PASSWORD;
    } else if (email?.split('@')[0] === password) {
      return APPCONSTANTS.PASSWORD_SHOULD_NOT_MATCH_ACC_NAME;
    } else if (commonPassword.includes(password)) {
      return APPCONSTANTS.COMMON_PASSWORDS_ARE_NOT_ALLOWED;
    }
  };

  const setShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!isShowConfirmPassword);
  };

  const validatePasswordMatch = (value: string, allValues: any) => {
    setSubmitEnabled?.(false);
    if (isEmpty(value)) {
      setSubmitEnabled?.(false);
      return APPCONSTANTS.ENTER_CONFIRM_PASSWORD;
    } else if (value !== allValues.password) {
      setSubmitEnabled?.(false);
      return APPCONSTANTS.CONFIRM_PASSWORD_SHOULD_MATCH;
    } else if (value) {
      setSubmitEnabled?.(true);
    }
    return '';
  };

  const handleShowPasswordText = () => (isShowPassword ? 'Hide password' : 'Show password');

  const handleShowPasswordIcon = () => (isShowPassword ? HidePasswordIcon : ShowPasswordIcon);

  const handleShowTickIcon = (meta: any) => (
    <img className={`${styles.tickIcon} ${meta.error ? 'invisible' : 'visible'}`} src={TickIcon} alt='tick-icon' />
  );

  const handleIsError = (input: any, meta: any) =>
    input.value ? meta.dirty && meta.error : meta.initial && meta.error;

  return (
    <>
      <div className={styles.togglePassword}>
        <Field
          name='password'
          type={isShowPassword ? 'text' : 'password'}
          validate={composeValidators(validatePassword, checkUsername)}
          render={({ input, meta }) => (
            <CustomTooltip title={APPCONSTANTS.PASSWORD_RULE}>
              <TextInput
                {...input}
                label='New Password'
                placeholder='Enter New Password'
                error={handleIsError(input, meta)}
                className={styles.passwordBox}
              />
              {handleShowTickIcon(meta)}
              <img
                className={styles.eyeIcon}
                title={handleShowPasswordText()}
                src={handleShowPasswordIcon()}
                onClick={setShowPassword}
                alt={handleShowPasswordText()}
              />
            </CustomTooltip>
          )}
        />
      </div>
      <div className={styles.togglePassword}>
        <Field
          name='confirmPassword'
          type={isShowConfirmPassword ? 'text' : 'password'}
          validate={composeValidators(validatePassword, validatePasswordMatch)}
          render={({ input: newIn, meta }) => (
            <div>
              <TextInput
                {...newIn}
                placeholder='Re-enter New Password'
                label='Confirm New Password'
                errorLabel=''
                error={handleIsError(newIn, meta)}
                className={styles.passwordBox}
              />
              {handleShowTickIcon(meta)}
              <img
                className={styles.eyeIcon}
                title={isShowConfirmPassword ? 'Hide password' : 'Show password'}
                src={isShowConfirmPassword ? HidePasswordIcon : ShowPasswordIcon}
                onClick={toggleShowConfirmPassword}
                alt={isShowConfirmPassword ? 'Hide password' : 'Show password'}
              />
            </div>
          )}
        />
      </div>
    </>
  );
};

export default ResetPasswordFields;
