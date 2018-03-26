import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducer from './user';
import requestReducer from './request';
import requestStatus from './requestStatus';
import heroStatus from './heroStatus';
import chat from './chat';
import announced from './announced';

export default combineReducers({
  auth: authReducer,
  userForm: userReducer,
  requestForm: requestReducer,
  requestStatus: requestStatus,
  heroStatus: heroStatus,
  chatMessages: chat,
  announced: announced,
});