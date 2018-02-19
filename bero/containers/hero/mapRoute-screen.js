import React from 'react';
import { StyleSheet,View } from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import { MapView, Constants, Location, Permissions,  } from 'expo';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import { LOCATION } from 'expo/src/Permissions';
import Colors from '../../constants/colors';
import MapMarker from '../../assets/icons/map-marker-icon.png';
import Polyline from '@mapbox/polyline';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
});

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class MapRouteScreen extends React.Component {
  static navigationOptions = { header: null }
  state = {
    coords: [],
    location: { coords: {latitude: 0, longitude: 0}},
    locationMarker: {
        latitude: 13.731014,
        longitude: 100.781193,
    }
};

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    }
    var StringLocation = location.coords.latitude+','+location.coords.longitude
    this.getDirections(StringLocation, "13.731014,100.781193")
    if (this.refs.myRef) {
    this.setState({location, region})
    }
  }

  async getDirections(startLoc, destinationLoc) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyBsZmqD8HNm1IQvkMIa0niwj2gs_MHkWTs`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({coords: coords})
        return coords
    } catch(error) {
        alert(error)
        return error
    }
}



  render() {
    return (
      <View style={styles.container} >
      <View style={{ zIndex: 2, backgroundColor: 'transparent', position: 'absolute' }}>
                        <Icon name="chevron-left" type='font-awesome' color={Colors.red} style={{ paddingTop: 25, paddingLeft: 20 }} onPress={() => this.props.navigation.goBack()} />
                </View>
        <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        showsUserLocation={true}
        showsMyLocationButton={true}
          region={this.state.region}
          ref="myRef"
        >
        <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        <MapView.Marker
        image={MapMarker}
        coordinate={this.state.locationMarker}
        />
        </MapView>
      </View>
    );
  }
}