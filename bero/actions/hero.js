import firebase from 'firebase';
import Expo from 'expo';
import { HERO_STATUS_LOADING, HERO_STATUS_FINDING, HERO_STATUS_ACCEPTED, HERO_STATUS_INPROGRESS, HERO_STATUS_DENIED, REDEEM_SUCCESS, REDEEM_FAILD, COMMENT_SUCCESS } from './types';

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

export const hero_accepted = (requestId, location, user, limitHero) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  var ownerName = currentUser.displayName;
  var help = user.help;
  var score = user.score;
  var state = false;
  currentUser.providerData.forEach((profile) => {
    facebookUid = profile.uid;
  });
  return dispatch => {
    var ref = firebase.database().ref('requests/' + requestId + '/heroAccepted');
    ref.transaction((value) => {
      if (value < Number(limitHero)) {
        state = true;
        return value + 1;
      } else {
        dispatch({ type: HERO_STATUS_DENIED })
      }
    }).then(() => {
      if (state == true) {
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
            dispatch({ type: HERO_STATUS_ACCEPTED });
          })
        })
      }
    })
  }
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
          if (value > 0) {
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
  var ref = firebase.database().ref('users/' + owneruid + '/Profile/help');
  return () => {
    ref.transaction(function (value) {
      if (typeof value === 'number') {
        return value + 1;
      } else {
        console.log('The counter has a non-numeric value: ' + value)
      }
    }).then(() => {
      var ref = firebase.database().ref('users/' + owneruid + '/Profile/point');
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

export const redeemVoucher = (code) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  var ref = firebase.database().ref('codes/' + code);
  return dispatch => {
    ref.once("value")
      .then(function (snapshot) {
        if (snapshot.exists()) {
          if (snapshot.val().status == 'not_activate') {
            ref.update({
              "status": "activated"
            }).then(() => {
              var ref = firebase.database().ref('users/' + owneruid + '/Profile/point');
              ref.transaction(function (value) {
                if (typeof value === 'number') {
                  return value + 10;
                } else {
                  console.log('The counter has a non-numeric value: ' + value)
                }
              }).then(() => {
                var ref = firebase.database().ref('/requests/' + snapshot.val().event + '/heroAccepted');
                ref.transaction(function (value2) {
                  if (typeof value2 === 'number') {
                    return value2 + 1;
                  } else {
                    console.log('The counter has a non-numeric value: ' + value2)
                  }
                }).then(() => {
                  dispatch({
                    type: REDEEM_SUCCESS,
                    payload: snapshot.val().event
                  });
                })
              })
            })
          }
          else {
            dispatch({
              type: REDEEM_FAILD,
              payload: "The voucher code is already used."
            });
          }
        }
        else {
          dispatch({
            type: REDEEM_FAILD,
            payload: "The voucher code is invalid."
          });
        }
      });
  }
}

export const commentEvent = (requestId, rated, commentText) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  var ownerName = currentUser.displayName;
  currentUser.providerData.forEach((profile) => {
    facebookUid = profile.uid;
  });
  const ref = firebase.database().ref(`/requests/` + requestId + '/rated');
  return dispatch => {
    ref.transaction(function (value) {
      if (typeof value === 'number') {
        return value + rated;
      } else {
        console.log('The counter has a non-numeric value: ' + value)
      }
    }).then(() => {
      const ref = firebase.database().ref(`/requests/` + requestId + '/Comments');
      ref.push({
        "comment": commentText,
        "rate": rated,
        ownerName,
        'ownerprofilePicture': 'http://graph.facebook.com/' + facebookUid + '/picture?type=square',
        'when': Date.now()
      }).then(() => {
        dispatch({ type: COMMENT_SUCCESS });
      })
    })
  }
}

export const noComment = () => {
  return dispatch => {
    dispatch({ type: COMMENT_SUCCESS });
  }
}