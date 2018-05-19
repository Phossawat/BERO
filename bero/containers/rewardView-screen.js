import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Image, Dimensions, ScrollView, TouchableOpacity, Platform, Modal } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Icon } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { DangerZone } from 'expo';
import Colors from '../constants/colors';

const window = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
    },
    image: {
        width: window.width * 0.95,
        height: window.height * 0.3,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.grey4,
    },
    button: {
        width: window.width,
        height: window.height * 0.1,
        backgroundColor: Colors.mintColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRed: {
        width: window.width,
        height: window.height * 0.1,
        backgroundColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInButton: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'prompt'
    },
    textHeader: {
        color: Colors.grey2,
        fontSize: 25,
        fontFamily: 'promptB'
    },
    expire: {
        marginTop: 10,
        backgroundColor: Colors.mintColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: window.width * 0.95,
        height: window.height * 0.06,
    },
    condition: {
        color: Colors.grey2,
        fontSize: 15,
        fontFamily: 'prompt'
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
        height: window.height * 0.2,
        width: window.width * 0.7,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonClose: {
        borderRadius: 6,
        borderColor: Colors.mintColor,
        borderWidth: 1,
        width: window.width * 0.4,
    }
})

class RewardViewScreen extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
        title: 'Rewards',
        headerTintColor: '#EF5350',
        headerTitleStyle: { color: 'black' },
        headerStyle: {
            marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };

    state = {
        modalVisible: false,
    }

    handleGetReward = () => {
        this.setState({ modalVisible: true })
        this.props.getReward(this.props.navigation.state.params.item.cost)
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => { console.log('close modal') }}>
                    <View style={styles.modalBackground}>
                        <View style={styles.Wrapper}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{
                                    color: Colors.grey2,
                                    fontSize: 15,
                                    fontFamily: 'prompt',
                                    paddingBottom: 10,
                                }}>Code: vhcvgDkhvKB85cSD</Text>
                                <Button buttonStyle={styles.buttonClose}
                                    backgroundColor='white'
                                    fontSize={15}
                                    color={Colors.mintColor}
                                    title="Close"
                                    onPress={() => {
                                        this.setState({ modalVisible: false })
                                    }} />
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Image source={{ uri: this.props.navigation.state.params.item.image }} style={styles.image} resizeMode="stretch" />
                    <Text style={styles.textHeader}>
                        {this.props.navigation.state.params.item.topic}
                    </Text>
                    <View style={styles.expire}>
                        <Text style={styles.textInButton}>หมดอายุ {this.props.navigation.state.params.item.expire}</Text>
                    </View>
                    <Text style={styles.condition}>
                        เงื่อนไข
                </Text>
                    <Text style={styles.condition}>
                        {this.props.navigation.state.params.item.condition}
                    </Text>
                </ScrollView>
                {this.props.userProfileObject.point >= this.props.navigation.state.params.item.cost &&
                    <TouchableOpacity style={styles.button} onPress={() => this.handleGetReward()}>
                        <Text style={styles.textInButton}>แลกเลย</Text>
                        <Text style={styles.textInButton}>{this.props.navigation.state.params.item.cost} Point</Text>
                    </TouchableOpacity>
                }
                {this.props.userProfileObject.point < this.props.navigation.state.params.item.cost &&
                    <TouchableOpacity style={styles.buttonRed}>
                        <Text style={styles.textInButton}>point ของท่านไม่พอ</Text>
                        <Text style={styles.textInButton}>{this.props.navigation.state.params.item.cost} Point</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { userProfileObject } = state.userForm;
    return { userProfileObject };
};


export default connect(mapStateToProps, ActionCreators)(RewardViewScreen);