import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { StyleSheet, View, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import { DangerZone } from 'expo';
import ModalSelector from 'react-native-modal-selector'
import Colors from '../../constants/colors';
import { style } from 'expo/src/Font';
import firebase from 'firebase';
const { Lottie } = DangerZone;


const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 33,
        backgroundColor: 'white',
    },
    Header: {
        color: Colors.red,
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 50,
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
    image: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});

class FormReqScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props){
        super(props)
    }
    state = {
        location: null,
    };

    componentWillMount() {
        if(this.props.status=='in-progress'){

        }
        else{
        setTimeout(() => {
            this.props.request_form();
          }, 3000);
        }
    }
    
    handleNextPress = () => {
        _getLocationAsync = async () => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
            }
            let region = await Location.getCurrentPositionAsync({});

        };
        this.props.navigation.navigate('LocationPickupScreen');
    };

    render() {
        let index = 0;
        const type_data = [
            { key: index++, label: 'Car repair' },
            { key: index++, label: 'Medic' },
            { key: index++, label: 'Chef' },
            { key: index++, label: 'Path Finder' },
            { key: index++, label: 'Programmer' },
            { key: index++, label: 'Nothing' },
        ];
        const view_data = [
            { key: index++, label: 'Friend only' },
            { key: index++, label: 'Public' },
            { key: index++, label: 'Except Friend' },
        ];
        const mustBe_data = [
            { key: index++, label: 'All' },
            { key: index++, label: 'Male' },
            { key: index++, label: 'Female' },
        ];
        const hero_data = [
            { key: index++, label: '1' },
            { key: index++, label: '2' },
            { key: index++, label: '3' },
            { key: index++, label: '4' },
            { key: index++, label: '5' },
        ];
        let content;

        if (this.props.status == "in-progress") {
            content = (
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ backgroundColor: 'white' }}>
                        <Image source={{ uri:  "https://firebasestorage.googleapis.com/v0/b/bero-be-a-hero.appspot.com/o/images%2Ftest1.jpg?alt=media&token=bcdbb820-6b5d-42f1-908d-3dc9997314ed"}} style={{ flex: 1, width: window.width, height: window.height * 0.4, }} />
                        <View style={styles.headerTopic}>
                            <Text style={styles.topic}>{this.props.topic}</Text>
                            <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <Icon name="people" type='simple-line-icon' color={Colors.grey2} />
                                        <Text style={{ color: Colors.grey2 }}>1/{this.props.hero}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', }}>
                                        <Icon name="eye" type='simple-line-icon' color={Colors.grey2} />
                                        <Text style={{ color: Colors.grey2 }}>{this.props.view}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', }}>
                                        <Icon name="symbol-male" type='simple-line-icon' color={Colors.grey2} />
                                        <Text style={{ color: Colors.grey2 }}>No</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', }}>
                                        <Icon name="symbol-female" type='simple-line-icon' color={Colors.grey2} />
                                        <Text style={{ color: Colors.grey2 }}>Yes</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={{ color: Colors.grey1, fontSize: 20, paddingTop: 20, fontWeight: 'bold', paddingBottom: 20, }}>Heros</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, }}>
                                <Image
                                    style={styles.image}
                                    resizeMode={"cover"}
                                    source={{ uri: "https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg" }}
                                />
                                <View style={{ width: window.width * 0.3 }} >
                                    <Text style={{ color: Colors.grey1, fontSize: 15, fontWeight: 'bold' }}>Test Test</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Text style={{ color: Colors.grey1, fontSize: 10, fontWeight: 'bold', }}> 0 reviews</Text>
                                    </View>
                                </View>
                                <Text style={{ color: Colors.mintColor, fontSize: 15, fontWeight: 'bold', }}>is coming</Text>
                            </View>
                            <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Button
                                        style={{ width: window.width * 0.3, }}
                                        buttonStyle={{ borderRadius: 3, }}
                                        backgroundColor='#EF5350'
                                        fontWeight='bold'
                                        color='white'
                                        title='Chat' />
                                    <Button
                                        style={{ width: window.width * 0.3, }}
                                        fontWeight='bold'
                                        buttonStyle={{ borderRadius: 3, }}
                                        backgroundColor='#EF5350'
                                        onPress={()=>this.props.request_form()}
                                        color='white'
                                        title='Done' />
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            );
        } else if (this.props.status == 'create') {
            content = (
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ backgroundColor: 'white' }} >

                        <Text style={styles.Header}>Create your request</Text>
                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>Topic</Text>
                        </FormLabel>
                        <FormInput
                            inputStyle={{ width: window.width * 0.9 }}
                            maxLength={50}
                            value={this.props.topic}
                            onChangeText={text => this.props.requestUpdate({ prop: 'topic', value: text })} />

                        <View style={{ flexDirection: 'row', }}>
                            <ModalSelector
                                style={{ width: window.width * 0.5 }}
                                data={type_data}
                                onChange={type => this.props.requestUpdate({ prop: 'type', value: type.label })}>
                                <FormLabel>
                                    <Text style={{ color: Colors.mintColor }}>Type</Text>
                                </FormLabel>
                                <FormInput
                                    editable={false}
                                    value={this.props.type} />
                            </ModalSelector>
                            <ModalSelector
                                style={{ width: window.width * 0.5 }}
                                data={view_data}
                                onChange={view => this.props.requestUpdate({ prop: 'view', value: view.label })}>
                                <FormLabel>
                                    <Text style={{ color: Colors.mintColor }}>View</Text>
                                </FormLabel>
                                <FormInput
                                    editable={false}
                                    value={this.props.view} />
                            </ModalSelector>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <ModalSelector
                                style={{ width: window.width * 0.5 }}
                                data={mustBe_data}
                                onChange={must_be => this.props.requestUpdate({ prop: 'must_be', value: must_be.label })}>
                                <FormLabel>
                                    <Text style={{ color: Colors.mintColor }}>Must be</Text>
                                </FormLabel>
                                <FormInput
                                    editable={false}
                                    value={this.props.must_be} />
                            </ModalSelector>
                            <ModalSelector
                                style={{ width: window.width * 0.5 }}
                                data={hero_data}
                                onChange={hero => this.props.requestUpdate({ prop: 'hero', value: hero.label })}>
                                <FormLabel>
                                    <Text style={{ color: Colors.mintColor }}>Hero</Text>
                                </FormLabel>
                                <FormInput
                                    type='number'
                                    editable={false}
                                    value={this.props.hero} />
                            </ModalSelector>
                        </View>

                        <FormLabel>
                            <Text style={{ color: Colors.mintColor }}>Detail</Text>
                        </FormLabel>
                        <FormInput
                            inputStyle={{ width: window.width * 0.9 }}
                            multiline={true}
                            value={this.props.detail}
                            onChangeText={text => this.props.requestUpdate({ prop: 'detail', value: text })} />
                    </ScrollView>
                    <View style={{ backgroundColor: 'white' }}>
                        <Button
                            style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 3, }}
                            buttonStyle={{ borderRadius: 3, }}
                            backgroundColor='#EF5350'
                            fontWeight='bold'
                            color='white'
                            onPress={this.handleNextPress}
                            title='Next' />
                    </View>
                </View>
            );
        } else {
            content = (
                <View style={{ flex: 1,backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                    <View>
                        <Lottie
                            ref={animation => {
                                if (animation == null) {

                                }
                                else {
                                    animation.play();
                                }
                            }}
                            style={{
                                width: window.width * 0.4,
                                height: window.width * 0.4,
                                backgroundColor: 'white',
                            }}
                            loop={true}
                            source={require('../../assets/animations/loading.json')}
                        />
                    </View>
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {content}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { topic, type, view, must_be, hero, detail } = state.requestForm;
    const { status } = state.requestStatus;

    return { topic, type, view, must_be, hero, detail, status };
};


export default connect(mapStateToProps, ActionCreators)(FormReqScreen);