import firebase from 'firebase';
import Expo from 'expo';
import { AUTH_USER, LOGGING_IN, SIGN_OUT_USER } from './types';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCawfptuLTFuUub84CiMe834ISSCsrCWvs",
    authDomain: "bero-be-a-hero.firebaseapp.com",
    databaseURL: "https://bero-be-a-hero.firebaseio.com",
    projectId: "bero-be-a-hero",
    storageBucket: "bero-be-a-hero.appspot.com",
    messagingSenderId: "437431150193",
};

firebase.initializeApp(config);

export const login = () => {
  return dispatch => {
    dispatch({ type: LOGGING_IN });
  //   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1735860930050502', {
  //     permissions: ['public_profile'],
  //   });
  //   console.log(token+" "+type);
  // if (type === 'success') {
  //   console.log(token);
  //   const credential = firebase.auth.FacebookAuthProvider.credential(token);
  //   firebase.auth().signInWithCredential(credential).catch((error) => {
  //     console.log("Error")
  //   });
  // }
  // if (type === 'cancel') {
  //   console.log("Cancel")
  //   dispatch({ type: SIGN_OUT_USER });
  // }
    Expo.Facebook
      .logInWithReadPermissionsAsync('1735860930050502', {
        permissions: ['public_profile'],
      })
      .then((result) => {
        if(result.type === 'success') {
          console.log(result.token+" "+result.expires);
          const credential = firebase.auth.FacebookAuthProvider.credential(
          result.token,
        );
        firebase.auth().signInWithCredential(credential);
      }
      else if(result.type === 'cancel'){
        console.log(result.type);
        dispatch({ type: SIGN_OUT_USER });
      }
      })
      .catch(err => {
        console.log('Error with logging in..');
        console.log(err);
        dispatch({ type: SIGN_OUT_USER });
      });
  };
};

export const logout = () => {
  return dispatch => {
    firebase.auth().signOut();
    dispatch({ type: SIGN_OUT_USER });
  };
};

export const verifyAuth = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("We are authenticated now!");
        // fetch(
        //   'https://www.googleapis.com/userinfo/v2/me',
        //   {
        //     headers: { Authorization: `Bearer ${accessToken}` },
        //   },
        //   response => {
        //     console.log(response);
        //   },
        // );
        dispatch({ type: AUTH_USER, user });
      } else {
        dispatch({ type: SIGN_OUT_USER });
      }
    });
  };
};