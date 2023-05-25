import { combineReducers } from 'redux';
import rootReducer from '../rootReducer';
import regionReducer from '../region/reducer';
import userReducer from '../user/reducer';
import accountReducer from '../account/reducer';
import operatingUnitReducer from '../operatingUnit/reducer';
import siteReducer from '../site/reducer';
import medicationReducer from '../medication/reducer';
import superAdminReducer from '../superAdmin/reducer';
import labtestReducer from '../labTest/reducer';
import programReducer from '../program/reducer';
import workflowReducer from '../workflow/reducer';

describe('rootReducer', () => {
  it('should combine all reducers correctly', () => {
    const appReducer = combineReducers({
      user: userReducer,
      region: regionReducer,
      medication: medicationReducer,
      account: accountReducer,
      operatingUnit: operatingUnitReducer,
      site: siteReducer,
      program: programReducer,
      superAdmin: superAdminReducer,
      labtest: labtestReducer,
      workflow: workflowReducer,
    });

    const initialState = {
      user: {},
      region: {},
      medication: {},
      account: {},
      operatingUnit: {},
      site: {},
      program: {},
      superAdmin: {},
      labtest: {},
      workflow: {},
    };

    const action = { type: 'SOME_ACTION' };

    const newState = rootReducer(initialState, action);
    const expectedState = appReducer(initialState as any, action) ;

    expect(newState).toEqual(expectedState);
  });

  it('should reset the store correctly', () => {
    const appReducer = combineReducers({
      user: userReducer,
      region: regionReducer,
      medication: medicationReducer,
      account: accountReducer,
      operatingUnit: operatingUnitReducer,
      site: siteReducer,
      program: programReducer,
      superAdmin: superAdminReducer,
      labtest: labtestReducer,
      workflow: workflowReducer,
    });

    const initialState = {
      user: {},
      region: {},
      medication: {},
      account: {},
      operatingUnit: {},
      site: {},
      program: {},
      superAdmin: {},
      labtest: {},
      workflow: {},
    };

    const resetAction = { type: 'RESET_STORE' };

    const newState = rootReducer(initialState, resetAction);
    const expectedState = appReducer(undefined, resetAction);

    expect(newState).toEqual(expectedState);
  });
});
