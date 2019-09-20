import axios from 'axios';

//using axiosWithAuth as custom middleware to set the token to headers
import { axiosWithAuth } from '../components/axiosAuth';

//Method to register user
export const registerUser = async (
  store,
  newUserData,
  props,
  request = axios
) => {
  //   store.actions.counter.addRequest();
  //   const status = 'LOADING';
  //   store.setState({ status });
  // console.log('Outside Actions', newUserData);
  try {
    const response = await request.post(
      `https://chef-portfolio-webpt5.herokuapp.com/api/chefs/register`,
      newUserData
    );
    const responseServer = response.data;
    // console.log('AXIOS RESPONSE', response);

    //Redirect user to login
    props.history.push('/login');
    store.setState({ responseServer });
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    console.log('Axios error', isError404, status);
    store.setState({ status });
  }
};

//Method for login
export const Login = async (store, creds, props, request = axios) => {
  // console.log('Login Outside Actions', creds);
  try {
    const response = await request.post(
      `https://chef-portfolio-webpt5.herokuapp.com/api/chefs/login`,
      creds
    );
    //getting token and id from the decodedToken
    //coming from the response
    const token = response.data.token;
    const userId = response.data.userId;
    const isLoggedIn = true;

    //Redirect user to protect route
    props.history.push('/myrecipes');

    store.setState({ isLoggedIn, userId });
    //send token to headers for server to authenticate
    localStorage.setItem('authorization', token);
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    console.log('Axios error', isError404, status);
    store.setState({ status });
  }
};

//Method for recipes list for the current logged in user id
export const getRecipes = async (store, request = axiosWithAuth) => {
  const status = 'LOADING';
  store.setState({ status });
  // const id = localStorage.getItem('id');
  try {
    const response = await request().get(
      `https://chef-portfolio-webpt5.herokuapp.com/api/recipes/myrecipes`
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

//Method for recipes list all
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

//Create new post
export const createPost = async (store, newPost, props, request = axios) => {
  try {
    console.log('Post data: ', newPost);
    const response = await request.post(
      `https://chef-portfolio-webpt5.herokuapp.com/api/recipes/`,
      newPost
    );
    const responseServer = response.data;
    console.log('AXIOS RESPONSE', response);

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
