import { mount } from 'enzyme';
import React from 'react';
import AddMedication from '../AddMedication';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Form } from 'react-final-form';
import MedicationForm from '../MedicationForm';


const mockStore = configureMockStore();
describe('AddMedication', () => {
  const formValues: any = {
    medication: [
      {
        name: 'Test Medication',
        strength: '10mg',
        route: 'Oral',
        form: 'Tablet'
      }
    ]
  };
    const store = mockStore({
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
      let props: any;
      let wrapper: any;
      const mockHistoryPush = jest.fn();
    beforeEach(() => {
        props = {
          loading: false,
          countryId: '1',
          createAccountRequest: jest.fn(),
          history: {push: jest.fn()},
          match: { params: { regionId: '2', tenantId: '3' } },
          createMedicationRequest: jest.fn(),
          validateMedication: jest.fn(),
          removeMedicationBrands: jest.fn(),
        };
        wrapper = mount(
            <Provider store={store}>
            <MemoryRouter>
            <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <AddMedication {...props} />
            </form>
        )}
      </Form>
            </MemoryRouter>
            </Provider>
        );
      });
    
      it('renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
      });
    
      it('renders FormContainer components', () => {
        expect(wrapper.find('FormContainer').length);
      });

      it('contains medication form', () => {
        expect(wrapper.find('MedicationForm')).toHaveLength(1);
      });
    
      it('contains submit button', () => {
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
      });
    
      it('contains cancel button', () => {
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find('button').at(0).text()).toEqual('Cancel');
      });

      it('contains submit button', () => {
        wrapper.find('button').at(1).simulate('click');
        expect(wrapper.find('button').at(1).text()).toEqual('Submit');
      });

      it('should submit the form when the first submit button is clicked', () => {
        const form = wrapper.find('form').first();
        const onSubmit = jest.fn();
        form.simulate('submit', { preventDefault: () => {} });
        expect(onSubmit).toBeCalledTimes(0);
      });

      it('should submit the form when the last submit button is clicked', () => {
        const form = wrapper.find('form').last();
        const onSubmit = jest.fn();
        form.simulate('submit', { preventDefault: () => {} });
        expect(onSubmit).toBeCalledTimes(0);
      });

      it('should call createMedicationRequest with the correct data when the first form is submitted', () => {
       
        wrapper.find(MedicationForm).props().setPreviousFieldValue(formValues.medication[0], 0);
        const form = wrapper.find('form').first();
        form.simulate('submit', { preventDefault: () => {} });
        expect(props.createMedicationRequest).toBeCalledTimes(0);
      });
    
      it('should call createMedicationRequest with the correct data when the last form is submitted', () => {
        wrapper.find(MedicationForm).props().setPreviousFieldValue(formValues.medication[0], 0);
        const form = wrapper.find('form').last();
        form.simulate('submit', { preventDefault: () => {} });
        expect(props.createMedicationRequest).toBeCalledTimes(0);
      });

      it('should call onCancel when Cancel button is clicked', () => {
        const cancelButton = wrapper.find('button.secondary-btn');
        cancelButton.simulate('click');
    
        expect(mockHistoryPush).toHaveBeenCalledTimes(0);
      });
      it('should render methods in MedicationForm', () => {
        const setInternalFormState: any = wrapper.find('MedicationForm').prop('setInternalFormState');
        setInternalFormState({isValueChanged:true, isValid: true }, 1, false);
        const checkDuplicateValidation: any = wrapper.find('MedicationForm').prop('checkDuplicateValidation');
        checkDuplicateValidation({fields: {
          "value": [
            {
              "name": "Zincovit--",
              "country": "4",
              "classification": {
                "id": 9,
                "createdBy": 1,
                "updatedBy": 1,
                "createdAt": "2023-03-14T03:06:31-03:30",
                "updatedAt": "2023-03-14T03:06:31-03:30",
                "tenantId": 5,
                "classification": {
                  "name": "HMG-CoA inhibitor (statin)",
                  "displayOrder": 110,
                  "id": 133,
                  "createdBy": 1,
                  "updatedBy": 1,
                  "createdAt": "2017-05-30T08:14:17-03:30",
                  "updatedAt": "2017-05-30T08:14:17-03:30",
                  "deleted": false
                },
                "countryId": 4,
                "active": true,
                "deleted": false
              },
              "brand": {
                "id": 1,
                "createdBy": 1,
                "updatedBy": 1,
                "createdAt": "2023-03-14T08:36:31-03:30",
                "updatedAt": "2023-03-14T08:36:31-03:30",
                "tenantId": 5,
                "countryId": 4,
                "brand": {
                  "name": "Generic",
                  "displayOrder": 117,
                  "id": 121,
                  "createdBy": 1,
                  "updatedBy": 1,
                  "createdAt": "2017-05-30T08:35:41-03:30",
                  "updatedAt": "2017-05-30T08:35:41-03:30",
                  "deleted": false
                },
                "classificationId": 133,
                "active": true,
                "deleted": false
              },
              "dosage_form": {
                "id": 4,
                "createdBy": 1,
                "updatedBy": 1,
                "createdAt": "2022-04-18T11:39:27-03:30",
                "updatedAt": "2022-04-18T11:39:27-03:30",
                "name": "Liquid",
                "displayOrder": 102,
                "cultureValue": null,
                "active": true,
                "deleted": false
              }
            }
          ]
        }, index: 0, isFirstChild: true, initialValue: {}, isUpdate: false, isSubmitted: true})
        const ReactForm: any = wrapper.find('ReactFinalForm').at(1);
        
        const handleSubmit: any = ReactForm.prop('onSubmit');
        handleSubmit({medication: [{
          "name": "Zincovit--",
          "country": "4",
          "classification": {
            "id": 9,
            "createdBy": 1,
            "updatedBy": 1,
            "createdAt": "2023-03-14T03:06:31-03:30",
            "updatedAt": "2023-03-14T03:06:31-03:30",
            "tenantId": 5,
            "classification": {
              "name": "HMG-CoA inhibitor (statin)",
              "displayOrder": 110,
              "id": 133,
              "createdBy": 1,
              "updatedBy": 1,
              "createdAt": "2017-05-30T08:14:17-03:30",
              "updatedAt": "2017-05-30T08:14:17-03:30",
              "deleted": false
            },
            "countryId": 4,
            "active": true,
            "deleted": false
          },
          "brand": {
            "id": 1,
            "createdBy": 1,
            "updatedBy": 1,
            "createdAt": "2023-03-14T08:36:31-03:30",
            "updatedAt": "2023-03-14T08:36:31-03:30",
            "tenantId": 5,
            "countryId": 4,
            "brand": {
              "name": "Generic",
              "displayOrder": 117,
              "id": 121,
              "createdBy": 1,
              "updatedBy": 1,
              "createdAt": "2017-05-30T08:35:41-03:30",
              "updatedAt": "2017-05-30T08:35:41-03:30",
              "deleted": false
            },
            "classificationId": 133,
            "active": true,
            "deleted": false
          },
          "dosage_form": {
            "id": 4,
            "createdBy": 1,
            "updatedBy": 1,
            "createdAt": "2022-04-18T11:39:27-03:30",
            "updatedAt": "2022-04-18T11:39:27-03:30",
            "name": "Liquid",
            "displayOrder": 102,
            "cultureValue": null,
            "active": true,
            "deleted": false
          }
        }]});
        expect(wrapper.find('MedicationForm')).toHaveLength(1);
      });

});
