import firebase from 'firebase';
import Expo from 'expo';
import { USER_PROFILE_UPDATE, USER_PROFILE_CREATE, JUST_REGIS, USER_PROFILE_FETCH } from './types';

export const userProfileUpdate = ({ prop, value }) => {
  return {
    type: USER_PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const userProfileCreate = ({ skill, score }) => {
  const { currentUser } = firebase.auth();
  var facebookUid = null;
  var userProfile = firebase.database().ref(`/users/${currentUser.uid}`);
  var displayName = currentUser.displayName;
  var phoneNumber = currentUser.phoneNumber;
  var email = currentUser.email;
  var profilePicture = currentUser.photoURL;
  currentUser.providerData.forEach(function (profile) {
    facebookUid = profile.uid;
  });
  return (dispatch) => {
    userProfile.child("Profile").set({
      skill,
      score,
      facebookUid,
      displayName,
      phoneNumber,
      email,
      profilePicture,
      statusCreate: "create",
      requestCreate: "none",
      statusRequest: "finding",
      requestAccepted: "none",
    })
      .then(() => {
        dispatch({ type: JUST_REGIS });
        dispatch({ type: USER_PROFILE_CREATE });
      });
  };
};

export const userProfileFetch = () => {
  const { currentUser } = firebase.auth()
  var userProfile = firebase.database().ref(`/users/${currentUser.uid}/Profile`);
  return (dispatch) => {
    userProfile.on('value', snapshot => {
      dispatch({
        type: USER_PROFILE_FETCH,
        payload: snapshot.val()
      });
    });
  };
};