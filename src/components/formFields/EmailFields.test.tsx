import React from 'react';
import { mount } from 'enzyme';
import TextInput from './TextInput';
import { Field, Form } from 'react-final-form';
import styles from './TextInput.module.scss';

describe('<Field />', () => {
  let wrapper:any;
  const props = {
    name: 'testField',
    isEdit: false,
    disabled: false,
    validateUser: jest.fn(),
    setNetworkError: jest.fn(),
    loading: false,
    currentEmail: { current: '' },
    alreadyExistError: '',
    emrError: '',
    differentOrgError: '',
    isNetworkError: false,
    onBlur: jest.fn(),
    value: 'test',
    formName: 'myForm',
    index: 0,
      form: {
        getState: jest.fn(),
        change: jest.fn(),
        batch: jest.fn(),
        blur: jest.fn(),
        destroyOnUnregister: true,
        focus: jest.fn(),
      },
      parentOrgId: '123',
      tenantId: '456',
      entityName: 'myEntity',
      enableAutoPopulate: true,
      onFindExistingUser: jest.fn(),
  };

  beforeAll(() => {
    wrapper = mount(
      <Form onSubmit={() => {}}>
      {() => (
        <form>
      <Field {...props}>
        {({ input, meta }) => (
          <TextInput
            {...input}
            onBlur={(event) => {
              input.onBlur(event);
              props.validateUser(input.value);
            }}
            onChange={(event) => {
              if (!(props.isEdit || props.disabled)) {
                props.currentEmail.current = event.target.value.trim();
                props.setNetworkError(false);
                input.onChange(event);
              }
            }}
            lowerCase={true}
            showLoader={props.loading}
            label='Email ID'
            errorLabel={
              [props.alreadyExistError, props.emrError, props.differentOrgError, ' '].includes(meta.error) || props.isNetworkError
                ? ''
                : 'email ID'
            }
            disabled={props.isEdit || props.disabled}
            error={
              (props.isNetworkError ? 'Email ID is not validated.' : meta.touched && (meta.error || '')) || undefined
            }
            helpertext={
              props.isNetworkError ? (
                <div>
                  <span className='emailError' onClick={() => props.validateUser(input.value, true)}>
                    Validate email
                  </span>
                </div>
              ) : (
                <></>
              )
            }
          />
        )}
      </Field>
      </form>
        )}
      </Form>
    );
  });

  it('should render a <Field /> component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should call validateUser function on blur', () => {
    const input = wrapper.find(TextInput);
    input.props().onBlur({ target: { value: 'test@example.com' } });
    expect(props.validateUser).toHaveBeenCalledTimes(1);
    expect(props.validateUser).toHaveBeenCalledWith('');
  });

  it('should call setNetworkError and onChange functions on change', () => {
    const input = wrapper.find(TextInput);
    const event = { target: { value: 'test@example.com' } };
    input.props().onChange(event);
    expect(props.currentEmail.current).toEqual('test@example.com');
    expect(props.setNetworkError).toHaveBeenCalledWith(false);
  });

  it('should render helpertext if isNetworkError is true', () => {
    wrapper.setProps({ isNetworkError: true });
    expect(wrapper.find(`.${styles.emailError}`)).toHaveLength(1);
    expect(wrapper.find(`.${styles.emailError}`).text()).toEqual('Email ID* ');
  });

  it('should not render helpertext if isNetworkError is false', () => {
    wrapper.setProps({ isNetworkError: false });
    expect(wrapper.find('.emailError')).toHaveLength(0);
  });
  
})