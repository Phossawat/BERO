import firebase from 'firebase';
import Expo from 'expo';
import {
  REQUEST_CREATE,
  REQUEST_UPDATE,
  REQUEST_FETCH_SUCCESS,
  REQUEST_STATUS_CREATE,
  REQUEST_STATUS_INPROGRESS,
  REQUEST_STATUS_LOADING,
  REQUEST_FETCH_SINGLE_SUCCESS,
  REQUEST_FETCH_ACCEPTED_SUCCESS,
} from './types';

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
  currentUser.providerData.forEach(function (profile) {
    facebookUid = profile.uid;
  });

  return (dispatch) => {
    requestDB.push({
      'imageUrl': url,
      ownerName,
      owneruid,
      owneremail,
      'ownerprofilePicture': 'http://graph.facebook.com/' + facebookUid + '/picture?type=square',
      facebookUid,
      topic,
      type,
      view,
      must_be,
      hero,
      detail,
      mark_position,
      'requestType': 'Request',
      'status': 'in-progress',
      'when': Date.now(),
      heroAccepted: 0,
    })
      .then((result) => {
        var ref = firebase.database().ref('users/' + owneruid);
        ref.update({
          "Profile/statusCreate": "in-progress",
          "Profile/requestCreate": result.key,
        });
        dispatch({ type: REQUEST_CREATE })
      });
  };
};

export const requestFetch = () => {
  const { currentUser } = firebase.auth()
  const request = firebase.database().ref(`/requests`)

  return (dispatch) => {
    request.orderByChild('status').equalTo('in-progress').on('value', snapshot => {
      dispatch({
        type: REQUEST_FETCH_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
};

export const requestFetchSingle = (requestId) => {
  const { currentUser } = firebase.auth()
  const request = firebase.database().ref('requests/' + requestId)

  return (dispatch) => {
    request.on('value', snapshot => {
      dispatch({
        type: REQUEST_FETCH_SINGLE_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
};


export const requestFetchAccepted = (requestId) => {
  const { currentUser } = firebase.auth()
  const request = firebase.database().ref('requests/' + requestId)

  return (dispatch) => {
    request.on('value', snapshot => {
      dispatch({
        type: REQUEST_FETCH_ACCEPTED_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
};

export const request_form = (requestId) => {
  const { currentUser } = firebase.auth();
  var owneruid = currentUser.uid;
  return dispatch => {
    var ref = firebase.database().ref('users/' + owneruid);
    ref.update({
      "Profile/statusCreate": "create",
    });
    if(requestId==null){

    }
    else{
    var ref2 = firebase.database().ref('requests/' + requestId);
    ref2.update({
      "status": "done",
    });
    }
    dispatch({ type: REQUEST_STATUS_CREATE })
  };

}

export const request_loading = () => {
  return dispatch => {
    dispatch({ type: REQUEST_STATUS_LOADING })
  };

}

export const request_inprogress = () => {
  return dispatch => {
    dispatch({ type: REQUEST_STATUS_INPROGRESS })
  };

}
