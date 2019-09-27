import axios from 'axios';

//using axiosWithAuth as custom middleware to set the token to headers
import { axiosWithAuth } from '../components/axiosAuth';

//Method to get the list of recipes for the current logged in user id
export const getRecipes = async (store, request = axiosWithAuth) => {
  const status = 'LOADING';
  store.setState({ status });
  // const id = localStorage.getItem('id');
  try {
    const response = await request().get(
      `https://chef-portfolio-webpt5.herokuapp.com/api/recipes/myrecipes`
    );
    // console.log('Response from Axios List', response);
    const myrecipes = response.data;
    const isReposEmpty = myrecipes.length === 0;
    const status = isReposEmpty ? 'EMPTY' : 'SUCCESS';
    store.setState({ myrecipes, status });
    // store.actions.counter.addSuccess();
  } catch (error) {
    console.log(error);
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    store.setState({ status });
    // store.actions.counter.addFail();
  }
};

//Method to get all recipes (read only)
export const getAllRecipes = async (store, request = axiosWithAuth) => {
  const status = 'LOADING';
  store.setState({ status });
  // const id = localStorage.getItem('id');
  try {
    const response = await request().get(
      `https://chef-portfolio-webpt5.herokuapp.com/api/recipes/`
    );
    // console.log('Response from Axios List', response);
    const recipes = response.data;
    const isReposEmpty = recipes.length === 0;
    const status = isReposEmpty ? 'EMPTY' : 'SUCCESS';
    store.setState({ recipes, status });
    // store.actions.counter.addSuccess();
  } catch (error) {
    console.log(error);
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    store.setState({ status });
    // store.actions.counter.addFail();
  }
};

//Create new post/recipe
export const createPost = async (store, newPost, props, request = axios) => {
  try {
    // console.log('Post data: ', newPost);
    const response = await request.post(
      `https://chef-portfolio-webpt5.herokuapp.com/api/recipes/`,
      newPost
    );
    const responseServer = response.data;
    // console.log('AXIOS RESPONSE', response);

    //Redirect user to login
    props.history.push('/myrecipes');
    store.setState({ responseServer });
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    console.log('Axios error', isError404, status);
    store.setState({ status });
  }
};

//Delete post/recipe
export const deletePost = async (store, id, props, request = axios) => {
  store.actions.recipesActions.deleteRequest(id);
  try {
    console.log('Delete Post id: ', id);
    const response = await request.delete(
      `https://chef-portfolio-webpt5.herokuapp.com/api/recipes/${id}`
    );
    const responseServer = response.data;
    console.log('AXIOS RESPONSE', response);

    store.setState({ responseServer });
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    console.log('Axios error', isError404, status);
    store.setState({ status });
  }
};

//Update current post/recipe
export const updatePost = async (
  store,
  newPost,
  id,
  props,
  request = axios
) => {
  try {
    // console.log('Put data: ', newPost, id);
    const response = await request.put(
      `https://chef-portfolio-webpt5.herokuapp.com/api/recipes/${id}`,
      newPost
    );
    const responseServer = response.data;
    // console.log('AXIOS RESPONSE', response);

    //Redirect user to login
    props.history.push('/myrecipes');
    store.setState({ responseServer });
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    console.log('Axios error', isError404, status);
    store.setState({ error });
  }
};
