import React, { useState } from 'react';

import useGlobal from '../store';

const Register = props => {
  //For hooks this replaces the change handler
  const [title, setTitle] = useState('title');
  const [meal_type, setMealType] = useState('meal_type');
  const [recipe_img, setRecipeImg] = useState('recipe_img');
  const [ingredients, setIngredients] = useState('ingredients');
  const [instructions, setInstructions] = useState('instructions');
  //   console.log(username);

  const [globalState, globalActions] = useGlobal();

  //get the current user ID to post the entry under
  const chef_id = globalState.userId;

  const submitHandler = event => {
    event.preventDefault();
    const newPost = {
      title,
      meal_type,
      chef_id,
      recipe_img,
      ingredients,
      instructions
    };
    // console.log(globalState);
    //send CRUD request to API with the user info as argument
    globalActions.recipes.createPost(newPost, props);
  };
  return (
    <div className="container">
      <h1>New Post</h1>
      <form className="register-form" onSubmit={submitHandler}>
        <div className="col-75">
          <input
            placeholder="Title"
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
            placeholder="Image  *****"
            type="text"
            name="recipe_img"
            onChange={e => setRecipeImg(e.target.value)}
            onBlur={e => setRecipeImg(e.target.value)}
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
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
