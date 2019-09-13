import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Chef Portfolio Project!</h1>
        <Route path="/register" component="" />
      </header>
    </div>
  );
}

export default App;
