import React, { useEffect } from 'react';

import useGlobal from '../store';

// import Nav from '../components/Nav';

const mapRecipes = recipes => {
  return recipes.map(repo => (
    <div key={repo.id} className="container list">
      <h3>{repo.title}</h3>
      <p>{repo.meal_type}</p>
      <p>{repo.ingredients}</p>
      <div className="crud-container">
        <button className="crud-buttons">Edit</button>
        <button className="crud-buttons">Delete</button>
      </div>
    </div>
  ));
};

const Recipes = () => {
  //similar to componentDidMount
  useEffect(() => {
    globalActions.getRecipes();
  }, []);

  const [globalState, globalActions] = useGlobal();
  const { status, recipes } = globalState;
  return (
    <div>
      {status === 'LOADING' && <h4>Loading...</h4>}
      {status === 'SUCCESS' && mapRecipes(recipes)}
      {status === 'EMPTY' && <h4>You have zero posts</h4>}
      {status === 'NOT_FOUND' && <h4>404 - User not found</h4>}
      {status === 'ERROR' && <h4 className="container list">Unauthorized</h4>}
    </div>
  );
};

export default Recipes;
