import { FormApi, Tools } from 'final-form';
import React from 'react';
import { History } from 'history';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import RegionForm from './RegionForm';
import FormContainer from '../../components/formContainer/FormContainer';
import { ISelectOption } from '../../components/formFields/SelectInput';
import APPCONSTANTS from '../../constants/appConstants';
import { PROTECTED_ROUTES } from '../../constants/route';
import { AppState } from '../../store/rootReducer';
import { createRegionRequest } from '../../store/region/actions';
import { ICreateRegionRequestPayload } from '../../store/region/types';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import RegionFormIcon from '../../assets/images/info-grey.svg';
import RegionAdminFormIcon from '../../assets/images/avatar-o.svg';
import Loader from '../../components/loader/Loader';
import UserForm, { IUserFormValues } from '../../components/userForm/UserForm';

export interface IRegionFormValues {
  region: {
    name: string;
    countryCode: string;
    geographicFields: ISelectOption;
    unitMeasurement: ISelectOption;
    algorithms: ISelectOption;
    tenantId?: string;
  };
  users: IUserFormValues[];
}

interface IRouteProps {
  history: History;
}

interface IDispatchProps {
  createRegionRequest: (data: ICreateRegionRequestPayload) => void;
}

interface IStateProps {
  loading: boolean;
}

type Props = IStateProps & IDispatchProps & IRouteProps;

/**
 * Renders the form for region creation
 */
class CreateRegion extends React.Component<Props> {
  private formInstance?: FormApi<IRegionFormValues>;
  public render() {
    const { loading } = this.props;
    return (
      <>
        <Form
          onSubmit={this.onSubmit}
          mutators={{
            ...arrayMutators,
            resetFields: this.resetFields
          }}
          render={({ handleSubmit, form }: FormRenderProps<IRegionFormValues>) => {
            this.formInstance = form;
            return (
              <form onSubmit={handleSubmit}>
                <div className='row g-1dot25'>
                  <div className='col-lg-6 col-12'>
                    <FormContainer label='Region Details' icon={RegionFormIcon}>
                      <RegionForm />
                    </FormContainer>
                  </div>
                  <div className='col-lg-6 col-12'>
                    <FormContainer label='Region Admin' icon={RegionAdminFormIcon}>
                      <UserForm form={this.formInstance} isDropdownDisable={true} />
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
                {loading && <Loader isFullScreen={loading} className='translate-x-minus50' />}
              </form>
            );
          }}
        />
      </>
    );
  }

  /**
   * Resets all the fields whose name contains given substring,
   * @param param0
   * @param state
   * @param utils
   */
  private resetFields = ([subStrOfKey]: [string], state: any, utils: Tools<IRegionFormValues>) => {
    try {
      Object.keys(state.fields).forEach((key: string) => {
        if (key.includes(subStrOfKey)) {
          utils.resetFieldState(key);
        }
      });
    } catch (e) {
      console.error('Error removing form', e);
    }
  };

  /**
   * Handler for form cancel
   */
  private onCancel = () => {
    this.props.history.push(PROTECTED_ROUTES.regionDashboard);
  };

  /**
   * Handler for form submition action
   * @param values
   */
  private onSubmit = ({ region, users }: IRegionFormValues) => {
    const unitValue = region.unitMeasurement?.value || 'metric';

    // to be changed when working on Create Region
    const data = {
      ...region,
      unitMeasurement: unitValue,
      users: users.map((user) => ({
        ...user,
        firstName: user.firstName.trim(),
        lastName: user.lastName.trim(),
        username: user.email,
        timezone: { id: user.timezone.id }
      }))
    };
    this.props.createRegionRequest({
      data,
      successCb: () => {
        this.props.history.push(PROTECTED_ROUTES.regionDashboard);
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.REGION_CREATION_SUCCESS);
      },
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.REGION_CREATION_ERROR))
    });
  };
}

const mapStateToProps = (state: AppState) => ({
  loading: state.region.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createRegionRequest: (data: ICreateRegionRequestPayload) => dispatch(createRegionRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRegion);
