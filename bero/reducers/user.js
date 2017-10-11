import { USER_PROFILE_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  codeName: '',
  skill: 'Nothing',
  score: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};

export default user;