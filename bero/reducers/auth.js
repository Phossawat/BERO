import { AUTH_USER, SIGN_OUT_USER, LOGGING_IN, NEW_USER, JUST_REGIS } from '../actions/types';

const login = (state = { isLoggedIn: false, isLoggingIn: false, isNewUser: false }, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return {
        ...state,
        isLoggingIn: true,
      };
    case AUTH_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case NEW_USER:
      return { 
        ...state,
        user: action.user,
        isLoggedIn: true,
        isNewUser: true,
      };
    case JUST_REGIS:
      return {
        ...state,
        isNewUser: false,
      }
    case SIGN_OUT_USER:
      return {
         ...state,
         isLoggedIn: false,
         isLoggingIn: false,
         isNewUser: false,
      };
    default:
      return state;
  }
};

export default login;