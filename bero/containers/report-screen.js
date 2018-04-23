import React, { Component } from 'react';
import { ScrollView, Text, Platform, View, StyleSheet, Dimensions } from 'react-native';
import { List, ListItem, Icon, FormLabel, FormInput, Button } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';
import Colors from '../constants/colors';

const window = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        borderRadius: 6,
        borderColor: Colors.mintColor,
        borderWidth: 1,
        width: window.width * 0.4,
    },
});

class ReportScreen extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        title: 'Report',
        headerTintColor: '#EF5350',
        headerTitleStyle: { color: 'black' },
        headerStyle: {
            marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };

    state = {
        title: '',
        detail: '',
        message: '',
    }

    handleSend = () => {
        this.props.sendReport(this.state.title, this.state.detail)
        this.setState({ message: 'Send report success'})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: Colors.mintColor, fontSize: 20, padding: 10 }} >{this.state.message}</Text>
                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <FormLabel>
                        <Text style={{ color: Colors.mintColor }}>Topic</Text>
                    </FormLabel>
                    <FormInput
                        inputStyle={{ width: window.width * 0.9 }}
                        maxLength={50}
                        value={this.state.title}
                        onChangeText={text => this.setState({ title: text })} />
                </View>
                <View style={{ paddingBottom: 10 }}>
                <FormLabel>
                    <Text style={{ color: Colors.mintColor }}>Detail</Text>
                </FormLabel>
                <FormInput
                    inputStyle={{ width: window.width * 0.9 }}
                    multiline={true}
                    value={this.state.detail}
                    onChangeText={text => this.setState({ detail: text })} />
                </View>
                <View style={{ alignItems: 'center', }}>
                <Button
                    buttonStyle={styles.button}
                    backgroundColor='white'
                    fontSize={15}
                    color={Colors.mintColor}
                    title="Send"
                    onPress={this.handleSend}
                />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps, ActionCreators)(ReportScreen);