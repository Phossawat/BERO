import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 33,
        backgroundColor: 'white',
    },
});

export default class FormReqScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };
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
            <ScrollView style={{ backgroundColor: 'white' }}>
                    <FormLabel>
                        <Text>Topic</Text>
                    </FormLabel>
                    <FormInput
                        value={this.props.topic}
                        onChangeText={text => this.props.userProfileUpdate({ prop: 'topic', value: text })}/>
                    <FormLabel>
                        <Text>Detail</Text>
                    </FormLabel>
                    <FormInput
                        value={this.props.detail}
                        onChangeText={text => this.props.userProfileUpdate({ prop: 'detail', value: text })}/>
                    <ModalSelector
                        data={data}
                        onChange={skill => this.props.userProfileUpdate({ prop: 'skill', value: skill.label })}>
                        <FormLabel>
                            <Text>You Skill</Text>
                        </FormLabel>
                        <FormInput
                            editable={false}
                            value={this.props.skill} />
                    </ModalSelector>
            </ScrollView>
        );
    }
}