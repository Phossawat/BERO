import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions } from 'react-navigation';

import SplashScreen from '../components/splash-screen';
import AuthScreen from './auth-screen';
import MainScreen from './main-screen';
import NewUserScreen from './newuser-screen';

import { ActionCreators } from '../actions';

const AppRoot = StackNavigator({
    SplashScreen: {
      screen: SplashScreen
    },
    AuthScreen: {
      screen: AuthScreen
    },
    MainScreen: {
      screen: MainScreen
    },
    CreateUserScreen: {
      screen: NewUserScreen
    }
  },
  {
    headerMode: 'none'
  }
);

class App extends React.Component {
  componentDidMount() {
    this.props.verifyAuth();
    setTimeout(() => {
      this.routeOnAuth();
    }, 3000);
  }

  componentDidUpdate() {
    this.routeOnAuth();
  }

  routeOnAuth() {
    const navigateTo = (routeName) => {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })],
      });
      this.navigator.dispatch(actionToDispatch);
    };

    if(this.props.newUser && this.props.loggedIn){
      navigateTo('CreateUserScreen');
    }
    else if (this.props.loggedIn && this.props.newUser===false) {
      navigateTo('MainScreen');
    } else {
      navigateTo('AuthScreen');
    }
  }

  render() {
    return (
      <AppRoot
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}

const mapStateToProps = state => ({ loggedIn: state.auth.isLoggedIn, newUser: state.auth.isNewUser });

App.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  newUser: React.PropTypes.bool.isRequired,
  verifyAuth: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, ActionCreators)(App);
