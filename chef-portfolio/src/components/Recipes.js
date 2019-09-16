import React, { useEffect } from 'react';

import useGlobal from '../store';

const mapRecipes = recipes => {
  return recipes.map(repo => (
    <div key={repo.id}>
      <h3>{repo.title}</h3>
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
    <div className="container">
      {status === 'LOADING' && <h4>Loading...</h4>}
      {status === 'SUCCESS' && mapRecipes(recipes)}
      {status === 'EMPTY' && <h4>You have zero posts</h4>}
      {status === 'NOT_FOUND' && <h4>404 - User not found</h4>}
      {status === 'ERROR' && <h4>Unauthorized</h4>}
    </div>
  );
};

export default Recipes;
