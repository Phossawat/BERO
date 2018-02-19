import firebase from 'firebase';
import Expo from 'expo';
import { HERO_STATUS_LOADING, HERO_STATUS_FINDING, HERO_STATUS_ACCEPTED } from './types';

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
  
  export const hero_accepted = () => {
    return dispatch => {
      dispatch({ type: HERO_STATUS_ACCEPTED });
    };
    
  }
