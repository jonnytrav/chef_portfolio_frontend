import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
// Importing components
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import MyRecipes from './components/Recipes';
import AllRecipes from './components/AllRecipes';
import NewPost from './components/NewPost';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      {/* Nav bar */}
      <Nav />
      <header className="App-header">
        {/* Component Routes */}
        <Route exact path="/" component={HomePage} />
        <Route path="/recipes" component={AllRecipes} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {/* <Route path="/myrecipes" component={MyRecipes} /> */}
        {/* <Route path="/newpost" component={NewPost} /> */}

        {/* protected routes */}
        <PrivateRoute path="/myrecipes" component={MyRecipes} />
        <PrivateRoute path="/newpost" component={NewPost} />
      </header>
    </div>
  );
}

export default App;
