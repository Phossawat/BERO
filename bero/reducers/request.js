import { REQUEST_UPDATE } from '../actions/types';

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
  }
};

const request = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};

export default request;