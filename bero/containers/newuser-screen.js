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
    constructor(props) {
        super(props);

        this.state = {
            textInputSkill: 'Nothing',
            textInputCName: this.props.user.displayName
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    onButtonPress() {
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
                <View style={{ marginBottom: 10 }}>
                    <FormLabel labelStyle={{ color: 'white' }}>
                        <Text>Code Name</Text>
                    </FormLabel>
                    <FormInput style={{ color: 'white', marginTop: 10 }}
                        value={this.state.textInputCName}
                        onChangeText={(option) => { this.setState({ textInputCName: option.label }) }}/>
                </View>
                <View style={{ marginBottom: 40 }}>
                    <ModalSelector
                        data={data}
                        onChange={(option) => { this.setState({ textInputSkill: option.label }) }}>
                        <FormLabel labelStyle={{ color: 'white' }}>
                            <Text>You Skill</Text>
                        </FormLabel>
                        <FormInput
                            style={{ color: 'white', marginTop: 10 }}
                            editable={false}
                            value={this.state.textInputSkill} />
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

const mapStateToProps = state => ({ user: state.auth.user });

NewUserScreen.propTypes = {
    user: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, ActionCreators)(NewUserScreen);