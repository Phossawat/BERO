import firebase from 'firebase';
import Expo from 'expo';
import { USER_PROFILE_UPDATE, USER_PROFILE_CREATE, JUST_REGIS } from './types';

export const userProfileUpdate = ({ prop, value }) => {
  return {
    type: USER_PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const userProfileCreate = ({ codeName, skill, score }) => {
    const { currentUser } = firebase.auth();
    
    const userProfile = firebase.database().ref(`/users/${currentUser.uid}/profile`);
    return (dispatch) => {
    userProfile.push({ codeName, skill, score })
      .then(() => {
        dispatch({ type: JUST_REGIS });
        dispatch({ type: USER_PROFILE_CREATE });
      });
  };
};