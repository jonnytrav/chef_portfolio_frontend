const firebase = require('firebase');
const firebaseui = require('firebaseui');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'chef-portfolio.firebaseapp.com',
  databaseURL: 'https://chef-portfolio.firebaseio.com',
  projectId: 'chef-portfolio',
  storageBucket: 'chef-portfolio.appspot.com',
  messagingSenderId: '792867044317',
  appId: '1:792867044317:web:c80eb8b88043ba39f11434',
  measurementId: 'G-Y0Y3L73GNZ'
};

// // Initialize Firebase old**
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// // console.log("Firebase initilized")
// Storage
// const storage = firebase.storage();
// export { storage, firebase as default };

firebase.initializeApp(firebaseConfig);

//Storage for the photo upload functionality
var storage = firebase.storage();

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

function wrappedStart() {
  ui.start('#firebaseui-auth-container', uiConfig);
}

// export default wrappedStart;
export { storage, wrappedStart as default };
