import React from 'react';
import ReactDom from 'react-dom';

import './index.css';

import App from './components/App/index';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDom.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
)