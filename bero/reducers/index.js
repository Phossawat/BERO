import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducer from './user';
import requestReducer from './request';

export default combineReducers({
  auth: authReducer,
  userForm: userReducer,
  requestForm: requestReducer,
});