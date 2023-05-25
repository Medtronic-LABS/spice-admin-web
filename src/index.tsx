import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import 'bootstrap';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import { setupInterceptors } from './global/interceptors';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import sessionStorageServices from './global/sessionStorageServices';
import { addToken } from './store/user/actions';
import APPCONSTANTS from './constants/appConstants';

const secretToken = sessionStorageServices.getItem(APPCONSTANTS.SECRET_TOKEN);

if (!!secretToken) {
  store.dispatch(addToken(secretToken));
  sessionStorageServices.setItem(APPCONSTANTS.AUTHTOKEN, secretToken);
}
sessionStorageServices.deleteItem(APPCONSTANTS.SECRET_TOKEN);

setupInterceptors(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
