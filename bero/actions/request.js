import firebase from 'firebase';
import Expo from 'expo';
import { REQUEST_FETCH_SUCCESS } from './types';

export const requestFetch = () => {
  const { currentUser } = firebase.auth();
  const employees = firebase.database().ref(`/users/${currentUser.uid}/employees`);
 
  return (dispatch) => {
    employees.on('value', snapshot => {
      dispatch({
        type: EMPLOYEES_FETCH_SUCCESS,
        payload: snapshot.val()
      });
    });
  };
};