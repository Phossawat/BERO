import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, ListView, Dimensions, ScrollView } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Icon } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { DangerZone } from 'expo';
import Colors from '../constants/colors';

const window = Dimensions.get('window')

const styles = StyleSheet.create({

})

class RewardViewScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
    }

    render() {

        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { skill, score, gender } = state.userForm;

    return { skill, score, gender };
};


export default connect(mapStateToProps, ActionCreators)(RewardViewScreen);