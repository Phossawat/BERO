import React from 'react';
import { StyleSheet, View, Platform, Text, TextInput, Dimensions, Modal, ScrollView  } from 'react-native';
import Col, { Button, Icon, Rating, FormInput, FormLabel } from 'react-native-elements'
import { login } from '../actions/auth';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { Constants } from 'expo';
import Colors from '../constants/colors';
import ButtonDisable from '../components/button-disable';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        paddingBottom: 10,
        borderRadius: 6,
        borderColor: Colors.mintColor,
        borderWidth: 1,
        width: window.width * 0.4,
    },
});


class ProfileChangeScreen extends React.Component {
    static navigationOptions = {
        title: 'Change skills',
        headerTintColor: '#EF5350',
        headerTitleStyle: { color: 'black' },
        headerStyle: {
            marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };
    constructor(props) {
        super(props);
    }

    state = {
        skills: this.props.userProfileObject.skills,
        loadingDone: false,
        message: "",
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

    handleSave = () => {
        this.setState({ loadingDone: true })
        this.props.saveChangeSkill(this.state.skills)
        this.setState({ message: "Save change success" })
        this.setState({ loadingDone: false })
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={{ height: 120, paddingTop: 33 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 0.4, }} contentContainerStyle={{ flex: 0 }}>
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
                <View style={{ paddingTop: 10 }}>
                <Button
                    buttonStyle={styles.button}
                    loading={this.state.loadingDone}
                    disabled={this.state.loadingDone}
                    backgroundColor='white'
                    fontSize={15}
                    color={Colors.mintColor}
                    title="Save"
                    onPress={this.handleSave}
                />
                <Text style={{ color: Colors.mintColor, fontSize: 15, padding: 5 }} >{this.state.message}</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { redeemStatus, redeemRequestId, redeemText, userProfileObject } = state.userForm;
    return { user: state.auth.user, redeemStatus, redeemRequestId, redeemText, userProfileObject };
};

export default connect(mapStateToProps, ActionCreators)(ProfileChangeScreen);