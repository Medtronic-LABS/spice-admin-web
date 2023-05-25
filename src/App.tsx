import { useEffect } from 'react';
import ReactGa from 'react-ga';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Loader from './components/loader/Loader';
import Header from './components/header/Header';
import { AppRoutes } from './routes';
import {
  authTokenSelector,
  getIsLoggedInSelector,
  getIsLoggingInSelector,
  getIsLoggingOutSelector,
  initializingSelector,
  loadingSelector
} from './store/user/selectors';
import './App.scss';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import sessionStorageServices from './global/sessionStorageServices';
import APPCONSTANTS from './constants/appConstants';

const App = () => {
  const loggingIn = useSelector(getIsLoggingInSelector);
  const loggedIn = useSelector(getIsLoggedInSelector);
  const loggingOut = useSelector(getIsLoggingOutSelector);
  const loading = useSelector(loadingSelector);
  const initializingApp = useSelector(initializingSelector);
  const token = useSelector(authTokenSelector);
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGa.initialize(process.env.REACT_APP_GA_TRACKING_ID as string);

    /**
     * to report the page view
     * pathname is the current url location pathname
     */
    ReactGa.pageview(pathname);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      if (token && Boolean(sessionStorageServices.getItem('iLi'))) {
        sessionStorageServices.setItem(APPCONSTANTS.SECRET_TOKEN, token);
      }
      return null;
    });
  }, [token]);

  return (
    <div className='app-container'>
      {loggedIn ? <Header /> : null}
      <div className={`app-body ${loggedIn ? 'logged-in' : ''}`}>
        {loggingIn || loggingOut || loading || initializingApp ? <Loader /> : null}
        <ErrorBoundary pathname={pathname}>
          <AppRoutes />
        </ErrorBoundary>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
