import axios from 'axios';

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
    //set loginUnaut to false in case is true after trying
    const loginUnaut = false;
    const regErr = false;
    //Redirect user to login
    props.history.push('/login');
    store.setState({ responseServer, loginUnaut, regErr });
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    //401 unauthorized to setState for wrong creds message
    const isError400 = error.response && error.response.status === 400;
    const regErr = isError400 ? true : false;
    store.setState({ status, regErr });
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
    // console.log('Token from login', token);
    const userId = response.data.userId;
    const isLoggedIn = response.data.token ? true : false;
    const loginUnaut = false;
    const regErr = false;
    //Redirect user to protect route
    props.history.push('/recipes');

    store.setState({ isLoggedIn, userId, loginUnaut, regErr });
    //send token to headers for server to authenticate
    localStorage.setItem('authorization', token);
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    //401 unauthorized to setState for wrong creds message
    const isError401 = error.response && error.response.status === 401;
    const loginUnaut = isError401 ? true : false;
    // console.log('Axios error', isError404, status);
    store.setState({ status, loginUnaut });
  }
};

//Method for logOut
export const LogOut = store => {
  //remove token from headers
  localStorage.removeItem('authorization');
  //check if there is a token if not set to false
  const isLoggedIn = localStorage.getItem('authorization') ? true : false;
  //   console.log(isLoggedIn);
  store.setState({ isLoggedIn });
};
