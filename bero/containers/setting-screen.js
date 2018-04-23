import React, { Component } from 'react';
import { ScrollView, Text, Platform } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';

class Settings extends Component {
    static navigationOptions = {
    tabBarVisible: false,
    title: 'Settings',
    headerTintColor: '#EF5350',
    headerTitleStyle: { color: 'black' },
    headerStyle: {
      marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
      backgroundColor: 'white',
      borderBottomWidth: 0,
   },
  };
  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <List containerStyle={{ paddingLeft: 20, paddingRight: 20, borderTopWidth: 0}}> 
          <ListItem
            title="Profile"
            titleStyle= {{ fontWeight: 'bold' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
            onPress={()=>this.props.navigation.navigate("ProfileChangeScreen")}
          />
          <ListItem
            title="Log Out"
            rightIcon={{ name: 'sign-out', type: 'font-awesome' }}
            onPress={this.props.logout}
            titleStyle= {{ fontWeight: 'bold' }}
            containerStyle={{ borderColor: '#CFD8DC' }}
          />
        </List>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

Settings.propTypes = {
  user: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, ActionCreators)(Settings);