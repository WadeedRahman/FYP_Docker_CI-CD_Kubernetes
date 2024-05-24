/*import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'



ReactDOM.createRoot(document.getElementById('root')).render(
 
  
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
 
);*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </Provider>,
  document.getElementById('root')
);





