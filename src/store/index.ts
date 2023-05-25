import { compose,createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import { rootSaga } from './rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create devtools extension for development
const composeEnhancer: typeof compose =
  (process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Mount it on the Store
const store = createStore(rootReducer,  composeEnhancer(applyMiddleware(sagaMiddleware)));

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
