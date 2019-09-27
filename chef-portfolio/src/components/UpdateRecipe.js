import React, { useEffect, useState } from 'react';

import useGlobal from '../store';

//actual component being render and exported
const UpdateRecipes = props => {
  const [globalState, globalActions] = useGlobal();
  const { status, myrecipes } = globalState;

  //   //initiate current values
  //   let currentTItle = '';
  //   let currentMealType = '';
  //   let currentChefId = '';
  //   let currentRecipeImg = '';
  //   let currentIngredients = '';
  //   let currentInstructions = '';

  //   myrecipes.map(repo => {
  //     /* Get id from url */
  //     const id = props.match.params.id;
  //     /*console.log('id from URL: ', id);*/
  //     /* Convert map if to a number to be match correctly */
  //     if (`${repo.id}` === id) {
  //       currentTItle = repo.title;
  //       currentMealType = repo.meal_type;
  //       currentChefId = repo.chef_id;
  //       currentRecipeImg = repo.recipe_img;
  //       currentIngredients = repo.ingredients;
  //       currentInstructions = repo.instructions;
  //     }
  //   });

  const [title, setTitle] = useState('Title');
  const [meal_type, setMealType] = useState('meal_type');
  const [recipe_img, setRecipeImg] = useState('recipe_img');
  const [ingredients, setIngredients] = useState('ingredients');
  const [instructions, setInstructions] = useState('instructions');
  //   console.log(username);

  //get the current user ID to post the entry under
  //   const chef_id = repo.chef_id;

  const submitHandler = chef_id => {
    const newPost = {
      title,
      meal_type,
      chef_id,
      recipe_img,
      ingredients,
      instructions
    };
    /* Get id from url  to update correct post*/
    const id = props.match.params.id;
    // console.log(newPost);
    //send CRUD request to API with the user info as argument
    globalActions.recipes.updatePost(newPost, id, props);
  };

  //similar to componentDidMount
  useEffect(() => {
    globalActions.recipes.getRecipes();

    //set en empty array to prevent inifite loop
  }, []);
  // mapRecipes(myrecipes, globalActions, props)
  return (
    //render base on the current status
    <div>
      {status === 'LOADING' && <h4>Loading...</h4>}
      {status === 'SUCCESS' &&
        myrecipes.map(repo => {
          /* Get id from url */
          const id = props.match.params.id;
          /*console.log('id from URL: ', id);*/
          /* Convert map if to a number to be match correctly */
          if (`${repo.id}` === id) {
            return (
              <div key={repo.id} className="container list">
                <h1>{`Update: ${repo.title}`}</h1>
                <form
                  className="register-form"
                  onSubmit={event => {
                    event.preventDefault();
                    submitHandler(repo.chef_id);
                  }}
                >
                  <div className="col-75">
                    <input
                      type="text"
                      name="title"
                      onChange={e => setTitle(e.target.value)}
                      onBlur={e => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-75">
                    <input
                      placeholder="Meal Type"
                      type="text"
                      name="meal_type"
                      onChange={e => setMealType(e.target.value)}
                      onBlur={e => setMealType(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-75">
                    <input
                      placeholder="Ingredients"
                      type="text"
                      name="ingredients"
                      onChange={e => setIngredients(e.target.value)}
                      onBlur={e => setIngredients(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-75">
                    <input
                      placeholder="Instructions"
                      type="text"
                      name="instructions"
                      onChange={e => setInstructions(e.target.value)}
                      onBlur={e => setInstructions(e.target.value)}
                    />
                  </div>
                  <div className="col-75">
                    <input
                      placeholder="Image  *****"
                      type="file"
                      name="recipe_img"
                      onChange={e => setRecipeImg(e.target.value)}
                      onBlur={e => setRecipeImg(e.target.value)}
                    />
                  </div>
                  <div className="col-75">
                    <button type="submit">Update</button>
                  </div>
                </form>
              </div>
            );
          }
        })}
      {status === 'EMPTY' && <h4>You have zero posts</h4>}
      {status === 'NOT_FOUND' && <h4>404 - User not found</h4>}
      {status === 'ERROR' && <h4 className="container list">Unauthorized</h4>}
    </div>
  );
};

export default UpdateRecipes;
