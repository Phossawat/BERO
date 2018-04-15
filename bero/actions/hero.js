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
    }).then(() => {
      dispatch({ type: HERO_STATUS_FINDING });
    })
  };
}

export const hero_loading = () => {
  return dispatch => {
    dispatch({ type: HERO_STATUS_LOADING });
  };

}

export const hero_accepted = (requestId, location, user) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  var ownerName = currentUser.displayName;
  var help = user.help;
  var score = user.score;
  currentUser.providerData.forEach(function (profile) {
    facebookUid = profile.uid;
  });
  return dispatch => {
    var ref = firebase.database().ref('users/' + owneruid);
    ref.update({
      "Profile/statusRequest": "accepted",
      "Profile/requestAccepted": requestId,
    }).then(() => {
      var ref = firebase.database().ref('requests/' + requestId + '/Helpers');
      ref.child(owneruid).set({
        'ownerprofilePicture': 'http://graph.facebook.com/' + facebookUid + '/picture?type=square',
        help,
        score,
        ownerName,
        owneruid,
        location,
      }).then(() => {
        var ref = firebase.database().ref('requests/' + requestId + '/heroAccepted');
        ref.transaction(function (value) {
          if (typeof value === 'number') {
            return value + 1;
          } else {
            console.log('The counter has a non-numeric value: ' + value)
          }
        }).then(()=>{
          dispatch({ type: HERO_STATUS_ACCEPTED });
        })
      })
    })
  };
}

export const hero_inprogress = () => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  return dispatch => {
    var ref = firebase.database().ref('users/' + owneruid);
    ref.update({
      "Profile/statusRequest": "in-progress",
    }).then(() => {
      dispatch({ type: HERO_STATUS_INPROGRESS });
    })
  };

}

export const hero_cancle = (requestId) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  return dispatch => {
    var ref = firebase.database().ref('requests/' + requestId + '/Helpers');
    ref.child(owneruid).remove().then(() => {
      var ref = firebase.database().ref('users/' + owneruid);
      ref.update({
        "Profile/statusRequest": "finding",
      }).then(() => {
        var ref = firebase.database().ref('requests/' + requestId + '/heroAccepted');
        ref.transaction(function (value) {
          if (typeof value === 'number') {
            return value - 1;
          } else {
            console.log('The counter has a non-numeric value: ' + value)
          }
        }).then(() => {
          dispatch({ type: HERO_STATUS_FINDING });
        })
      })
    })
  };
}

export const getPoint = () => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  var ref = firebase.database().ref('users/' + owneruid+ '/Profile/help');
  return () => {
    ref.transaction(function (value) {
      if (typeof value === 'number') {
        return value + 1;
      } else {
        console.log('The counter has a non-numeric value: ' + value)
      }
    }).then(()=>{
      var ref = firebase.database().ref('users/' + owneruid+ '/Profile/point');
      ref.transaction(function (value) {
        if (typeof value === 'number') {
          return value + 10;
        } else {
          console.log('The counter has a non-numeric value: ' + value)
        }
      })
    })
  }
}