import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('authorization');
  // console.log('Middleware auth', token);
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      authorization: `${token}`
    }
  });
};
