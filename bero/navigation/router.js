import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MainScreen from '../containers/main-screen';
import SplashScreen from '../components/splash-screen';
import AuthScreen from '../containers/auth-screen';
import NewUserScreen from '../containers/newuser-screen';
import TabNavScreen from '../containers/tabnav-screen';
import ProfileScreen from '../containers/profile-screen';
import SettingsScreen from '../containers/setting-screen';
import RankingScreen from '../containers/ranking-screen';
import FindingScreen from '../containers/hero/finding-screen';
import ListHelpScreen from '../containers/hero/listhelp-screen';
import MapHelpScreen from '../containers/hero/maphelp-screen';
import LoadingScreen from '../containers/loading-screen';
import FormReqScreen from '../containers/requester/formReq-screen';
import LocationPickupScreen from '../containers/requester/location-pickup-screen';
import ChoosePhotoScreen from '../containers/requester/choosePhoto-screen';
import RequestView from '../containers/hero/requestView';
import FriendListScreen from '../containers/friendList-screen';
import ChatScreen1 from '../containers/requester/chat-screen';
import MapRouteScreen from '../containers/hero/mapRoute-screen';
import AllCommentScreen from '../containers/hero/allComments';
import RedeemScreen from '../containers/redeem-screen';
import SavedScreen from '../containers/saved-screen';
import MapAnnoucedScreen from '../containers/annouce/mapAnnounced-screen';
import LocationScreen from '../containers/annouce/location-screen';
import ChoosePhotoAnnounced from '../containers/annouce/choosPhoto-announced';
import AnnouncedScreen from '../containers/annouce/announced-screen';
import SearchScreen from '../containers/search-screen';
import RateScreen from '../containers/requester/rate-screen';
import ProfileChangeScreen from '../containers/profileChange-screen';
import ReportScreen from '../containers/report-screen';
import AllEventScreen from '../containers/allEvent-screen';
import RewardScreen from '../containers/reward-screen';
import RewardViewScreen from '../containers/rewardView-screen';

export const HeroStack = StackNavigator({
  FindingScreen: {
    screen: FindingScreen,
  },
  ListHelpScreen: {
    screen: ListHelpScreen,
  },
  MapHelpScreen: {
    screen: MapHelpScreen,
    navigationOptions: {
      headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight },
      title: 'Map',
    },
  },
  RequestView: {
    screen: RequestView,
  },
  ChatScreen: {
    screen: ChatScreen1,
  },
  MapRouteScreen: {
    screen: MapRouteScreen,
  },
  AllCommentScreen: {
    screen: AllCommentScreen,
  },
})

export const RequesterStack = StackNavigator({
  FormReqScreen: {
    screen: FormReqScreen,
    navigationOptions: {
      headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight },
    },
  },
  LocationPickupScreen: {
    screen: LocationPickupScreen,
    navigationOptions: {
      headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight },
    },
  },
  ChoosePhotoScreen: {
    screen: ChoosePhotoScreen,
    navigationOptions: {
      headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight },
    },
  },
  ChatScreen: {
    screen: ChatScreen1,
  },
  RateScreen: {
    screen: RateScreen,
  }
})

export const HomeStack = StackNavigator({
  HomeScreen: {
    screen: MainScreen,
    navigationOptions: {
      headerVisible: false,
    },
  },
  RequestViewEvent: {
    screen: RequestView,
  },
  MapAnnoucedScreen: {
    screen: MapAnnoucedScreen,
  },
  LocationScreen: {
    screen: LocationScreen,
  },
  ChoosePhotoAnnounced: {
    screen: ChoosePhotoAnnounced,
  },
  AnnouncedScreen: {
    screen: AnnouncedScreen,
  },
  AllCommentScreen: {
    screen: AllCommentScreen,
  },
  SearchScreen: {
    screen: SearchScreen,
  },
  AllEventScreen: {
    screen: AllEventScreen,
  },
})

const prevGetStateForActionHomeStack = HeroStack.router.getStateForAction;
HeroStack.router = {
  ...HeroStack.router,
  getStateForAction(action, state) {
    if (state && action.type === 'ReplaceCurrentScreen') {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push(action);
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }
    return prevGetStateForActionHomeStack(action, state);
  },
}


export const SettingsStack = StackNavigator({
  Profile: {
   screen: ProfileScreen,
  },
 Settings: {
   screen: SettingsScreen,
 },
//  FriendList: {
//    screen: FriendListScreen,
//  },
 RedeemScreen: {
   screen: RedeemScreen,
 },
 RewardScreen: {
   screen: RewardScreen,
 },
 RewardViewScreen: {
   screen: RewardViewScreen,
 },
 SavedScreen: {
   screen: SavedScreen,
 },
 RequestView: {
   screen: RequestView,
 },
 AllCommentScreen: {
   screen: AllCommentScreen
 },
 ProfileChangeScreen: {
   screen: ProfileChangeScreen
 },
 ReportScreen: {
   screen: ReportScreen
 },
})



export const TabNav = TabNavigator({
    Main: {
    screen: HomeStack,
    navigationOptions: {
      gesturesEnabled: false,
      tabBarLabel: 'HOME',
      tabBarIcon: ({ tintColor }) => <Icon name="home-outline" type='material-community' color={tintColor} />,
    },
  },
    Hero: {
    screen: HeroStack,
    navigationOptions: {
      gesturesEnabled: false,
      tabBarLabel: 'HERO',
      tabBarIcon: ({ tintColor }) => <Icon name="face" color={tintColor} />
    },
  },
    Requester: {
    screen: RequesterStack,
    navigationOptions: {
      gesturesEnabled: false,
      tabBarLabel: 'HELP',
      tabBarIcon: ({ tintColor }) => <Icon name="human-handsup" type='material-community' color={tintColor} />
    },
  },
   Profile: {
    screen: SettingsStack,
    navigationOptions: {
      gesturesEnabled: false,
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => <Icon name="user-o" type='font-awesome' color={tintColor} />
    },
  },
},
  {
  navigationOptions: { headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight } },
  animationEnabled: true,
  lazy: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: (Platform.OS !== 'android'),
    inactiveTintColor: '#2c3e50',
    activeTintColor: '#EF5350',
    style: {
      backgroundColor: 'white',
    },
  },
})


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
)
