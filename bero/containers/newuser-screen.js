import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { DangerZone } from 'expo';
import ModalSelector from 'react-native-modal-selector'

const { Lottie } = DangerZone;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1ABC9C',
        flex: 1,
        padding: 33,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    heading: {
        marginBottom: 33,
        fontSize: 33,
        textAlign: 'center',
        color: 'white',
    },
});

class NewUserScreen extends React.Component {
    static navigationOptions = {
    header: null,
    };
    onButtonPress() {
    const { skill, score } = this.props;
 
    this.props.userProfileCreate({ skill, score });
    }
    render() {
        let index = 0;
        const data = [
            { key: index++, label: 'Car repair' },
            { key: index++, label: 'Medic' },
            { key: index++, label: 'Chef' },
            { key: index++, label: 'Path Finder' },
            { key: index++, label: 'Programmer' },
            { key: index++, label: 'Nothing' },
        ];
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>WELCOME HERO</Text>
                <View style={{ marginBottom: 40 }}>
                    <ModalSelector
                        data={data}
                        onChange={skill => this.props.userProfileUpdate({ prop: 'skill', value: skill.label })}>
                        <FormLabel labelStyle={{ color: 'white' }}>
                            <Text>You Skill</Text>
                        </FormLabel>
                        <FormInput
                            style={{ color: 'white', marginTop: 10 }}
                            editable={false}
                            value={this.props.skill} />
                    </ModalSelector>
                </View>
                <Button
                    backgroundColor='white'
                    color='#1ABC9C'
                    title='OK'
                    onPress={this.onButtonPress.bind(this)} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
  const { skill, score } = state.userForm;
 
  return { skill, score };
};


export default connect(mapStateToProps, ActionCreators)(NewUserScreen);