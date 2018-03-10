import { REQUEST_UPDATE, REQUEST_FETCH_SUCCESS, REQUEST_FETCH_SINGLE_SUCCESS, REQUEST_FETCH_ACCEPTED_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  topic: '',
  hero: '1',
  type: 'Any',
  view: 'Public',
  must_be: 'all',
  detail: '',
  photo: null,
  mark_position: {
    latitude: 13.731014,
    longitude: 100.781193,
  },
  requestObject: null,
  requestSingle: null,
  requestAccepted: null,
};

const request = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case REQUEST_FETCH_SUCCESS:
      return { ...state, requestObject: action.payload };
    case REQUEST_FETCH_SINGLE_SUCCESS:
      return { ...state, requestSingle: action.payload };
    case REQUEST_FETCH_ACCEPTED_SUCCESS:
      return { ...state, requestAccepted: action.payload };
    default:
      return state;
  }
};



export default request;