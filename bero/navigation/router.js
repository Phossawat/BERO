import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MainScreen from '../containers/main-screen';
import HeroScreen from '../containers/hero-screen';
import RequesterScreen from '../containers/requester-screen';
import SplashScreen from '../components/splash-screen';
import AuthScreen from '../containers/auth-screen';
import NewUserScreen from '../containers/newuser-screen';
import TabNavScreen from '../containers/tabnav-screen';
import ProfileScreen from '../containers/profile-screen';
import SettingsScreen from '../containers/setting-screen';

export const SettingsStack = StackNavigator({
   Profile: {
    screen: ProfileScreen,
   },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const TabNav = TabNavigator({
    Main: {
    screen: MainScreen,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: ({ tintColor }) => <Icon name="home-outline" type='material-community' color={tintColor} />,
    },
  },
    Hero: {
    screen: HeroScreen,
    navigationOptions: {
      tabBarLabel: 'HERO',
      tabBarIcon: ({ tintColor }) => <Icon name="face" color={tintColor} />
    },
  },
    Requester: {
    screen: RequesterScreen,
    navigationOptions: {
      tabBarLabel: 'HELP',
      tabBarIcon: ({ tintColor }) => <Icon name="human-handsup" type='material-community' color={tintColor} />
    },
  },
   Profile: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => <Icon name="user-o" type='font-awesome' color={tintColor} />
    },
  },
},
  {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    inactiveTintColor: '#2c3e50',
    activeTintColor: '#EF5350',
    style: {
      backgroundColor: 'white',
    },
  },
});


export const AppRoot = StackNavigator({
    SplashScreen: {
      screen: SplashScreen
    },
    AuthScreen: {
      screen: AuthScreen
    },
    MainScreen: {
      screen: TabNav
    },
    CreateUserScreen: {
      screen: NewUserScreen
    },
    Settings: {
      screen: SettingsStack
    },
  },
  {
  mode: 'modal',
  headerMode: 'none',
}
);
