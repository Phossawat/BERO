import firebase from 'firebase';
import Expo from 'expo';
import { HERO_STATUS_LOADING, HERO_STATUS_FINDING, HERO_STATUS_ACCEPTED, HERO_STATUS_INPROGRESS } from './types';

export const hero_finding = () => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  return dispatch => {
    var ref = firebase.database().ref('users/' + owneruid);
    ref.update({
      "Profile/statusRequest": "finding",
    });
    dispatch({ type: HERO_STATUS_FINDING });
  };

}

export const hero_loading = () => {
  return dispatch => {
    dispatch({ type: HERO_STATUS_LOADING });
  };

}

export const hero_accepted = (requestId, location) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  var ownerName = currentUser.displayName;
  currentUser.providerData.forEach(function (profile) {
    facebookUid = profile.uid;
  });
  return dispatch => {
    var ref = firebase.database().ref('users/' + owneruid);
    ref.update({
      "Profile/statusRequest": "accepted",
      "Profile/requestAccepted": requestId,
    });
    var ref2 = firebase.database().ref('requests/' + requestId+'/Helpers');
    ref2.child(owneruid).set({
      'ownerprofilePicture': 'http://graph.facebook.com/' + facebookUid + '/picture?type=square',
      ownerName,
      owneruid,
      location,
    })
    var ref3 = firebase.database().ref('requests/' + requestId+'/heroAccepted');
    ref3.transaction(function(value){
      if (typeof value === 'number') {
        // increment - the normal case
        return value + 1;
      } else {
        // we can't increment non-numeric values
        console.log('The counter has a non-numeric value: ' + value)
        // letting the callback return undefined cancels the transaction
      }
    })
    dispatch({ type: HERO_STATUS_ACCEPTED });
  };

}

export const hero_inprogress = () => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  return dispatch => {
    var ref = firebase.database().ref('users/' + owneruid);
    ref.update({
      "Profile/statusRequest": "in-progress",
    });
    dispatch({ type: HERO_STATUS_INPROGRESS });
  };

}

export const hero_cancle = (requestId) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  return dispatch => {
  var ref = firebase.database().ref('requests/' + requestId+'/Helpers');
  ref.child(owneruid).remove();
  var ref2 = firebase.database().ref('users/' + owneruid);
    ref2.update({
      "Profile/statusRequest": "finding",
    });
  var ref3 = firebase.database().ref('requests/' + requestId+'/heroAccepted');
    ref3.transaction(function(value){
      if (typeof value === 'number') {
        // increment - the normal case
        return value - 1;
      } else {
        // we can't increment non-numeric values
        console.log('The counter has a non-numeric value: ' + value)
        // letting the callback return undefined cancels the transaction
      }
    })
    dispatch({ type: HERO_STATUS_FINDING });
  };
}