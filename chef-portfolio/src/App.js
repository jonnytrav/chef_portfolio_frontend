import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      {/* Nav bar */}
      <Nav />
      <header className="App-header">
        <h1>Welcome to Chef Portfolio Project!</h1>
        <Route path="/register" component="" />
      </header>
    </div>
  );
}

export default App;
