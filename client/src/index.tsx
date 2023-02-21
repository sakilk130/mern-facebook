import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactModal from 'react-modal';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import './styles/icons/icons.css';

const el = document.getElementById('root') as HTMLElement;
ReactModal.setAppElement(el);

const root = ReactDOM.createRoot(el);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
