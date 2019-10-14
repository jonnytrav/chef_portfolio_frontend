import React, { useState } from 'react';
//Reactstrap
import { Progress } from 'reactstrap';

import useGlobal from '../store';

//Firebase photo upload
import { storage } from '../config/firebase';

const Register = props => {
  //For hooks this replaces the change handler
  const [title, setTitle] = useState('title');
  const [meal_type, setMealType] = useState('meal_type');
  const [recipe_img_original, setRecipeImg] = useState('recipe_img_original');
  const [ingredients, setIngredients] = useState('ingredients');
  const [instructions, setInstructions] = useState('instructions');
  //for the progress bar percentage
  const [progress, setProgress] = useState(0);
  //to gain access to the actions
  const [globalState, globalActions] = useGlobal();

  //get the current user ID to post the entry under
  const chef_id = globalState.userId;
  const user_name = globalState.userName;

  const submitHandler = event => {
    event.preventDefault();
    //initialize variable to use it later
    let newPost = {};

    //Firebase
    const uploadTask = storage
      .ref(`images/${recipe_img_original.name}`)
      .put(recipe_img_original);
    uploadTask.on(
      'state_changed',
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        // console.log('Upload is ' + progress + '% done');
      },
      function(error) {
        // Handle unsuccessful uploads
        console.log(error);
      },
      function() {
        // const status = 'LOADING';
        // globalState.setState({ status });
        // Handle successful uploads on complete
        storage
          .ref('images')
          .child(recipe_img_original.name)
          .getDownloadURL()
          .then(url => {
            //setting the recipe_img to the url return from firebase
            const recipe_img = url;
            // constructing the require object to send to db
            newPost = {
              title,
              meal_type,
              user_name,
              chef_id,
              recipe_img,
              ingredients,
              instructions
            };
            console.log('userName: ', user_name);
            //invoking the method to put on the db a new post
            globalActions.recipes.createPost(newPost, props);
          });
      }
    );
    //End firebase
  };

  return (
    <div className="container">
      {progress !== 0 ? (
        <div>
          <Progress value={progress}>{progress}%</Progress>
        </div>
      ) : (
        <div>
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
                type="file"
                name="recipe_img_original"
                onChange={e => {
                  if (e.target.files[0]) {
                    const image = e.target.files[0];
                    //console.log('selected img: ', image);
                    setRecipeImg(image);
                  }
                }}
              />
            </div>

            <div className="col-75">
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
