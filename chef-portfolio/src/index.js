import React from 'react';
import ReactDOM from 'react-dom';
//reset styling
import './reset.css';
import './index.css';
import App from './App';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Implementing react router
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,

  document.getElementById('root')
);
