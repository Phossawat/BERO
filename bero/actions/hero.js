import firebase from 'firebase';
import Expo from 'expo';
import { HERO_STATUS_LOADING, HERO_STATUS_FINDING, HERO_STATUS_ACCEPTED, HERO_STATUS_INPROGRESS } from './types';

export const hero_finding = () => {
    return dispatch => {
      dispatch({ type: HERO_STATUS_FINDING });
    };
    
  }
  
  export const hero_loading = () => {
    return dispatch => {
      dispatch({ type: HERO_STATUS_LOADING });
    };
    
  }
  
  export const hero_accepted = (requestId) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  return dispatch => {
    var ref = firebase.database().ref('users/' + owneruid);
    ref.update({
      "Profile/statusRequest": "accepted",
      "Profile/requestAccepted": requestId,
    });
      dispatch({ type: HERO_STATUS_ACCEPTED });
    };
    
  }

  export const hero_inprogress = () => {
    return dispatch => {
      dispatch({ type: HERO_STATUS_INPROGRESS });
    };
    
  }
