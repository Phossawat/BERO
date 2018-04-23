import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, ListView, Dimensions, ScrollView } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Icon } from 'react-native-elements';
import { ActionCreators } from '../actions';
import { DangerZone } from 'expo';
import ModalSelector from 'react-native-modal-selector';
import Colors from '../constants/colors';
import style from 'react-native-modal-selector/style';
import ButtonDisable from '../components/button-disable';

const { Lottie } = DangerZone;

const window = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.grey5,
        flex: 1,
        paddingTop: window.height*0.2,
        justifyContent: 'center',
    },
    heading: {
        paddingLeft: 33,
        marginBottom: 33,
        paddingRight: 33,
        fontSize: 33,
        textAlign: 'center',
        color: 'white',
    },
    button: {
        width: window.width * 0.3,
        height: window.width * 0.1,
        borderRadius: 20,
        padding: 10
    },
    disableButton: {
        color: Colors.grey5,
        borderColor: Colors.grey1,
        borderWidth: 1,
    },
    scrollItem: {
        paddingHorizontal: 2
    },
    titleDisable: {
        color: Colors.grey1
    }
});

class NewUserScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        skills: [],
        mechanic: true,
        medic: true,
        language: true,
        computer: true,
        chef: true,
        strength: true,
    }

    onButtonPress() {
        const { score, gender } = this.props;
        const skills = this.state.skills;

        this.props.userProfileCreate({ skills, score, gender });
    }

    handleSkillSelected = (skillSelected) => {
        if (this.state.skills.includes(skillSelected)) {
            var array = this.state.skills
            const index = array.indexOf(skillSelected)
            array.splice(index, 1);
            this.setState({ skills: array })
        }
        else {
            this.setState({
                skills: [...this.state.skills, skillSelected]
            })
        }
    }
    render() {
        let index = 0;

        const data = [
            { key: index++, label: 'Male' },
            { key: index++, label: 'Female' },
        ]
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>WELCOME HERO</Text>
                <View style={{ marginBottom: 40, paddingRight: 33, paddingLeft: 33, }}>
                    <ModalSelector
                        data={data}
                        onChange={selected => this.props.userProfileUpdate({ prop: 'gender', value: selected.label })}>
                        <FormLabel labelStyle={{ color: 'white' }}>
                            <Text>Gender</Text>
                        </FormLabel>
                        <FormInput
                            style={{ color: 'white', marginTop: 10 }}
                            editable={false}
                            value={this.props.gender} />
                    </ModalSelector>
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: 53, paddingBottom: window.height * 0.05 }} >Select your skills</Text>
                <View style={{ height: 150 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{flex: 0}}>
                    <View style={{ flexDirection: 'row', paddingLeft: 33, }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-around', }}>
                            <ButtonDisable onPress={() => this.handleSkillSelected('Mechanic')} title='Mechanic' disabled={this.state.skills.includes('Mechanic')} />
                            <ButtonDisable onPress={() => this.handleSkillSelected('Medic')} title='Medic' disabled={this.state.skills.includes('Medic')} />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-around', }}>
                            <ButtonDisable onPress={() => this.handleSkillSelected('Language')} title='Language' disabled={this.state.skills.includes('Language')} />
                            <ButtonDisable onPress={() => this.handleSkillSelected('Computer')} title='Computer' disabled={this.state.skills.includes('Computer')} />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-around', }}>
                            <ButtonDisable onPress={() => this.handleSkillSelected('Chef')} title='Chef' disabled={this.state.skills.includes('Chef')} />
                            <ButtonDisable onPress={() => this.handleSkillSelected('Strength')} title='Strength' disabled={this.state.skills.includes('Strength')} />
                        </View>
                    </View>
                </ScrollView>
                </View>
                <View style={{ alignItems: 'center', paddingRight: 33, paddingTop: window.height * 0.05, paddingLeft: 33 }}>
                    <Button
                        buttonStyle={{
                            borderRadius: 6,
                            borderColor: Colors.pink,
                            borderWidth: 1,
                            width: window.width * 0.4,
                        }}
                        backgroundColor={Colors.grey5}
                        color='white'
                        title='OK'
                        onPress={this.onButtonPress.bind(this)} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { skill, score, gender } = state.userForm;

    return { skill, score, gender };
};


export default connect(mapStateToProps, ActionCreators)(NewUserScreen);