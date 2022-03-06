import { Provider } from '@lyket/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <Provider apiKey="pt_3d23065a0bfe9a54fa2e27433da76e">
    <App />
  </Provider>,
  document.getElementById('root')
);