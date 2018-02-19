import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { StyleSheet, View, ScrollView, TextInput, Dimensions, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: "Test Test",
            headerTintColor: '#EF5350',
            headerTitleStyle: { color: 'black' },
            headerStyle: {
                backgroundColor: 'white',
                borderBottomWidth: 0,
            },
        }
    };

    state = {
        messages: [],
    };
    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'มีอะไรให้ช่วยครับ',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg',
                    },
                },
            ],
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {Platform.OS === 'android' &&
                    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }} keyboardVerticalOffset={55}>
                        <GiftedChat
                            messages={this.state.messages}
                            onSend={(messages) => this.onSend(messages)}
                            user={{
                                _id: 1,
                            }}
                        />
                    </KeyboardAvoidingView>
                }
                {Platform.OS === 'ios' &&
                    <GiftedChat
                        bottomOffset={55}
                        messages={this.state.messages}
                        onSend={(messages) => this.onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                    />
                }
            </View>
        );
    }

}