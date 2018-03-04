import React from 'react';
import { StyleSheet,View } from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import { LOCATION } from 'expo/src/Permissions';
import Colors from '../../constants/colors';
import MapMarker from '../../assets/icons/map-marker-icon2.png';

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

export default class MapHelpScreen extends React.Component {
  static navigationOptions = { 
    header: null,
    tabBarVisible: false,
   }
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
      <View style={{ zIndex: 2, backgroundColor: 'transparent', position: 'absolute' }}>
                        <Icon name="chevron-left" type='font-awesome' color={Colors.red} style={{ paddingTop: 25, paddingLeft: 20 }} onPress={() => this.props.navigation.goBack()} />
                </View>
        <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
          region={this.state.region}
          ref="myRef"
        >
        <MapView.Marker
        image={MapMarker}
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