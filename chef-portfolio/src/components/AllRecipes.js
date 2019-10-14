import React, { useEffect } from 'react';

//reactstrap
import { Spinner } from 'reactstrap';

import useGlobal from '../store';

const mapRecipes = recipes => {
  // console.log('From all recipes component: ', recipes);
  return recipes.map(repo => (
    <div key={repo.id} className="container list">
      <h3>{repo.title}</h3>
      <div className="image-container">
        <img src={repo.recipe_img} alt="Recipe img" />
      </div>
      <h4>Meal type:</h4>
      <p>{repo.meal_type}</p>
      <h4>Ingredients:</h4>
      <p>{repo.ingredients}</p>
      <h4>Created by:</h4>
      <p>{repo.user_name}</p>
    </div>
  ));
};

const AllRecipes = () => {
  //similar to componentDidMount
  useEffect(() => {
    globalActions.recipes.getAllRecipes();
  }, []);

  const [globalState, globalActions] = useGlobal();
  const { status, recipes } = globalState;
  return (
    <div>
      {status === 'LOADING' && (
        <Spinner style={{ width: '5rem', height: '5rem' }} color="primary" />
      )}
      {status === 'SUCCESS' && mapRecipes(recipes)}
      {status === 'EMPTY' && <h4>Empty</h4>}
      {status === 'NOT_FOUND' && <h4>404 - User not found</h4>}
      {status === 'ERROR' && <h4>Unauthorized</h4>}
    </div>
  );
};

export default AllRecipes;
