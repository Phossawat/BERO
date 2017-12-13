import firebase from 'firebase';
import Expo from 'expo';
import { USER_PROFILE_UPDATE, USER_PROFILE_CREATE, JUST_REGIS } from './types';

export const userProfileUpdate = ({ prop, value }) => {
  return {
    type: USER_PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const userProfileCreate = ({ skill, score }) => {
    const { currentUser } = firebase.auth();
    var facebookUid = null;
    const userProfile = firebase.database().ref(`/users/${currentUser.uid}/profile`);
    var displayName = currentUser.displayName;
    var phoneNumber = currentUser.phoneNumber;
    var email = currentUser.email;
    var profilePicture = currentUser.photoURL;
    currentUser.providerData.forEach(function (profile) {
      facebookUid = profile.uid;
    });
    return (dispatch) => {
    userProfile.push({ skill, score, facebookUid, displayName, phoneNumber, email, profilePicture })
      .then(() => {
        dispatch({ type: JUST_REGIS });
        dispatch({ type: USER_PROFILE_CREATE });
      });
  };
};