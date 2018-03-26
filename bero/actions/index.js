import * as AuthActions from './auth';
import * as UserProfileAction from './userProfile';
import * as RequestAction from './request';
import * as HeroAction from './hero';
import * as AnnouncedAction from './announced';

export const ActionCreators = {
  ...AuthActions,
  ...UserProfileAction,
  ...RequestAction,
  ...HeroAction,
  ...AnnouncedAction,
};