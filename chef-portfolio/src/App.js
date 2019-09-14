import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
// Importing components
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Recipes from './components/Recipes';

function App() {
  return (
    <div className="App">
      {/* Nav bar */}
      <Nav />
      <header className="App-header">
        {/* Component Routes */}
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/recipes" component={Recipes} />
      </header>
    </div>
  );
}

export default App;
