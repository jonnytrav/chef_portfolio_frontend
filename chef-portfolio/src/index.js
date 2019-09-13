import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Implementing react router
import { BrowserRouter as Router } from 'react-router-dom';

//ReactStrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Redux section
// import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

//testing
function reducer() {
  return {
    title: "Hello world! I'm in the Redux store!"
  };
}
const store = createStore(reducer);
//testing

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
