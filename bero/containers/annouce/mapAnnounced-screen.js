import React from 'react';
import { StyleSheet, View, Platform, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { MapView, Constants, Location, Permissions } from 'expo';
import Colors from '../../constants/colors';
import MapMarker from '../../assets/icons/map-marker-icon.png';
import Callout from '../../components/callout';
import _ from 'lodash';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    callout: {
        width: 150,
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
          latitude:       location.coords.latitude,
          longitude:      location.coords.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        }
        this.setState({ mapRegion: region })
      };


    render() {
        let { region } = this.state;
        return (
            <View style={styles.container} >
                <View style={{ zIndex: 2, backgroundColor: 'transparent', position: 'absolute' }}>
                    <Icon name="chevron-left" type='font-awesome' color={Colors.red} style={{ paddingTop: 25, paddingLeft: 20 }} onPress={() => this.props.navigation.goBack()} />
                </View>
                <MapView
                    initialRegion={this.state.mapRegion}
                    region={this.state.mapRegion}
                    showsUserLocation={true}
                    style={styles.container}
                >
                    {this.props.announcedArray.map((marker) => (
                        <MapView.Marker
                            key={marker.uid}
                            coordinate={marker.mark_position}
                        >
                            <MapView.Callout tooltip style={styles.callout}>
                                <Callout
                                    topic={marker.topic}
                                    imageUrl={marker.imageUrl}
                                    detail={marker.detail}
                                />
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