import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { StyleSheet, View, ScrollView, TextInput, Dimensions, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import _ from 'lodash';

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            tabBarVisible: false,
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
                    _id: 2,
                    text: 'มีอะไรให้ช่วยครับ2',
                    createdAt: new Date(),
                    user: {
                        _id: 'lnoaboaadg',
                        name: 'React Native',
                        avatar: 'https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg',
                    }
                },
                {
                    _id: 1,
                    text: 'มีอะไรให้ช่วยครับ',
                    createdAt: new Date(),
                    user: {
                        _id: 'gadgbobxcv',
                        name: 'React Native',
                        avatar: 'https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg',
                    }
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
                            messages={this.props.chatMessagesArray.reverse()}
                            onSend={(messages) => this.props.send_messages(messages, this.props.navigation.state.params.requestId)}
                            user={{
                                _id: this.props.userProfileObject.facebookUid,
                                name: this.props.userProfileObject.displayName,
                                avatar: this.props.userProfileObject.profilePicture,
                            }}
                        />
                    </KeyboardAvoidingView>
                }
                {Platform.OS === 'ios' &&
                    <GiftedChat
                        messages={this.props.chatMessagesArray.reverse()}
                        onSend={(messages) => this.props.send_messages(messages, this.props.navigation.state.params.requestId)}
                        user={{
                            _id: this.props.userProfileObject.facebookUid,
                            name: this.props.userProfileObject.displayName,
                            avatar: this.props.userProfileObject.profilePicture,
                        }}
                    />
                }
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    const { messages } = state.chatMessages;
    const chatMessagesArray = _.map(messages, (val, uid) => {
        return { ...val, uid }; 
    });
    const { userProfileObject } = state.userForm;

    return { chatMessagesArray, userProfileObject };
};


export default connect(mapStateToProps, ActionCreators)(ChatScreen);