import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { StyleSheet, View, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import Colors from '../../constants/colors';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import { MapView, Constants, Location, Permissions } from 'expo';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 33,
        backgroundColor: 'white',
    },
    topic: {
        color: Colors.grey1,
        fontSize: 25,
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

export default class RequestView extends React.Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props)
    }
    state = {
        location: {
            latitude: 13.731014,
            longitude: 100.781193,
        },
        region: {
            latitude: 13.731014,
            longitude: 100.781193,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05,
        }
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <ScrollView style={{ backgroundColor: 'white', }}>
                    <View style={{ zIndex: 2, backgroundColor: 'transparent', position: 'absolute' }}>
                        <Icon name="chevron-left" type='font-awesome' color={Colors.red} style={{ paddingTop: 25, paddingLeft: 20 }} onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/bero-be-a-hero.appspot.com/o/images%2Ftest1.jpg?alt=media&token=bcdbb820-6b5d-42f1-908d-3dc9997314ed" }} style={{ flex: 1, width: window.width, height: window.height * 0.4, }} />
                    <View style={styles.headerTopic}>
                        <Text style={styles.topic}>รถเสีย</Text>
                        <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: Colors.grey1, fontSize: 10, fontWeight: 'bold' }}>Mechanic</Text>
                                <Text style={{ color: Colors.grey2, fontSize: 10, }}>Requested by <Text style={{ color: Colors.mintColor }}>Watthakorn malikaow</Text></Text>
                                <Text style={{ color: Colors.grey2, fontSize: 10, }}>Created 21/10/17</Text>
                            </View>
                            <Image
                                style={styles.image}
                                resizeMode={"cover"}
                                source={{ uri: "https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg" }}
                            />
                        </View>
                        <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{ alignItems: 'center', }}>
                                    <Icon name="people" type='simple-line-icon' color={Colors.grey2} />
                                    <Text style={{ color: Colors.grey2 }}>0/1</Text>
                                </View>
                                <View style={{ alignItems: 'center', }}>
                                    <Icon name="eye" type='simple-line-icon' color={Colors.grey2} />
                                    <Text style={{ color: Colors.grey2 }}>Public</Text>
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
                        <View style={{ paddingTop: 15, paddingBottom: 15, borderColor: Colors.grey3, borderBottomWidth: 1 }}>
                            <Text style={styles.topic}>Details</Text>
                            <Text style={{ color: Colors.grey1, fontSize: 15, paddingTop: 10, paddingBottom: 10, }}>Lorem Ipsum is simply dummy text of
                        the printing and typesetting industry. Lorem Ipsum has
                        been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived
                         not only five centuries, but also the leap into electronic
                         typesetting, remaining essentially unchanged. It was popularised
                         in the 1960s with the release of Letraset sheets containing
                         Lorem Ipsum passages, and more recently with desktop publishing
                         software like Aldus PageMaker including versions of Lorem Ipsum.
                         </Text>
                        </View>
                        <View style={{ paddingTop: 15, paddingBottom: 10, }}>
                            <Text style={styles.topic}>Location</Text>
                        </View>
                    </View>
                    <MapView
                        style={{ height: window.height * 0.3 }}
                        initialRegion={this.state.region}
                    >
                        <MapView.Marker
                            coordinate={this.state.location}
                        />
                    </MapView>
                    <View style={styles.headerTopic}>
                        <View style={{ borderColor: Colors.grey3, borderBottomWidth: 1, borderTopWidth: 1 }} >
                            <Text style={{
                                color: Colors.grey1,
                                fontSize: 25,
                                fontWeight: 'bold',
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>Reviews</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20, }}>
                                <Image
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        paddingRight: 5,
                                    }}
                                    resizeMode={"cover"}
                                    source={{ uri: "https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg" }}
                                />
                                <View style={{ width: window.width * 0.3 }} >
                                    <Text style={{ color: Colors.grey1, fontSize: 15, fontWeight: 'bold' }}>Test Test</Text>
                                    <Text style={{ color: Colors.grey2, fontSize: 15, }}>21 Oct 2017</Text>
                                </View>
                            </View>
                            <Text style={{ color: Colors.grey2, fontSize: 15,paddingBottom: 15 }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20, justifyContent: 'space-between'}}>
                                    <Text style={{ color: Colors.mintColor, fontSize: 15, fontWeight: 'bold', paddingTop:10 }}>Read all 1 Reviews</Text>
                                    <View style={{ flexDirection: 'row', paddingTop:10 }}>
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                    </View>
                                </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}