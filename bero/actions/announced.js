import firebase from 'firebase';
import Expo from 'expo';
import { ANNOUNCED_UPDATE, ANNOUNCED_CREATE, ANNOUNCED_FETCH, } from './types';

export const announcedUpdate = ({ prop, value }) => {
    return {
        type: ANNOUNCED_UPDATE,
        payload: { prop, value }
    };
};

export const announcedCreate = ({ topic, detail, mark_position }, url) => {
    const { currentUser } = firebase.auth();
    var facebookUid = null;
    const requestDB = firebase.database().ref(`/announceds`);
    var ownerName = currentUser.displayName;
    var owneruid = currentUser.uid;
    currentUser.providerData.forEach(function (profile) {
        facebookUid = profile.uid;
    });

    return () => {
        requestDB.push({
            'imageUrl': url,
            ownerName,
            owneruid,
            'ownerprofilePicture': 'http://graph.facebook.com/' + facebookUid + '/picture?type=square',
            facebookUid,
            topic,
            detail,
            mark_position,
            'type': 'User',
            'when': Date.now(),
        })
    };
}

export const announcedFetch = () => {
    const { currentUser } = firebase.auth()
    const request = firebase.database().ref(`/announceds`)
    return (dispatch) => {
      request.on('value', snapshot => {
        dispatch({
          type: ANNOUNCED_FETCH,
          payload: snapshot.val()
        });
      });
    };
  };