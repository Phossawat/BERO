import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text , TouchableHighlight, Image} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginBottom: 33,
    fontSize: 33,
    textAlign: 'center',
    color: 'white',
  },
  image: {
    width: 320,
    height: 240,
    resizeMode: 'contain',
  },
});

const AuthScreen = props => {
  let content;

  if (props.isLoggingIn) {
    content = (
      <View>
        <Text style={styles.heading}>Logging in</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    content = (
      <View>
        <Image source={require('../assets/app-logo.png') } style={styles.image}/>
        <Button
          title="Sign In With Facebook"
          onPress={props.login}
          backgroundColor="#3b5998"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
};

AuthScreen.propTypes = {
  login: React.PropTypes.func.isRequired,
  isLoggingIn: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ isLoggingIn: state.auth.isLoggingIn });

export default connect(mapStateToProps, ActionCreators)(AuthScreen);