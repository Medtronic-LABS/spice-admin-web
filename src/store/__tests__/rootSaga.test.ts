import { all, fork } from 'redux-saga/effects';
import { rootSaga } from '../rootSaga';
import userSaga from '../user/sagas';
import regionSaga from '../region/sagas';
import medicationSaga from '../medication/sagas';
import accountSaga from '../account/sagas';
import siteSaga from '../site/sagas';
import superAdminSaga from '../superAdmin/sagas';
import operatingUnitSaga from '../operatingUnit/sagas';
import labtestSaga from '../labTest/sagas';
import programSaga from '../program/sagas';
import workflowSaga from '../workflow/sagas';

describe('rootSaga', () => {
  it('should run all the sagas', () => {
    const generator = rootSaga();
    
    expect(generator.next().value).toEqual(all([fork(userSaga)]));
    expect(generator.next().value).toEqual(all([fork(regionSaga)]));
    expect(generator.next().value).toEqual(all([fork(medicationSaga)]));
    expect(generator.next().value).toEqual(all([fork(accountSaga)]));
    expect(generator.next().value).toEqual(all([fork(siteSaga)]));
    expect(generator.next().value).toEqual(all([fork(superAdminSaga)]));
    expect(generator.next().value).toEqual(all([fork(operatingUnitSaga)]));
    expect(generator.next().value).toEqual(all([fork(labtestSaga)]));
    expect(generator.next().value).toEqual(all([fork(programSaga)]));
    expect(generator.next().value).toEqual(all([fork(workflowSaga)]));
    expect(generator.next().done).toBe(true);
  });
});
