import * as AuthActions from './auth';
import * as UserProfileAction from './userProfile';

export const ActionCreators = {
  ...AuthActions,
  ...UserProfileAction,
};