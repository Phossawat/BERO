import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { login } from '../actions/auth';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { Constants, Expo } from 'expo';

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
            marginTop: (Platform.OS === 'ios') ? 0 : Constants.statusBarHeight,
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };

    componentDidMount() {
        this.logIn()
    }
    logIn() {
        Expo.Facebook.token
        Expo.Facebook
            .logInWithReadPermissionsAsync('1735860930050502', {
                permissions: ['public_profile', 'email', 'user_friends'],
            }).then( async (result) => {
                const response = await fetch(
                    `https://graph.facebook.com/v2.11/me/friends&access_token=${result.token}`);
                console.log("friendlist " + await response.status)
            })
    }

    render() {

        return (
            <View style={styles.container}>
                <Text>Hello{this.props.refreshToken}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

FriendListScreen.propTypes = {
    user: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, ActionCreators)(FriendListScreen);
