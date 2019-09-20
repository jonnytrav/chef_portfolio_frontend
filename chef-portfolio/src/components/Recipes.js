import React, { useEffect } from 'react';

import useGlobal from '../store';

//Component to map over the recipes array
const mapRecipes = (recipes, globalActions) => {
  return recipes.map(repo => (
    <div key={repo.id} className="container list">
      <h3>{repo.title}</h3>
      <p>{repo.meal_type}</p>
      <p>{repo.ingredients}</p>
      <div className="crud-container">
        <button className="crud-buttons">Edit</button>
        <button
          onClick={e => {
            e.preventDefault();
            console.log('from delete clcik', repo.id);
            globalActions.recipes.deletePost(repo.id);
          }}
          className="crud-buttons"
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

//actual component being render and exported
const Recipes = () => {
  const [globalState, globalActions] = useGlobal();
  const { status, myrecipes } = globalState;

  //similar to componentDidMount
  useEffect(() => {
    globalActions.recipes.getRecipes();

    //set en empty array to prevent inifite loop
  }, []);

  return (
    //render base on the current status
    <div>
      {status === 'LOADING' && <h4>Loading...</h4>}
      {status === 'SUCCESS' && mapRecipes(myrecipes, globalActions)}
      {status === 'EMPTY' && <h4>You have zero posts</h4>}
      {status === 'NOT_FOUND' && <h4>404 - User not found</h4>}
      {status === 'ERROR' && <h4 className="container list">Unauthorized</h4>}
    </div>
  );
};

export default Recipes;
