import { FormApi } from 'final-form';
import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import SuperAdminForm from './SuperAdminForm';
import FormContainer from '../../components/formContainer/FormContainer';
import { PROTECTED_ROUTES } from '../../constants/route';
import InforIcon from '../../assets/images/info-grey.svg';
import { ISuperAdminFormValues } from '../../store/superAdmin/types';
import APPCONSTANTS from '../../constants/appConstants';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import Loader from '../../components/loader/Loader';
import { AppState } from '../../store/rootReducer';
import { createSuperAdmin } from '../../store/superAdmin/actions';
import { resetFields } from '../../utils/commonUtils';

interface IDispatchProps {
  createSuperAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: ISuperAdminFormValues[];
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => void;
}

interface IStateProps {
  loading: boolean;
}

type Props = RouteComponentProps & IDispatchProps & IStateProps;

/**
 * Renders the form for super admin creation
 */
class CreateSuperAdmin extends React.Component<Props> {
  private formInstance?: FormApi<{ superAdmins: ISuperAdminFormValues[] }>;
  public render() {
    const { loading, history }: any = this.props;

    return (
      <>
        {loading && <Loader />}
        <Form
          onSubmit={this.onSubmit}
          mutators={{
            ...arrayMutators,
            resetFields
          }}
          render={({ handleSubmit, form }: FormRenderProps<{ superAdmins: ISuperAdminFormValues[] }>) => {
            this.formInstance = form;
            return (
              <form onSubmit={handleSubmit}>
                <div className='col-lg-12 col-12'>
                  <FormContainer label='Super Admin Details' icon={InforIcon}>
                    <SuperAdminForm form={this.formInstance} />
                  </FormContainer>
                </div>
                <div className='col-12 mt-1dot25 d-flex'>
                  <button
                    type='button'
                    className='btn secondary-btn me-0dot625 px-1dot125 ms-auto'
                    onClick={history.goBack}
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
      </>
    );
  }

  /**
   * Handler for form submition action
   * @param values
   */
  private onSubmit = ({ superAdmins }: { superAdmins: ISuperAdminFormValues[] }) => {
    const data: ISuperAdminFormValues[] = superAdmins.map(
      (superAdmin) =>
        ({
          ...superAdmin,
          firstName: superAdmin.firstName.trim(),
          lastName: superAdmin.lastName.trim(),
          timezone: { id: superAdmin.timezone.id },
          username: superAdmin.email,
          is_super_admin: true
        } as ISuperAdminFormValues)
    );
    this.props.createSuperAdmin({
      data,
      successCb: () => {
        this.props.history.push(PROTECTED_ROUTES.superAdmin);
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.SUPER_ADMIN_CREATE_SUCCESS);
      },
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.SUPER_ADMIN_CREATE_FAIL))
    });
  };
}

const mapStateToProps = (state: AppState) => ({
  loading: state.superAdmin.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createSuperAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: ISuperAdminFormValues[];
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => dispatch(createSuperAdmin({ data, successCb, failureCb }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSuperAdmin);
