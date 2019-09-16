import axios from 'axios';

export const registerUser = async (store, newUserData, request = axios) => {
  //   store.actions.counter.addRequest();
  //   const status = 'LOADING';
  //   store.setState({ status });
  console.log('Outside Actions', newUserData);
  try {
    const response = await request.post(
      `https://chef-portfolio-webpt5.herokuapp.com/api/chefs/register`,
      newUserData
    );
    const responseServer = response.data;
    console.log('AXIOS XXXXX', response);
    store.setState({ responseServer });
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? 'NOT_FOUND' : 'ERROR';
    console.log('from action err', isError404, status);
    store.setState({ status });
  }
};
