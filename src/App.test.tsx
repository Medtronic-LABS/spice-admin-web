import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import App from './App';


const mockStore = configureMockStore();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000"
  })
}));

jest.mock('react-ga', () => ({
  initialize: jest.fn(),
  pageview: jest.fn(),
}));

jest.mock('../../assets/images/app-logo.svg', () => ({
  ReactComponent: 'Logo'
}));
describe('App Component', () => {
  
  beforeEach(() => {
    process.env.REACT_APP_GA_TRACKING_ID = 'UA-220096139-1';
  });
  
  afterEach(() => {
    delete process.env.REACT_APP_GA_TRACKING_ID;
  });
  const initialState = {
    user:{
      loggingIn: false,
      loggedIn: true
    }
  };
  const store = mockStore(initialState);
  
  it('should render without errors', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
  });
});