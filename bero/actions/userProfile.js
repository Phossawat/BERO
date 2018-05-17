import firebase from 'firebase';
import Expo from 'expo';
import GeoFire from 'geofire';
import { USER_PROFILE_UPDATE, USER_PROFILE_CREATE, JUST_REGIS, USER_PROFILE_FETCH } from './types';

export const userProfileUpdate = ({ prop, value }) => {
  return {
    type: USER_PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const userProfileCreate = ({ skills, score, gender }) => {
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
      skills,
      score,
      facebookUid,
      displayName,
      phoneNumber,
      email,
      gender,
      "point": 0,
      "help": 0,
      "profilePicture": 'http://graph.facebook.com/' + facebookUid + '/picture?type=square',
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

export const trackLocation = (coordinator) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  return () =>{
    var geoFire = new GeoFire(firebase.database().ref(`/userLocations`));
    geoFire.set(owneruid, [coordinator.latitude, coordinator.longitude])
  }
}

export const saveChangeSkill = (skills) => {
  const { currentUser } = firebase.auth();
  var ref = firebase.database().ref(`/users/${currentUser.uid}/Profile/skills`);
  return () => {
    ref.set(skills)
  }
}

export const sendReport = ( title, detail ) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  var ref = firebase.database().ref(`/reports`);
  return () => {
    ref.push({
      detail,
      title,
      "owner": owneruid,
      "status": "inprogress",
      "when": Date.now(),
    })
  }
}

export const friendList = async ()  => {
  const { currentUser } = firebase.auth();
  console.log("user "+ currentUser)
  return null;
} 