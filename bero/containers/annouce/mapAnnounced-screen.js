import React from 'react';
import { StyleSheet, View, Platform, Image, TouchableOpacity, Text, Modal, Dimensions } from 'react-native';
import { Button, Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { MapView, Constants, Location, Permissions } from 'expo';
import Colors from '../../constants/colors';
import MapMarker from '../../assets/icons/map-marker-icon.png';
import Callout from '../../components/callout';
import _ from 'lodash';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    callout: {
        width: 150,
    },
    containerCallOut: {
        width: 150,
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    topic: {
        fontSize: 16,
        color: Colors.mintColor,
        marginTop: 5,
        fontWeight: 'bold',
    },
    detail: {
        fontSize: 14
    },
    image: {
        width: 120,
        height: 80,
        borderRadius: 3,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
});

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

class MapAnnoucedScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    }

    state = {
        location: { coords: { latitude: 0, longitude: 0 } },
        locationMarker: {
            latitude: 13.731014,
            longitude: 100.781193,
        },
        region: {
            latitude: 13.731014,
            longitude: 100.781193,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
        modal: false,
        modalItem: null,
    };

    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
        }
        this.setState({ mapRegion: region })
    };

    handleModal = (marker) => {
        this.setState({ modalItem: marker })
        this.setState({ modal: true })
    }

    handleVoteRemove = () => {
        console.log(this.state.modalItem.uid)
        this.props.voteRemove(this.state.modalItem.uid)
        this.setState({ modal: false })
    }


    render() {
        let { region } = this.state;
        return (
            <View style={styles.container} >
                {this.state.modalItem &&
                    <Modal
                        visible={this.state.modal}
                        transparent={true}
                        animationType={'fade'}
                        onRequestClose={() => { console.log('close modal') }}>
                        <View style={styles.modalBackground}>
                            <Card
                                style={{ width: window.width * 0.8, backgroundColor: 'white', borderRadius: 5 }}
                                title={this.state.modalItem.topic}
                                image={{ uri: this.state.modalItem.imageUrl }}>
                                <Text style={{ marginBottom: 10 }}>
                                    {this.state.modalItem.detail}
                                </Text>
                                <View flexDirection="row" style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Button
                                        onPress={() => this.handleVoteRemove()}
                                        icon={{ name: 'remove' }}
                                        backgroundColor={Colors.red}
                                        buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title='Remove' />
                                    <Button
                                        onPress={() => { this.setState({ modal: false }) }}
                                        icon={{ name: 'close' }}
                                        backgroundColor={Colors.red}
                                        buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title='Close' />
                                </View>
                            </Card>
                        </View>
                    </Modal>
                }
                <View style={{ zIndex: 2, backgroundColor: 'transparent', position: 'absolute' }}>
                    <Icon name="chevron-left" type='font-awesome' color={Colors.red} style={{ paddingTop: 25, paddingLeft: 20 }} onPress={() => this.props.navigation.goBack()} />
                </View>
                <MapView
                    initialRegion={this.state.mapRegion}
                    region={this.state.mapRegion}
                    style={styles.container}
                >
                    {this.props.announcedArray.map((marker) => (
                        <MapView.Marker
                            key={marker.uid}
                            coordinate={marker.mark_position}
                        >
                            <MapView.Callout tooltip style={styles.callout}>
                                <TouchableOpacity style={styles.containerCallOut} onPress={() => this.handleModal(marker)}>
                                    <View style={styles.bubble}>
                                        <View>
                                            {Platform.OS === 'ios' &&
                                                <Image
                                                    resizeMode="cover"
                                                    style={styles.image}
                                                    source={{ uri: marker.imageUrl }}
                                                />
                                            }
                                            <Text style={styles.topic}>{marker.topic}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.arrowBorder} />
                                    <View style={styles.arrow} />
                                </TouchableOpacity>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                </MapView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { announcedObject } = state.announced;
    const announcedArray = _.map(announcedObject, (val, uid) => {
        return { ...val, uid };
    });
    return { announcedObject, announcedArray };
};


export default connect(mapStateToProps, ActionCreators)(MapAnnoucedScreen);