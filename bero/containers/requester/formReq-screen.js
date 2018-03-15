import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { StyleSheet, View, ScrollView, TextInput, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import { DangerZone } from 'expo';
import ModalSelector from 'react-native-modal-selector'
import Colors from '../../constants/colors';
import { style } from 'expo/src/Font';
import firebase from 'firebase';
import _ from 'lodash'

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
    image: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});

class FormReqScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props)
    }
    state = {
        location: null,
    };

    componentWillMount() {
        this.props.request_loading()
        if (this.props.userProfileObject.statusCreate == 'in-progress') {
            this.props.requestFetchSingle(this.props.userProfileObject.requestCreate)
            this.props.fetch_messages(this.props.userProfileObject.requestCreate)
            setTimeout(() => {
                this.props.request_inprogress()
            }, 3000);
        }
        else {
            setTimeout(() => {
                this.props.request_form();
            }, 3000);
        }
    }

    handleNextPress = () => {
        this.props.navigation.navigate('LocationPickupScreen');
    };
    handleChatPress = () => {
        this.props.navigation.navigate('ChatScreen',{ requestId: this.props.userProfileObject.requestCreate})
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
            if (this.props.requestSingle.must_be == 'Male') {
                femaleStatus = "No"
                maleStatus = "Yes"
            }
            else if (this.props.requestSingle.must_be == 'Female') {
                maleStatus = "No"
                femaleStatus = "Yes"
            }
            else {
                maleStatus = "Yes"
                femaleStatus = "Yes"
            }
            content = (
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ backgroundColor: 'white' }}>
                        <Image source={{ uri: this.props.requestSingle.imageUrl }} style={{ flex: 1, width: window.width, height: window.height * 0.4, }} />
                        <View style={styles.headerTopic}>
                            <Text style={styles.topic}>{this.props.requestSingle.topic}</Text>
                            <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Button
                                        buttonStyle={{ borderRadius: 3, width: window.width * 0.3, }}
                                        backgroundColor='#EF5350'
                                        fontWeight='bold'
                                        color='white'
                                        title='Chat'
                                        onPress={this.handleChatPress} />
                                    <Button
                                        fontWeight='bold'
                                        buttonStyle={{ borderRadius: 3, width: window.width * 0.3, }}
                                        backgroundColor='#EF5350'
                                        onPress={() => this.props.request_form(this.props.userProfileObject.requestCreate)}
                                        color='white'
                                        title='Done' />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Text style={{ color: Colors.grey1, fontSize: 25, paddingTop: 20, fontWeight: 'bold', paddingBottom: 20, }}>Heros</Text>
                                <Text style={{ color: Colors.mintColor }}>{this.props.requestSingle.heroAccepted}/{this.props.requestSingle.hero}</Text>
                            </View>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={_.map(this.props.requestSingle.Helpers, (val, uid) => {
                                    return { ...val, uid };
                                })}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{ paddingTop: 5, paddingBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, }}>
                                            <Image
                                                style={styles.image}
                                                resizeMode={"cover"}
                                                source={{ uri: item.ownerprofilePicture }}
                                            />
                                            <View style={{ width: window.width * 0.3 }} >
                                                <Text style={{ color: Colors.grey1, fontSize: 15, fontWeight: 'bold' }}>{((item.ownerName).length > 10) ?
                                                    (((item.ownerName).substring(0, 18 - 3)) + '...') :
                                                    item.ownerName}</Text>
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
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.uid}
                            />
                            <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, paddingTop: 20 }}>
                                <Text style={styles.topic}>Details</Text>
                                <Text style={{ color: Colors.grey1, fontSize: 15, paddingTop: 10, paddingBottom: 10, }}>
                                    {this.props.requestSingle.detail}
                                </Text>
                            </View>
                            <Text style={{ color: Colors.grey2, fontSize: 10, paddingTop: 10, }}>{ new Date(this.props.requestSingle.when).toString()}</Text>
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
                            buttonStyle={{ borderRadius: 6, borderColor: Colors.mintColor, borderWidth: 1, }}
                            backgroundColor='white'
                            fontSize={15}
                            color={Colors.mintColor}
                            onPress={this.handleNextPress}
                            title='Next' />
                    </View>
                </View>
            );
        } else {
            content = (
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
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
    const { topic, type, view, must_be, hero, detail, photo, requestSingle } = state.requestForm;
    // const { heroArray } = _.map(requestSingle.helpers, (val, uid) => {
    //         return { ...val, uid }; 
    //     });
    const { status } = state.requestStatus;
    const { userProfileObject } = state.userForm;

    return { topic, type, view, must_be, hero, detail, status, photo, userProfileObject, requestSingle, };
};


export default connect(mapStateToProps, ActionCreators)(FormReqScreen);