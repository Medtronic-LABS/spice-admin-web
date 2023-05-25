import APPCONSTANTS from '../../../constants/appConstants';
import { IBaseFieldMeta } from '../types/BaseFieldMeta';

export const visibilityOptions = [
  { ...APPCONSTANTS.VALIDITY_OPTIONS.gone },
  { ...APPCONSTANTS.VALIDITY_OPTIONS.visible }
];

export const InputTypes = {
  PHONE_NUMBER: 3,
  NUMBER: 2,
  DECIMAL: 8192,
  DEFAULT: -1
};

export const unitMeasurementOptions = [
  { label: 'mmol/L', key: 'mmol/L' },
  { label: 'mg/dL', key: 'mg/dL' }
];

export const baseFieldMeta: IBaseFieldMeta = {
  family: {
    label: 'Family',
    order: 1.0,
    options: [
      { label: 'Bio Data', key: 'bioData' },
      { label: 'Biometrics', key: 'bioMetrics' },
      { label: 'Pressure', key: 'bpLog' },
      { label: 'Glucose', key: 'glucoseLog' },
      { label: 'Mental Health', key: 'phq4' }
    ],
    component: 'SELECT_INPUT'
  },
  fieldName: {
    order: 1.2,
    type: 'text',
    label: 'Field Name',
    required: true,
    component: 'TEXT_FIELD'
  },
  title: {
    order: 1.3,
    label: 'Display Name',
    type: 'text',
    required: true,
    component: 'TEXT_FIELD'
  },
  isSummary: { order: 0, label: 'Shown In Summary', component: 'CHECKBOX' },
  action: { order: 1.6, label: 'Action', type: 'text', required: false, component: 'TEXT_FIELD' },
  unitMeasurement: {
    order: 2,
    label: 'Unit Measurement',
    options: unitMeasurementOptions,
    component: 'SELECT_INPUT'
  },
  minValue: { order: 2.1, label: 'Min Value', type: 'number', required: true, component: 'TEXT_FIELD' },
  maxValue: { order: 2.2, label: 'Max Value', type: 'number', required: true, component: 'TEXT_FIELD' },
  minLength: { order: 2.3, label: 'Min Length', type: 'number', required: true, component: 'TEXT_FIELD' },
  maxLength: { order: 2.4, label: 'Max Length', type: 'number', required: true, component: 'TEXT_FIELD' },
  contentLength: { order: 2.5, label: 'Field Length', type: 'number', required: true, component: 'TEXT_FIELD' },
  pulseMinValue: { order: 2.6, label: 'Min Pulse Value', type: 'number', required: true, component: 'TEXT_FIELD' },
  pulseMaxValue: { order: 2.7, label: 'Max Pulse Value', type: 'number', required: true, component: 'TEXT_FIELD' },
  inputType: {
    order: 1.3,
    label: 'Input Type',
    options: [
      { key: InputTypes.PHONE_NUMBER, label: 'Phone number' },
      { key: InputTypes.NUMBER, label: 'Number' },
      { key: InputTypes.DECIMAL, label: 'Decimal values' },
      { key: InputTypes.DEFAULT, label: 'Text' }
    ],
    required: true,
    component: 'SELECT_INPUT'
  },
  orientation: {
    order: 4.0,
    label: 'Orientation',
    options: [
      { label: 'Horizontal', key: '0' },
      { label: 'Vertical', key: '1' }
    ],
    component: 'SELECT_INPUT'
  },
  optionsList: {
    order: 5.1,
    label: 'Options',
    component: 'OPTION_LIST'
  },
  defaultValue: {
    order: 5.2,
    label: 'Default Value',
    required: false,
    labelKey: 'name',
    valueKey: 'id',
    component: 'SELECT_INPUT'
  },
  totalCount: {
    order: 2.8,
    label: 'Total Count',
    options: [
      { key: 2, label: '2' },
      { key: 3, label: '3' }
    ],
    component: 'SELECT_INPUT'
  },
  mandatoryCount: {
    order: 2.9,
    label: 'Mandatory Count',
    options: [
      { key: 1, label: '1' },
      { key: 2, label: '2' },
      { key: 3, label: '3' }
    ],
    component: 'SELECT_INPUT'
  },
  localDataCache: {
    order: 7.0,
    label: 'Location Data Cache',
    type: 'text',
    required: false,
    component: 'TEXT_FIELD'
  },
  dependentID: {
    order: 8.0,
    label: 'Dependent ID',
    type: 'text',
    required: false,
    component: 'TEXT_FIELD'
  },
  isNeededDefault: {
    order: 8.1,
    label: 'Is Needed Default',
    type: 'text',
    required: false,
    component: 'TEXT_FIELD'
  },
  visibility: {
    order: 9,
    label: 'Visibility',
    options: visibilityOptions,
    component: 'SELECT_INPUT'
  },
  hint: { order: 10, label: 'Placeholder', type: 'text', required: false, component: 'TEXT_FIELD' },
  startValue: {
    order: 11.0,
    label: 'Start Value',
    type: 'sliderValue',
    required: true,
    component: 'TEXT_FIELD'
  },
  endValue: {
    order: 11.1,
    label: 'End Value',
    type: 'sliderValue',
    required: true,
    component: 'TEXT_FIELD'
  },
  interval: {
    order: 11.2,
    label: 'Interval',
    type: 'interval',
    required: true,
    component: 'TEXT_FIELD'
  },
  errorMessage: { order: 12, label: 'Error Message', type: 'text', required: false, component: 'TEXT_FIELD' },
  isAboveUpperLimit: { order: 13, label: 'Is Above Upper Limit', component: 'CHECKBOX' },
  selectAll: { order: 14.0, label: 'Select All Options', component: 'CHECKBOX' },
  isMandatory: { order: 14.1, label: 'Is Mandatory', component: 'CHECKBOX' },
  isEnabled: { order: 15, label: 'Is Enabled', component: 'CHECKBOX' },
  disableFutureDate: { order: 15.1, label: 'Disable Future Dates', component: 'CHECKBOX' },
  isNeedAction: { order: 15.2, label: 'Action Needed', component: 'CHECKBOX' },
  isNew: { order: 0, label: 'isNew', component: 'CHECKBOX' },
  isEditable: { order: 15.3, label: 'Is Editable', component: 'CHECKBOX' },
  instructions: { order: 15.4, label: 'Instructions', component: 'INSTRUCTIONS' },
  condition: { order: 16.0, label: 'Condition', component: 'CONDITION_CONFIG' },
  familyOrder: {
    order: 0,
    type: 'number',
    label: 'FamilyOrder',
    component: 'TEXT_FIELD'
  }
};
