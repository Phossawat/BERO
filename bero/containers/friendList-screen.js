import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { login } from '../actions/auth';
import { connect } from 'react-redux';
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

class FriendListScreen extends React.Component {
    static navigationOptions = {
        title: 'Friends',
        headerTintColor: '#EF5350',
        headerTitleStyle: { color: 'black' },
        headerStyle: {
            marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };

    componentDidMount() {
        login()
    }
    async logIn() {
        const response = await fetch(
            `https://graph.facebook.com/v2.3/me/friendsaccess_token=${token}&debug=all`);
            console.log("friendlist "+response)
            this.setState(token)
    }

    render() {

        return (
            <View style={styles.container}>
            <Text>Hello{Object.values(this.props.user)}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

FriendListScreen.propTypes = {
  user: React.PropTypes.object.isRequired,
};
  
export default connect(mapStateToProps, ActionCreators)(FriendListScreen);