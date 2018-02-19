import * as AuthActions from './auth';
import * as UserProfileAction from './userProfile';
import * as RequestAction from './request';
import * as HeroAction from './hero';

export const ActionCreators = {
  ...AuthActions,
  ...UserProfileAction,
  ...RequestAction,
  ...HeroAction,
};