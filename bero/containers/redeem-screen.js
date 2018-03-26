import React from 'react';
import { StyleSheet, View, Platform, Text, TextInput, Dimensions } from 'react-native';
import Col, { Button } from 'react-native-elements'
import { login } from '../actions/auth';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { Constants } from 'expo';
import Colors from '../constants/colors';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 33,
        backgroundColor: 'white',
    },
    button: {
        borderRadius: 6,
        borderColor: Colors.mintColor,
        borderWidth: 1,
        width: window.width * 0.4,
    },
});


class RedeemScreen extends React.Component {
    static navigationOptions = {
        title: 'Redeem voucher',
        headerTintColor: '#EF5350',
        headerTitleStyle: { color: 'black' },
        headerStyle: {
            marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };
    constructor(props) {
        super(props);
        this.state = { code: '', message: '' };
    }
    componentDidMount() {
        login()
    }
    async logIn() {
        const response = await fetch(
            `https://graph.facebook.com/v2.3/me/friendsaccess_token=${token}&debug=all`);
        console.log("friendlist " + response)
        this.setState(token)
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={{ paddingBottom: 1, color: Colors.grey1, fontSize: 30, fontWeight: 'bold' }}>Redeem voucher</Text>
                <Text style={{ color: Colors.grey2, fontSize: 15, paddingBottom: 20 }}>Enter your voucher code below.</Text>
                <TextInput style={{
                    height: 40,
                    borderColor: Colors.mintColor,
                    borderWidth: 1,
                    width: window.width * 0.7,
                    textAlign: 'center',
                    borderRadius: 4,
                }} onChangeText={(code) => this.setState({ code })} value={this.state.code} 
                underlineColorAndroid='transparent' />
                <Text style={{ color: Colors.red, fontSize: 15, padding: 5 }}>{this.state.message}</Text>
                <Button
                    buttonStyle={styles.button}
                    backgroundColor='white'
                    fontSize={15}
                    color={Colors.mintColor}
                    title="REDEEM"
                    onPress={this._pickImage}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, ActionCreators)(RedeemScreen);