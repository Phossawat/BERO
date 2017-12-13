import firebase from 'firebase';
import Expo from 'expo';
import { REQUEST_CREATE, REQUEST_UPDATE, REQUEST_FETCH_SUCCESS, REQUEST_STATUS_CREATE, REQUEST_STATUS_INPROGRESS, REQUEST_STATUS_LOADING } from './types';

export const requestUpdate = ({ prop, value }) => {
  return {
    type: REQUEST_UPDATE,
    payload: { prop, value }
  };
};

export const requestCreate = ({ topic, type, view, must_be, hero, detail, mark_position }, url) => {
    const { currentUser } = firebase.auth();
    var facebookUid = null;
    const requestDB = firebase.database().ref(`/requests`);
    var ownerName = currentUser.displayName;
    var owneruid = currentUser.uid;
    var owneremail = currentUser.email;
    var ownerprofilePicture = currentUser.photoURL;
    currentUser.providerData.forEach(function (profile) {
      facebookUid = profile.uid;
    });

    return (dispatch) => {
      requestDB.push({
        'imageUrl': url,
        ownerName,
        owneruid,
        owneremail,
        ownerprofilePicture,
        facebookUid,
        topic, 
        type, 
        view, 
        must_be, 
        hero, 
        detail, 
        mark_position,
        'status': "in progress",
        'when': new Date().getTime()
      })
      .then(() => {
        dispatch({ type: REQUEST_CREATE });
        dispatch({ type: REQUEST_STATUS_INPROGRESS });
      });
  };
};

export const requestFetch = () => {
  const { currentUser } = firebase.auth();
  const request = firebase.database().ref(`/request`);
 
  return (dispatch) => {
    request.on('value', snapshot => {
      dispatch({
        type: REQUEST_FETCH_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
};

export const request_form = () => {
  return dispatch => {
    dispatch({ type: REQUEST_STATUS_CREATE });
  };
  
}

export const request_loading = () => {
  return dispatch => {
    dispatch({ type: REQUEST_STATUS_LOADING });
  };
  
}

export const request_inprogress = () => {
  return dispatch => {
    dispatch({ type: REQUEST_STATUS_INPROGRESS });
  };
  
}