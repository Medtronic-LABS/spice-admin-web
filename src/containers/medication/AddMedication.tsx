import { FormApi, Tools } from 'final-form';
import React from 'react';
import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import MedicationForm, { ICheckDuplicateValidation, IMedicationDataFormValues } from './MedicationForm';
import FormContainer from '../../components/formContainer/FormContainer';
import { PROTECTED_ROUTES } from '../../constants/route';
import MedicationFormIcon from '../../assets/images/info-grey.svg';

import styles from './AddMedication.module.scss';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import APPCONSTANTS from '../../constants/appConstants';
import { AppState } from '../../store/rootReducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ICreateMedicationRequestPayload, IValidateMedication } from '../../store/medication/types';
import { createMedicationRequest, removeMedicationBrands, validateMedication } from '../../store/medication/actions';

export interface IMedicationFormValues {
  medication: IMedicationDataFormValues[];
}

interface IDispatchProps {
  createMedicationRequest: (data: ICreateMedicationRequestPayload) => void;
  validateMedication: (data: Omit<IValidateMedication, 'type'>) => void;
  removeMedicationBrands: () => void;
}

interface IRouteProps {
  history: History;
}

interface IStateProps {
  loading: boolean;
}

interface IMatchParams {
  regionId: string;
  tenantId: string;
}

interface IAddMedicationState {
  previousFieldValue: IMedicationDataFormValues[];
  internalFormState: Array<{ isValueChanged: boolean; isValid: boolean }>;
}

interface IMatchProps extends RouteComponentProps<IMatchParams> {}

type Props = IStateProps & IDispatchProps & IRouteProps & IMatchProps;

/**
 * Renders the form for create medication
 */
class AddMedication extends React.PureComponent<Props, IAddMedicationState> {
  private formInstance?: FormApi<IMedicationFormValues>;

  constructor(props: Props) {
    super(props);
    // previousFieldValue: contains all the field values except the last child row
    // internalFormState: contains the state of value changes and data validation
    this.state = {
      previousFieldValue: [] as IMedicationDataFormValues[],
      internalFormState: [] as Array<{ isValueChanged: boolean; isValid: boolean }>
    };
  }

  public render() {
    return (
      <div className={styles.addMedicationContainer}>
        <div className={`${styles.addMedicationWrapper} mx-auto pb-3dot125`}>
          <Form
            onSubmit={this.onSubmit}
            mutators={{
              ...arrayMutators,
              resetFields: this.resetFields
            }}
            render={({ handleSubmit, form }: FormRenderProps<IMedicationFormValues>) => {
              this.formInstance = form;
              const { previousFieldValue, internalFormState } = this.state;
              return (
                <form onSubmit={handleSubmit}>
                  <div className='row g-1dot25'>
                    <div className='col-12'>
                      <FormContainer label='Medication Details' icon={MedicationFormIcon}>
                        <MedicationForm
                          form={this.formInstance}
                          checkDuplicateValidation={this.checkDuplicateValidation}
                          previousFieldValue={previousFieldValue}
                          internalFormState={internalFormState}
                          setPreviousFieldValue={this.setPreviousFieldValue}
                          setInternalFormState={this.setInternalFormState}
                        />
                      </FormContainer>
                    </div>
                  </div>
                  <div className='col-12 mt-1dot25 d-flex'>
                    <button
                      type='button'
                      className='btn secondary-btn me-0dot625 px-1dot125 ms-auto'
                      onClick={this.onCancel}
                    >
                      Cancel
                    </button>
                    <button type='submit' className='btn primary-btn px-1dot75'>
                      Submit
                    </button>
                  </div>
                </form>
              );
            }}
          />
        </div>
      </div>
    );
  }

  /**
   * Sets the new field row value or Removes the specific field row values by index
   */
  private setPreviousFieldValue = (value: IMedicationDataFormValues | null, index: number, isRemove = false) => {
    const newFieldValues = [...this.state.previousFieldValue];
    if (isRemove) {
      newFieldValues.splice(index, 1);
    } else if (!isRemove && value) {
      newFieldValues[index] = value;
    }
    this.setState({ previousFieldValue: newFieldValues });
  };

  /**
   * Sets the new form state for value changes and validation or Removes the specific state by index
   */
  private setInternalFormState = (
    value: { isValueChanged: boolean; isValid: boolean } | null,
    index: number,
    isRemove = false
  ) => {
    const valueUpdates = [...this.state.internalFormState];
    if (isRemove) {
      valueUpdates.splice(index, 1);
      valueUpdates[valueUpdates.length - 1].isValid = false;
    } else if (!isRemove && value) {
      valueUpdates[index] = value;
    }
    this.setState({ internalFormState: valueUpdates });
  };

  /**
   * This function checks for duplicate data validation with existing form values and existing values in database
   */
  private checkDuplicateValidation = ({
    fields,
    index,
    isFirstChild,
    initialValue,
    isUpdate = false,
    isSubmitted = false,
    submitCb
  }: ICheckDuplicateValidation): void => {
    const { regionId } = this.props.match.params;
    const currentRecord = fields.value[index];
    // contains all the field values except the value of current index to check for duplicates.
    const oldRecords = fields.value.filter(
      (_record: IMedicationDataFormValues, fieldIndex: number) => fieldIndex !== index
    );

    // checks if current row values exists in the previous row values in the form
    const isRecordExists = oldRecords.some((record: IMedicationDataFormValues) => {
      let result: boolean;
      try {
        result =
          record.classification.classification.id === currentRecord.classification.classification.id &&
          record.brand.brand.id === currentRecord.brand.brand.id &&
          record.name.toLowerCase() === currentRecord.name.toLowerCase() &&
          record.dosage_form.id === currentRecord.dosage_form.id;
      } catch {
        result = false;
      }
      return result;
    });

    if (isRecordExists) {
      // shows popup if duplicate values entered in the form
      toastCenter.error(
        APPCONSTANTS.OOPS,
        APPCONSTANTS.MEDICATION_REENTERED_ERROR.replace('this medication', `"${currentRecord.name}"`)
      );
    } else if (isFirstChild || !isRecordExists) {
      const { tenantId } = this.props.match.params;
      // if all the form row values are unique then check if the current row values exists in the database
      const postData = {
        countryId: regionId,
        classificationId: currentRecord?.classification.classification.id,
        classificationName: currentRecord?.classification.classification.name,
        brandId: currentRecord?.brand.brand.id,
        brandName: currentRecord?.brand.brand.name,
        medicationName: currentRecord?.name,
        dosageFormId: currentRecord?.dosage_form.id,
        dosageFormName: currentRecord?.dosage_form.name,
        tenantId
      };
      this.props.validateMedication({
        data: postData,
        successCb: () => {
          // no duplicates found in the database
          if (!isUpdate && !isSubmitted) {
            fields.push({ ...initialValue });
            this.props.removeMedicationBrands();
          }
          this.setPreviousFieldValue(fields.value[index], index);
          this.setInternalFormState({ isValueChanged: false, isValid: true }, index);
          // if submitted and no duplicates found then the below callback
          submitCb?.();
        },
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.MEDICATION_EXISTS_ERROR));
        }
      });
    }
  };

  /**
   * Resets all the fields whose name contains given substring,
   * @param param0
   * @param state
   * @param utils
   */
  private resetFields = ([subStrOfKey]: [string], state: any, utils: Tools<IMedicationFormValues>) => {
    try {
      Object.keys(state.fields).forEach((key: string) => {
        if (key.includes(subStrOfKey)) {
          utils.resetFieldState(key);
        }
      });
    } catch (e) {
      toastCenter.error(APPCONSTANTS.OOPS, 'Error removing form');
    }
  };

  /**
   * Handler for form cancel
   */
  private onCancel = () => {
    this.goBackToMedication();
  };

  private goBackToMedication() {
    const url = PROTECTED_ROUTES.medicationByRegion;
    const { regionId, tenantId } = this.props.match.params;
    const medicationURL = url.replace(':regionId', regionId).replace(':tenantId', tenantId);
    this.props.history.push(medicationURL);
  }

  /**
   * Handler for form submition action and checks the validation
   * @param medication
   */
  private onSubmit = ({ medication: medicationValues }: IMedicationFormValues) => {
    const medication = medicationValues.map((medicationData: IMedicationDataFormValues) => ({
      ...medicationData,
      name: medicationData.name.trim()
    }));

    const { internalFormState } = this.state;
    const lastChildIndex = medication.length - 1;
    // contains the form state of all field rows except the last child
    const oldInternalFormState = internalFormState.filter((_value, index) => index !== lastChildIndex);
    // checks if any existing field value changed and not saved
    const isChangesNotConfirmed = oldInternalFormState.some((value) => value?.isValueChanged);
    if (isChangesNotConfirmed) {
      toastCenter.error(APPCONSTANTS.OOPS, APPCONSTANTS.UNSAVED_CHANGES_MESSAGE);
      return;
    }
    if (!internalFormState?.[lastChildIndex]?.isValid) {
      this.checkDuplicateValidation({
        fields: { value: medication },
        index: lastChildIndex,
        isFirstChild: medication.length === 1,
        initialValue: {},
        isUpdate: false,
        isSubmitted: true,
        submitCb: () => {
          // no duplicate data found so save to database
          this.saveMedication(medication);
        }
      });
    }
  };

  private saveMedication = (medication: IMedicationDataFormValues[]) => {
    const { regionId, tenantId } = this.props.match.params;
    const data = medication.map((medicationData: IMedicationDataFormValues) => ({
      countryId: regionId,
      classificationId: medicationData.classification.classification.id,
      classificationName: medicationData.classification.classification.name,
      brandId: medicationData.brand.brand.id,
      brandName: medicationData.brand.brand.name,
      medicationName: medicationData.name,
      dosageFormId: medicationData.dosage_form.id,
      dosageFormName: medicationData.dosage_form.name,
      tenantId
    }));

    this.props.createMedicationRequest({
      data,
      successCb: () => {
        this.goBackToMedication();
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.MEDICATION_CREATION_SUCCESS);
      },
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.MEDICATION_CREATION_ERROR))
    });
  };
}

const mapStateToProps = (state: AppState) => ({
  loading: state.medication.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createMedicationRequest: (data: ICreateMedicationRequestPayload) => dispatch(createMedicationRequest(data)),
  validateMedication: (data: Omit<IValidateMedication, 'type'>) => dispatch(validateMedication(data)),
  removeMedicationBrands: () => dispatch(removeMedicationBrands())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMedication);
