import * as AuthActions from './auth';
import * as UserProfileAction from './userProfile';
import * as RequestAction from './request';

export const ActionCreators = {
  ...AuthActions,
  ...UserProfileAction,
  ...RequestAction,
};