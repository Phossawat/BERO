import React from 'react';
import { StyleSheet, View, Platform, Text, TextInput, Dimensions, Modal } from 'react-native';
import Col, { Button, Icon, Rating, FormInput, FormLabel } from 'react-native-elements'
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
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    Wrapper: {
        backgroundColor: '#FFFFFF',
        height: window.height * 0.6,
        width: window.width * 0.8,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
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
        this.state = {
            code: '',
            rated: 5,
            message: '',
        };
    }

    ratingCompleted(rating) {
        this.setState({ rated: rating })
    }

    redeemVoucher = () => {
        this.props.redeemVoucher(this.state.code)
    }

    commentDone = () => {
        this.props.commentEvent(this.props.redeemRequestId, this.state.rated, this.state.message)
    }

    render() {

        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={this.props.redeemStatus}
                    animationType={'fade'}
                    onRequestClose={() => { console.log('close modal') }}>
                    <View style={styles.modalBackground}>
                        <View style={styles.Wrapper}>
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'choco', fontSize: 32, color: Colors.red }}>Thank you</Text>
                                    <Text style={{ fontFamily: 'choco', fontSize: 18, color: Colors.red }}>for your help</Text>
                                    <Rating
                                        type="star"
                                        fractions={1}
                                        startingValue={this.state.rated}
                                        imageSize={30}
                                        onFinishRating={rating => this.setState({ rated: rating })}
                                        style={{ paddingVertical: 10 }}
                                    />
                                    <FormLabel>
                                        <Text style={{ color: Colors.mintColor }}>Comment</Text>
                                    </FormLabel>
                                    <FormInput
                                        inputStyle={{ width: window.width * 0.7 }}
                                        multiline={true}
                                        value={this.state.message}
                                        onChangeText={text => this.setState({ message: text })} />
                                    <Button
                                        buttonStyle={{ borderRadius: 6, width: window.width * 0.3, paddingTop: 5}}
                                        backgroundColor={Colors.mintColor}
                                        fontWeight='bold'
                                        color='white'
                                        title='Done'
                                        onPress={this.commentDone} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text style={{ paddingBottom: 1, color: Colors.grey1, fontSize: 30, fontWeight: 'bold' }}>Redeem voucher</Text>
                <Text style={{ color: Colors.grey2, fontSize: 15, paddingBottom: 20 }}>Enter your voucher code below.</Text>
                <TextInput style={{
                    height: 40,
                    borderColor: Colors.mintColor,
                    borderWidth: 1,
                    width: window.width * 0.7,
                    textAlign: 'center',
                    borderRadius: 4,
                }} onChangeText={(text) => this.setState({ code: text })} value={this.state.code}
                    underlineColorAndroid='transparent' />
                <Text style={{ color: Colors.red, fontSize: 15, padding: 5 }}>{this.props.redeemText}</Text>
                <Button
                    buttonStyle={styles.button}
                    backgroundColor='white'
                    fontSize={15}
                    color={Colors.mintColor}
                    title="REDEEM"
                    onPress={this.redeemVoucher}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { redeemStatus, redeemRequestId, redeemText } = state.userForm;
    return { user: state.auth.user, redeemStatus, redeemRequestId, redeemText };
};

export default connect(mapStateToProps, ActionCreators)(RedeemScreen);