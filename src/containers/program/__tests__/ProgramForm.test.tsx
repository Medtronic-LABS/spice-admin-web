import React from 'react';
import { Form } from 'react-final-form';
import { Config, FieldConfig, FieldState, FieldSubscriber, FieldSubscription, FormApi, FormState, FormSubscriber, FormSubscription, Unsubscribe } from 'final-form';
import ProgramForm from '../ProgramForm';
import { IProgramFormValues } from '../../../store/program/types';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount, ReactWrapper } from 'enzyme';

const mockStore = configureMockStore();

const mockFormApi: FormApi<{ program: IProgramFormValues }, Partial<{ program: IProgramFormValues }>> = {
  batch: () => { },
  blur: () => { },
  change: () => { },
  destroyOnUnregister: false,
  focus: function (name: 'program'): void {
    throw new Error('Function not implemented.');
  },
  initialize: function (data: Partial<{ program: IProgramFormValues; }> | ((values: { program: IProgramFormValues; }) => Partial<{ program: IProgramFormValues; }>)): void {
    throw new Error('Function not implemented.');
  },
  isValidationPaused: function (): boolean {
    throw new Error('Function not implemented.');
  },
  getFieldState: function <F extends 'program'>(field: F): FieldState<{ program: IProgramFormValues; }[F]> | undefined {
    throw new Error('Function not implemented.');
  },
  getRegisteredFields: function (): string[] {
    throw new Error('Function not implemented.');
  },
  getState: function (): FormState<{ program: IProgramFormValues; }, Partial<{ program: IProgramFormValues; }>> {
    throw new Error('Function not implemented.');
  },
  pauseValidation: function (): void {
    throw new Error('Function not implemented.');
  },
  registerField: function <F extends 'program'>(name: F, subscriber: FieldSubscriber<{ program: IProgramFormValues; }[F]>, subscription: FieldSubscription, config?: FieldConfig<{ program: IProgramFormValues; }[F]> | undefined): Unsubscribe {
    throw new Error('Function not implemented.');
  },
  reset: function (initialValues?: Partial<{ program: IProgramFormValues; }> | undefined): void {
    throw new Error('Function not implemented.');
  },
  resetFieldState: function (name: 'program'): void {
    throw new Error('Function not implemented.');
  },
  restart: function (initialValues?: Partial<{ program: IProgramFormValues; }> | undefined): void {
    throw new Error('Function not implemented.');
  },
  resumeValidation: function (): void {
    throw new Error('Function not implemented.');
  },
  setConfig: function <K extends keyof Config<object, object>>(name: K, value: Config<{ program: IProgramFormValues; }, Partial<{ program: IProgramFormValues; }>>[K]): void {
    throw new Error('Function not implemented.');
  },
  submit: function (): Promise<{ program: IProgramFormValues; } | undefined> | undefined {
    throw new Error('Function not implemented.');
  },
  subscribe: function (subscriber: FormSubscriber<{ program: IProgramFormValues; }, Partial<{ program: IProgramFormValues; }>>, subscription: FormSubscription): Unsubscribe {
    throw new Error('Function not implemented.');
  },
  mutators: {}
};
describe('ProgramForm', () => {
  const mockTenantId = 'mockTenantId';
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  

  it('should render the form with the program name and site select fields', async () => {
    const store = mockStore({
      site: {
        siteDropdownOptions: {
          list: [
            {
              id: '12',
              name: 'name',
              tenantId: '1'
            }
          ],
    regionTenantId: '123'
        }
      } 
  });
  wrapper = mount(
      <Provider store={store}>
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
           <ProgramForm form={mockFormApi} tenantId={mockTenantId} />
          </form>
        )}
      </Form>
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input[name="program.name"]').exists()).toBe(true);
    expect(wrapper.find('[type="text"]').exists()).toBe(true);
  });
});
