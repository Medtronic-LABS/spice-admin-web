import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import arrayMutators from 'final-form-arrays';
import { FormApi } from 'final-form';
import { Field } from 'react-final-form';

import CustomTable from '../../components/customtable/CustomTable';
import DetailCard from '../../components/detailCard/DetailCard';
import {
  createRegionAdmin,
  fetchRegionDetailReq,
  updateRegionAdmin,
  updateRegionDetail,
  deleteRegionAdmin,
  decactivateRegionReq
} from '../../store/region/actions';
import toastCenter, { getErrorToastArgs } from '../../utils/toastCenter';
import APPCONSTANTS from '../../constants/appConstants';
import Loader from '../../components/loader/Loader';
import {
  IDeactivateReqPayload,
  IDeleteRegionAdminPayload,
  IFetchRegionDetailReqPayload,
  IRegionAdmin,
  IRegionAdminAddPayload,
  IRegionDetail,
  IRegionInfo
} from '../../store/region/types';
import Modal from '../../components/modal/ModalForm';
import { AppState } from '../../store/rootReducer';
import RegionForm, { unitMeasurementOptions } from '../createRegion/RegionForm';
import { ITimezone, roleType } from '../../store/user/types';
import { composeValidators, required } from '../../utils/validation';
import SelectInput from '../../components/formFields/SelectInput';
import TextAreaInput from '../../components/formFields/TextAreaInput';
import InfoIcon from '../../assets/images/Info-blue.svg';
import { PROTECTED_ROUTES } from '../../constants/route';
import UserForm from '../../components/userForm/UserForm';
import { IRegionFormValues } from '../createRegion/CreateRegion';

interface IMatchParams {
  regionId: string;
  tenantId: string;
}

export interface IMatchProps extends RouteComponentProps<IMatchParams> {}

export interface IDispatchProps {
  fetchRegionDetailReq: (data: IFetchRegionDetailReqPayload) => void;
  updateRegionDetail: ({
    data,
    successCb,
    failureCb
  }: {
    data: IRegionInfo;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => void;
  updateRegionAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IRegionAdminAddPayload;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => void;
  createRegionAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IRegionAdminAddPayload;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => void;
  deleteRegionAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IDeleteRegionAdminPayload;
    successCb: () => void;
    failureCb: (e: Error) => void;
  }) => void;
  decactivateRegionReq: (payload: IDeactivateReqPayload) => void;
}

export interface IStateProps {
  loading: boolean;
  detail: IRegionDetail;
  timezoneList: ITimezone[];
  role: roleType;
}

export interface IRegionDetailState {
  isOpenAdminModal: boolean;
  isOpenRegionModal: boolean;
  adminInitialValues: IRegionAdmin;
  isAdd: boolean;
  isOpenDeactivateModal: boolean;
}

type Props = IMatchProps & IDispatchProps & IStateProps;
/**
 * Shows the region detail
 * Provides search feature in admin
 * Provides edit feature for admin and region basic detail
 */
class RegionDetail extends React.PureComponent<Props, IRegionDetailState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenAdminModal: false,
      isOpenRegionModal: false,
      adminInitialValues: {} as IRegionAdmin,
      isAdd: false,
      isOpenDeactivateModal: false
    };
  }

  componentDidMount() {
    this.getRegionDetail();
  }

  renderModalForm = () => {
    return this.state.isOpenDeactivateModal ? (
      <div className='row gx-1dot25'>
        <div className='col-sm-6 col-12'>
          <Field
            name='reason'
            type='text'
            validate={composeValidators(required)}
            render={({ input, meta }) => (
              <SelectInput
                {...(input as any)}
                label='Reason'
                errorLabel='reason'
                options={APPCONSTANTS.DEACTIVATE_REASON}
                error={(meta.touched && meta.error) || undefined}
              />
            )}
          />
        </div>
        <div className='col-12'>
          <Field
            name='reason_description'
            type='text'
            render={({ input, meta }) => (
              <TextAreaInput
                {...input}
                label='Describe the reason in detail'
                error={(meta.touched && meta.error) || undefined}
                rows={3}
              />
            )}
          />
        </div>
        <div className='d-inline-flex'>
          <span className='pe-0dot75'>
            <img src={InfoIcon} alt='info-icon' />
          </span>
          <span className='deactivateInfo'>
            Deactivating the region will no longer let the region admin and their subordinates access the region and its
            data but you can reactivate the region anytime back from the profile menu.{' '}
          </span>
        </div>
      </div>
    ) : (
      <RegionForm isEdit={true} />
    );
  };

  public render() {
    const { loading, detail, role } = this.props;
    const { isOpenAdminModal, adminInitialValues, isOpenRegionModal, isAdd, isOpenDeactivateModal } = this.state;
    const isReadOnly = role !== APPCONSTANTS.ROLES.SUPER_ADMIN && role !== APPCONSTANTS.ROLES.SUPER_USER;
    return (
      <>
        {loading && <Loader />}
        <div className='row g-0dot625'>
          <div className='col-12'>
            <DetailCard
              buttonLabel={isReadOnly ? undefined : 'Edit Region'}
              isEdit={true}
              header='Region Summary'
              onButtonClick={this.openRegionEditModal}
            >
              <div className='row gy-1 mt-0dot25 mb-1dot25 mx-0dot5'>
                {this.getSummaryDetails().map(({ label, value }) => (
                  <div key={label} className='col-lg-4 col-sm-6'>
                    <div className='fs-0dot875 charcoal-grey-text'>{label}</div>
                    <div className='primary-title text-ellipsis'>{value || '--'}</div>
                  </div>
                ))}
              </div>
            </DetailCard>
          </div>
          <div className='col-12'>
            <DetailCard
              buttonLabel={isReadOnly ? undefined : 'Add Region Admin'}
              header='Region Admin'
              isSearch={true}
              onSearch={this.handleSearch}
              searchPlaceholder={APPCONSTANTS.SEARCH_BY_NAME_EMAIL}
              onButtonClick={this.openAddModal}
            >
              <CustomTable
                rowData={detail.users || []}
                columnsDef={[
                  {
                    id: 1,
                    name: 'firstName',
                    label: 'Name',
                    width: '125px',
                    cellFormatter: this.formatName
                  },
                  { id: 2, name: 'username', label: 'Email ID', width: '220px' },
                  {
                    id: 3,
                    name: 'gender',
                    label: 'Gender',
                    width: '110px'
                  },
                  {
                    id: 5,
                    name: 'phoneNumber',
                    label: 'Contact Number',
                    width: '140px',
                    cellFormatter: this.formatPhone
                  }
                ]}
                isEdit={!isReadOnly}
                isDelete={!isReadOnly}
                onRowEdit={this.openEditModal}
                onDeleteClick={this.handleAdminDeleteClick}
                confirmationTitle={APPCONSTANTS.REGION_ADMIN_DELETE_CONFIRMATION}
                deleteTitle={APPCONSTANTS.REGION_ADMIN_DELETE_TITLE}
              />
            </DetailCard>
          </div>
          <Modal
            show={isOpenAdminModal}
            title={`${isAdd ? 'Add' : 'Edit'} Region Admin`}
            cancelText='Cancel'
            submitText='Submit'
            handleCancel={this.handleCancelClick}
            handleFormSubmit={this.handleAdminSubmit}
            initialValues={adminInitialValues}
            render={this.regionAdminFormRenderer}
            mutators={{ ...arrayMutators }}
          />
          <Modal
            show={isOpenRegionModal}
            title={isOpenDeactivateModal ? 'Deactivate Region' : 'Edit Region'}
            cancelText='Cancel'
            submitText={isOpenDeactivateModal ? 'Confirm Deactivation' : 'Submit'}
            handleCancel={this.handleCancelClick}
            handleFormSubmit={!isOpenDeactivateModal ? this.handleRegionFormSubmit : this.handleDeactivate}
            initialValues={!isOpenDeactivateModal ? { region: detail } : {}}
            /* Need to enable for region deactivate option */
            // deactivateLabel={!isOpenDeactivateModal ? 'Deactivate Region' : ''}
            // handleDeactivate={this.showDeactivateModal}
            // isDeactivateModal={isOpenDeactivateModal}
          >
            {this.renderModalForm()}
          </Modal>
        </div>
      </>
    );
  }

  /**
   * Getter for the formatted summary details
   * @param search
   */
  private getSummaryDetails = () => {
    const {
      detail: { name, countryCode, unitMeasurement }
    } = this.props;
    return [
      { label: 'Region Name', value: name },
      { label: 'Country Code', value: countryCode && `+${countryCode}` },
      {
        label: 'Unit Measurement',
        value: unitMeasurementOptions.find((units) => units.value === unitMeasurement)?.label || '--'
      }
    ];
  };

  /**
   * Loads the region detail
   */
  private getRegionDetail = (search?: string) => {
    const { regionId, tenantId } = this.props.match.params;
    this.props.fetchRegionDetailReq({
      tenantId,
      id: regionId,
      searchTerm: search,
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.REGION_DETAIL_FETCH_ERROR))
    });
  };

  /**
   * Handler for search region admin
   * @param search search string
   */
  private handleSearch = (search: string) => {
    this.getRegionDetail(search);
  };

  /**
   * Generates the full name using first name and last name
   * @param user
   * @returns
   */
  private formatName = (user: IRegionAdmin) => {
    return `${user.firstName} ${user.lastName}`;
  };

  /**
   * Formats the phone number with country code
   * @param user
   * @returns
   */
  private formatPhone = (user: IRegionAdmin) => {
    return `+${user.countryCode} ${user.phoneNumber}`;
  };

  /**
   * Renderer for region Admin Add Edit Form
   * @param values
   */
  private regionAdminFormRenderer = (form?: FormApi<any>) => {
    return (
      <UserForm
        form={form as FormApi<any>}
        initialEditValue={this.state.adminInitialValues}
        disableOptions={true}
        isEdit={!this.state.isAdd}
        isDropdownDisable={true}
      />
    );
  };

  /**
   * Handler to open region admin edit modal
   * @param values
   */
  private openEditModal = (values: IRegionAdmin) => {
    this.setState({ isOpenAdminModal: true, adminInitialValues: values });
  };

  /**
   * Handler to open region edit modal with prepopulated values
   */
  private openRegionEditModal = () => {
    this.setState({ isOpenRegionModal: true });
  };

  /**
   * Handle for modal cancel
   */
  private handleCancelClick = () => {
    this.setState({
      isOpenAdminModal: false,
      isOpenRegionModal: false,
      adminInitialValues: {} as IRegionAdmin,
      isOpenDeactivateModal: false,
      isAdd: false
    });
  };

  /**
   * Handler for admin create modal
   */
  private openAddModal = () => {
    this.setState({
      isOpenAdminModal: true,
      isAdd: true,
      adminInitialValues: {} as IRegionAdmin
    });
  };

  /**
   * Handler for add/edit admin form submit.
   * @param values
   */
  private handleAdminSubmit = ({ users }: { users: any }) => {
    const { isAdd } = this.state;
    const { tenantId, id } = this.props.detail;
    const values = users[0];
    const data = {
      ...values,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      username: values.username,
      tenantId,
      timezone: { id: Number(values.timezone.id) },
      country: { id: Number(id) }
    };
    if (isAdd) {
      this.props.createRegionAdmin({
        data,
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.REGION_ADMIN_CREATE_SUCCESS);
          this.handleCancelClick();
          this.getRegionDetail();
        },
        failureCb: (e) =>
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.REGION_ADMIN_CREATE_FAIL))
      });
    } else {
      values.tenantId = tenantId;
      this.props.updateRegionAdmin({
        data,
        successCb: () => {
          toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.REGION_ADMIN_UPDATE_SUCCESS);
          this.handleCancelClick();
          this.getRegionDetail();
        },
        failureCb: (e) => {
          toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.REGION_ADMIN_UPDATE_FAIL));
        }
      });
    }
  };

  /**
   * Handler for region edit form submit.
   * @param values
   */
  private handleRegionFormSubmit = (values: IRegionFormValues) => {
    const data = JSON.parse(JSON.stringify(values));
    delete data.region.users;
    const unitValue =
      typeof values?.region?.unitMeasurement === 'string'
        ? values.region.unitMeasurement
        : values.region.unitMeasurement.value;
    data.region.unitMeasurement = unitValue || 'metric';
    data.region.name = data.region.name.trim();
    this.props.updateRegionDetail({
      data: data.region,
      successCb: () => {
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.REGION_UPDATE_SUCCESS);
        this.handleCancelClick();
      },
      failureCb: (e) => toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.OOPS, APPCONSTANTS.REGION_UPDATE_FAIL))
    });
  };

  /**
   * Handler for admin delete action
   * @param values
   */
  private handleAdminDeleteClick = (values: { data: IRegionDetail; index: number }) => {
    const { tenantId } = this.props.detail;
    this.props.deleteRegionAdmin({
      data: { id: values.data.id, tenantId },
      successCb: () => {
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.REGION_ADMIN_DELETE_SUCCESS);
        this.getRegionDetail();
      },
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.REGION_ADMIN_DELETE_FAIL))
    });
  };

  /**
   * Handler to show the region deactivate modal
   */
  //  private showDeactivateModal = () => {
  //   this.setState({ isOpenDeactivateModal: true });
  // };

  private handleDeactivate = () => {
    const { tenantId } = this.props.detail;
    this.props.decactivateRegionReq({
      tenantId,
      successCb: () => {
        toastCenter.success(APPCONSTANTS.SUCCESS, APPCONSTANTS.REGION_DEACTIVATE_SUCCESS);
        this.props.history.push(PROTECTED_ROUTES.regionDashboard);
      },
      failureCb: (e) =>
        toastCenter.error(...getErrorToastArgs(e, APPCONSTANTS.ERROR, APPCONSTANTS.REGION_DEACTIVATE_FAIL))
    });
  };
}

const mapStateToProps = (state: AppState): IStateProps => ({
  loading: state.region.loading,
  timezoneList: state.user.timezoneList,
  detail: state.region.detail,
  role: state.user.user.role
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRegionDetailReq: (data: IFetchRegionDetailReqPayload) => dispatch(fetchRegionDetailReq(data)),
  updateRegionDetail: ({
    data,
    successCb,
    failureCb
  }: {
    data: IRegionInfo;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => dispatch(updateRegionDetail({ data, successCb, failureCb })),
  updateRegionAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IRegionAdminAddPayload;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => dispatch(updateRegionAdmin({ data, successCb, failureCb })),
  createRegionAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IRegionAdminAddPayload;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => dispatch(createRegionAdmin({ data, successCb, failureCb })),
  deleteRegionAdmin: ({
    data,
    successCb,
    failureCb
  }: {
    data: IDeleteRegionAdminPayload;
    successCb?: () => void;
    failureCb?: (error: Error) => void;
  }) => dispatch(deleteRegionAdmin({ data, successCb, failureCb })),
  decactivateRegionReq: (payload: IDeactivateReqPayload) => dispatch(decactivateRegionReq(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionDetail);
