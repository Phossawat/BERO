import React from 'react';
import { StyleSheet,View } from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import { MapView, Constants, Location, Permissions } from 'expo';
import { LOCATION } from 'expo/src/Permissions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
});

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class MapHelpScreen extends React.Component {
    static navigationOptions = {
    title: 'Map',
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
   },
  };
  state = {
    location: { coords: {latitude: 0, longitude: 0}},
    locationMarker: {
        latitude: 13.731014,
        longitude: 100.781193,
    }
};

  replaceScreen = () => {
    this.props.navigation.dispatch({
      key: 'ListHelpScreen',
      type: 'ReplaceCurrentScreen',
      routeName: 'ListHelpScreen',
    });
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
    if (this.refs.myRef) {
    this.setState({location, region})
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
          showsUserLocation={true}
          region={this.state.region}
          ref="myRef"
        >
        <MapView.Marker
        coordinate={this.state.locationMarker}
        onPress={()=>this.props.navigation.navigate('RequestView')}
        />
        </MapView>
        <FloatingButton
          icon="list"
          onPress={this.replaceScreen}
        />
      </View>
    );
  }
}