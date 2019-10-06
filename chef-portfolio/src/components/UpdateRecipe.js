import React, { useEffect, useState } from 'react';

import useGlobal from '../store';

//Firebase photo upload
import { storage } from '../config/firebase';

//actual component being render and exported
const UpdateRecipes = props => {
  const [globalState, globalActions] = useGlobal();
  const { status, myrecipes } = globalState;

  //   //initiate current values
  let currentTItle = '';
  let currentMealType = '';
  let currentRecipeImg = '';
  let currentIngredients = '';
  let currentInstructions = '';

  //for the progress bar percentage
  const [progress, setProgress] = useState(0);

  myrecipes.map(repo => {
    /* Get id from url */
    const id = props.match.params.id;
    /*console.log('id from URL: ', id);*/
    /* Convert map if to a number to be match correctly */
    if (`${repo.id}` === id) {
      currentTItle = repo.title;
      currentMealType = repo.meal_type;
      currentRecipeImg = repo.recipe_img;
      currentIngredients = repo.ingredients;
      currentInstructions = repo.instructions;
    }
  });

  const [title, setTitle] = useState(currentTItle);
  const [meal_type, setMealType] = useState(currentMealType);
  const [recipe_img_original, setRecipeImg] = useState('recipe_img_original');
  const [ingredients, setIngredients] = useState(currentIngredients);
  const [instructions, setInstructions] = useState(currentInstructions);
  //   console.log(username);

  //get the current user ID to post the entry under
  //   const chef_id = repo.chef_id;

  const submitHandler = chef_id => {
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
          });
      }
    );
    //End firebase
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
                {progress !== 0 ? (
                  <div>
                    <p>Updating {progress}%</p>
                    <progress value={progress} max="100" />
                  </div>
                ) : (
                  <div>
                    <h1>{`${repo.title}`}</h1>
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
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          onBlur={e => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-75">
                        <input
                          type="text"
                          name="meal_type"
                          value={meal_type}
                          onChange={e => setMealType(e.target.value)}
                          onBlur={e => setMealType(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-75">
                        <input
                          type="text"
                          name="ingredients"
                          value={ingredients}
                          onChange={e => setIngredients(e.target.value)}
                          onBlur={e => setIngredients(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-75">
                        <input
                          type="text"
                          name="instructions"
                          value={instructions}
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
                        <button type="submit">Update</button>
                      </div>
                    </form>
                  </div>
                )}
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
