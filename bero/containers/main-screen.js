import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
});

class MainScreen extends React.Component {
   static navigationOptions = {
    title: 'Main',
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
   },
  };

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

MainScreen.propTypes = {
  user: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, ActionCreators)(MainScreen);