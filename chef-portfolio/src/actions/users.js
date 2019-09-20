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
    props.history.push('/newpost');

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
