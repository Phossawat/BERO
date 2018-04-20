import { USER_PROFILE_UPDATE, USER_PROFILE_FETCH } from '../actions/types';

const INITIAL_STATE = {
  skill: 'Nothing',
  score: 0,
  gender: 'Male',
  userProfileObject: null,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_PROFILE_FETCH:
      return { ...state, userProfileObject: action.payload };
    default:
      return state;
  }
};

export default user;