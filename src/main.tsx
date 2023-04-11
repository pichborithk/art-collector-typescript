import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './scss/index.scss';

import App from './App';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
