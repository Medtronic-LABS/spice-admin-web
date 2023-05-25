import { combineReducers } from 'redux';

import regionReducer from './region/reducer';
import userReducer from './user/reducer';
import accountReducer from './account/reducer';
import operatingUnitReducer from './operatingUnit/reducer';
import siteReducer from './site/reducer';
import medicationReducer from './medication/reducer';
import superAdminReducer from './superAdmin/reducer';
import labtestReducer from './labTest/reducer';
import programReducer from './program/reducer';
import workflowReducer from './workflow/reducer';

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
  workflow: workflowReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};
export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
