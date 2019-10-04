import firebase from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBR74Xi4ht8B2YrZkxRiUbj-nMrvUw9DlI',
  authDomain: 'chef-portfolio.firebaseapp.com',
  databaseURL: 'https://chef-portfolio.firebaseio.com',
  projectId: 'chef-portfolio',
  storageBucket: 'chef-portfolio.appspot.com',
  messagingSenderId: '792867044317',
  appId: '1:792867044317:web:c80eb8b88043ba39f11434',
  measurementId: 'G-Y0Y3L73GNZ'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// console.log("Firebase initilized")
export default firebase;
