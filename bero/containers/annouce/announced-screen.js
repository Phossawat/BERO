import React from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox } from 'react-native-elements';
import { ActionCreators } from '../../actions';
import { DangerZone } from 'expo';
import ModalSelector from 'react-native-modal-selector';
import Colors from '../../constants/colors';
import { connect } from 'react-redux';

const { Lottie } = DangerZone;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Header: {
        color: Colors.grey1,
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    topic: {
        color: Colors.grey1,
        fontSize: 25,
        paddingBottom: 20,
        fontWeight: 'bold',
    },
    headerTopic: {
        padding: 20,
    },
});

class AnnouncedScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
          tabBarVisible: false,
          title: 'Announced',
          headerTintColor: '#EF5350',
          headerTitleStyle: { color: 'black' },
          headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
          },
        }
      };

    handleNextPress = () => {
        this.props.navigation.navigate('LocationScreen')
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: 'white' }} >
                    <FormLabel>
                        <Text style={{ color: Colors.mintColor }}>Topic</Text>
                    </FormLabel>
                    <FormInput
                        inputStyle={{ width: window.width * 0.9 }}
                        maxLength={50}
                        value={this.props.topic}
                        onChangeText={text => this.props.announcedUpdate({ prop: 'topic', value: text })} />
                    <FormLabel>
                        <Text style={{ color: Colors.mintColor }}>Detail</Text>
                    </FormLabel>
                    <FormInput
                        inputStyle={{ width: window.width * 0.9 }}
                        multiline={true}
                        value={this.props.detail}
                        onChangeText={text => this.props.announcedUpdate({ prop: 'detail', value: text })} />
                </ScrollView>
                <View style={{ backgroundColor: 'white' }}>
                        <Button
                            style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 3, }}
                            buttonStyle={{ borderRadius: 6, borderColor: Colors.mintColor, borderWidth: 1, }}
                            backgroundColor='white'
                            fontSize={15}
                            color={Colors.mintColor}
                            onPress={this.handleNextPress}
                            title='Next' />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { topic, detail, photo } = state.announced;

    return { topic, detail, photo };
};


export default connect(mapStateToProps, ActionCreators)(AnnouncedScreen);