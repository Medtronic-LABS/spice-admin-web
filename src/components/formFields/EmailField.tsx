import { AxiosResponse } from 'axios';
import { FormApi } from 'final-form';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import APPCONSTANTS from '../../constants/appConstants';
import ApiError from '../../global/ApiError';
import styles from './TextInput.module.scss';

import { fetchUserByEmail } from '../../services/userAPI';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import { composeValidators, required, validateEmail } from '../../utils/validation';
import { IUserFormValues } from '../userForm/UserForm';
import TextInput from './TextInput';

const EmailField = forwardRef(
  (
    {
      isEdit,
      name,
      form,
      formName,
      index,
      parentOrgId,
      tenantId,
      enableAutoPopulate,
      onFindExistingUser
    }: {
      isEdit: boolean | undefined;
      name: string;
      form: FormApi<any>;
      formName: string;
      index: number;
      parentOrgId?: string;
      tenantId?: string;
      entityName?: string;
      enableAutoPopulate?: boolean;
      onFindExistingUser?: (user: any) => void;
    },
    ref
  ) => {
    const [disabled, setDisabled] = useState(false);
    const currentEmail = useRef(
      (() => {
        try {
          return form?.getState().values[formName][index].email;
        } catch (e) {
          console.error(e);
          return '';
        }
      })()
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validating, setValidating] = useState(!isEdit);
    const [isNetworkError, setNetworkError] = useState(false);
    const lastCheckedEmail = useRef<string>(currentEmail.current);
    const lastOrgId = useRef<string | undefined>(parentOrgId);
    const alreadyExistError = APPCONSTANTS.EMAIL_ALREADY_EXISTS_ERR_MSG;
    const emrError = APPCONSTANTS.EMR_ERR_MSG;
    const differentOrgError = APPCONSTANTS.EMAIL_ALREADY_EXISTS_IN_ORG_ERR_MSG;
    const duplicationError = APPCONSTANTS.EMAIL_DUPLICATION_ERR_MSG;

    useImperativeHandle(
      ref,
      () => ({
        resetEmailField: () => {
          lastCheckedEmail.current = '';
          setError('');
          setDisabled(false);
        }
      }),
      [setError, setDisabled]
    );

    const validateIsEmailExist = useCallback(
      () =>
        error ||
        (validating
          ? ' ' // blank space is given as error to block submition till the user already exist validation is completed
          : ''),
      [error, validating]
    );

    const validateDuplication = useCallback(
      (value: string) => {
        try {
          if (lastCheckedEmail.current !== value) {
            return '';
          }
          let smallestDuplicateIndex: number = -1;
          const users = form?.getState().values[formName];
          let count = 0;
          users.forEach(({ email }: IUserFormValues, i: number) => {
            if (email.toLowerCase() === value.toLowerCase()) {
              if (smallestDuplicateIndex < 0) {
                smallestDuplicateIndex = i;
              }
              count++;
            }
          });
          return count > 1 && smallestDuplicateIndex !== index ? duplicationError : '';
        } catch (e) {
          console.error(e);
        }
      },
      [form, formName, duplicationError, index]
    );

    const isValidEmail = (email?: string, checkSameEmailAgain?: boolean) => {
      return email && !validateEmail(email) && (lastCheckedEmail.current !== email || checkSameEmailAgain);
    };

    const fetchUserByEmailResFn = useCallback(
      (res: AxiosResponse<any>, email: string) => {
        const {
          data: { entity: data }
        } = res;
        if (enableAutoPopulate && data?.username === email) {
          onFindExistingUser?.(data);
          setDisabled(true);
          setError('');
        } else if (!enableAutoPopulate) {
          setError(data !== null ? alreadyExistError : '');
        } else if (!data?.username) {
          setError('');
        }
        setValidating(false);
        setLoading(false);
        lastCheckedEmail.current = email;
        form.change?.(`${name}.email`, email + ' '); // to trigger onchange space added
        form.change?.(`${name}.email`, email);
      },
      [alreadyExistError, enableAutoPopulate, form, name, onFindExistingUser]
    );

    const validateUser = useCallback(
      async (email: string, checkSameEmailAgain?: boolean) => {
        try {
          if (!isValidEmail(email, checkSameEmailAgain)) {
            return;
          }
          setValidating(true);
          setLoading(true);
          await fetchUserByEmail(email, parentOrgId, tenantId).then((res) => fetchUserByEmailResFn(res, email));
          setNetworkError(false);
        } catch (e: any) {
          setLoading(false);
          if (e instanceof ApiError && (e.statusCode === 406 || e.statusCode === 409 || e.statusCode === 400)) {
            let newError = '';
            if (e.statusCode === 400) {
              newError = emrError;
            } else if (e.statusCode === 406) {
              newError = differentOrgError;
            } else {
              newError = alreadyExistError;
            }
            setError(newError);
            form.change?.(`${name}.email`, email + ' '); // to trigger onchange space added
            form.change?.(`${name}.email`, email);
            lastCheckedEmail.current = email;
          } else {
            setNetworkError(true);
            lastCheckedEmail.current = '';
            toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, ''));
          }
        }
      },
      [parentOrgId, tenantId, fetchUserByEmailResFn, emrError, differentOrgError, alreadyExistError, form, name]
    );

    useEffect(() => {
      if (lastOrgId.current !== parentOrgId) {
        lastOrgId.current = parentOrgId;
        validateUser(currentEmail.current, true);
      }
    }, [parentOrgId, validateUser]);

    return (
      <Field
        name={`${name}.username`}
        type='text'
        validate={composeValidators(required, validateEmail, validateIsEmailExist, validateDuplication)}
        render={({ input, meta }: FieldRenderProps<string>) => {
          return (
            <TextInput
              {...input}
              onBlur={(event) => {
                input.onBlur(event);
                validateUser(input.value);
              }}
              onChange={(event) => {
                if (!(isEdit || disabled)) {
                  currentEmail.current = event.target.value.trim();
                  setNetworkError(false);
                  input.onChange(event);
                }
              }}
              lowerCase={true}
              showLoader={loading}
              label='Email ID'
              errorLabel={
                [alreadyExistError, emrError, differentOrgError, ' '].includes(meta.error) || isNetworkError
                  ? ''
                  : 'email ID'
              }
              disabled={isEdit || disabled}
              error={(isNetworkError ? 'Email ID is not validated.' : meta.touched && (meta.error || '')) || undefined}
              helpertext={
                isNetworkError ? (
                  <div>
                    <span className={styles.emailError} onClick={() => validateUser(input.value, true)}>
                      Validate email
                    </span>
                  </div>
                ) : (
                  <></>
                )
              }
            />
          );
        }}
      />
    );
  }
);

export default EmailField;
