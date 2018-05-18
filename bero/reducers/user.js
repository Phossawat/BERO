import { USER_PROFILE_UPDATE, USER_PROFILE_FETCH, REDEEM_SUCCESS, REDEEM_FAILD, COMMENT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  skill: 'Nothing',
  score: 0,
  gender: 'Male',
  userProfileObject: null,
  redeemStatus: false,
  redeemRequestId: null,
  redeemText: '',
  phone: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_PROFILE_FETCH:
      return { ...state, userProfileObject: action.payload };
    case REDEEM_SUCCESS:
      return { ...state, redeemStatus: true, redeemRequestId: action.payload };
    case REDEEM_FAILD:
      return { ...state, redeemText: action.payload };
    case COMMENT_SUCCESS:
      return { ...state, redeemStatus: false, redeemText: null, redeemRequestId: ''};
    default:
      return state;
  }
};

export default user;