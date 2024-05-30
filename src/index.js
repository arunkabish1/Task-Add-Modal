import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import EventDetailsModal from './EventDetailsModal';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <EventDetailsModal />
  </Provider>,
  document.getElementById('root')
);
