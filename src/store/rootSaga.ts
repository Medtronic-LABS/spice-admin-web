import { all, fork } from 'redux-saga/effects';

import userSaga from './user/sagas';
import regionSaga from './region/sagas';
import medicationSaga from './medication/sagas';
import accountSaga from './account/sagas';
import siteSaga from './site/sagas';
import superAdminSaga from './superAdmin/sagas';
import operatingUnitSaga from './operatingUnit/sagas';
import labtestSaga from './labTest/sagas';
import programSaga from './program/sagas';
import workflowSaga from './workflow/sagas';

export function* rootSaga() {
  yield all([fork(userSaga)]);
  yield all([fork(regionSaga)]);
  yield all([fork(medicationSaga)]);
  yield all([fork(accountSaga)]);
  yield all([fork(siteSaga)]);
  yield all([fork(superAdminSaga)]);
  yield all([fork(operatingUnitSaga)]);
  yield all([fork(labtestSaga)]);
  yield all([fork(programSaga)]);
  yield all([fork(workflowSaga)]);
}
