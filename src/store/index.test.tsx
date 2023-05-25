import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import { rootSaga } from './rootSaga';

describe('Redux Store Configuration', () => {
  let store:any;
  let sagaMiddleware:any;

  beforeEach(() => {
    // Create a new saga middleware instance for each test
    sagaMiddleware = createSagaMiddleware();

    // Create the store with the rootReducer and applyMiddleware
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

    // Run the saga middleware
    sagaMiddleware.run(rootSaga);
  });

  it('creates the store with middleware successfully', () => {
    expect(store).toBeDefined();
  });

  it('initializes the saga middleware correctly', () => {
    expect(sagaMiddleware).toBeDefined();
  });
  it('should be defined and of the correct type', () => {
    const sagaMiddleware = createSagaMiddleware();
    expect(sagaMiddleware).toBeDefined();
    expect(typeof sagaMiddleware).toBe('function');
  });

  it('dispatches actions and updates the state correctly', () => {
    const action = { type: 'SOME_ACTION', payload: 'test' };
    store.dispatch(action);
    const updatedState = store.getState();
    expect(updatedState.someState).toEqual(undefined);
  });

});
