import React from 'react';
import { Provider } from 'react-redux';
import arrayMutators from 'final-form-arrays';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import MedicationForm from "../MedicationForm"
import { Form } from 'react-final-form';

jest.mock('react-router-dom', () => ({
    useParams: jest.fn().mockReturnValue({ match: { params: { regionId: '2'} } }),
    useHistory: () => ({
        push: jest.fn(),
      })
  }));
const mockStore = configureMockStore();
describe('MedicationForm', () => {

    let wrapper: any;
    let props: any;
    let store = mockStore({
        medication:{
            loading:false,
            brandsLoading: false,
            classificationsLoading: false,
            dosageFormsLoading:false,
            classifications:[
                {
                    id: '1',
                    name: 'Class One'
                  },
                  {
                    id: '2',
                    name: 'Class Two'
                  }
            ],
            dosageForms:[
                {
                    id: '1',
                    name: 'Dosage One'
                  },
                  {
                    id: '2',
                    name: 'Dosage Two'
                  }
            ]
        }
    })
    
    beforeEach(() => {   
        props = {
            form: { getFieldState: jest.fn(), getState: jest.fn().mockReturnValue({valid: true}) },
            match: { params: { regionId: '2', tenantId: '3' } }
          }; 
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <Form onSubmit={() => {}} mutators={{ ...arrayMutators }}>
                    {({ handleSubmit }) => <MedicationForm {...props}/>}
                    </Form>
                </MemoryRouter>
            </Provider>
        );
      });
    it('renders without errors', () => {
        expect(wrapper.exists()).toBe(true);
      });

    it('should render the form with the medication name and site select fields', () => {
        expect(wrapper.find('input[name="medication[0].name"]').exists()).toBe(true); 
        wrapper.find('.theme-text.lh-1dot25.pb-lg-1').simulate('click');
    });
})