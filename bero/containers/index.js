import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Permissions, Notifications } from 'expo';

// import SplashScreen from '../components/splash-screen';
// import AuthScreen from './auth-screen';
// import MainScreen from './main-screen';
// import NewUserScreen from './newuser-screen';
import { AppRoot } from '../navigation/router';

import { ActionCreators } from '../actions';

class App extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function() {
      return false;
    });
  }
  componentDidMount() {
    this.props.verifyAuth();
    setTimeout(() => {
      this.routeOnAuth();
    }, 3000);
  }

  componentDidUpdate() {
    this.routeOnAuth();
    this.props.fetch_event();
  }

  routeOnAuth() {
    const navigateTo = (routeName) => {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null,
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

const mapStateToProps = state => ({ loggedIn: state.auth.isLoggedIn, newUser: state.auth.isNewUser, user: state.auth.user });

App.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  newUser: React.PropTypes.bool.isRequired,
  verifyAuth: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, ActionCreators)(App);
