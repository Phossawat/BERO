import React from 'react';
import { StyleSheet, View, Platform, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { MapView, Constants, Location, Permissions } from 'expo';
import Colors from '../../constants/colors';
import MapMarker from '../../assets/icons/map-marker-icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
});

class LocationPickupScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false,
      title: 'Position',
      headerRight: <Button color={Colors.red} fontSize={20} backgroundColor={"transparent"} title={"Next"} onPress={() => {navigation.navigate('ChoosePhotoScreen')}} />,
      headerTintColor: '#EF5350',
      headerTitleStyle: { color: 'black' },
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
      },
    }
  };
  // state = {
  //   location: null,
  //   errorMessage: null,
  //   region: {
  //     latitude: 13.731014,
  //     longitude: 100.781193,
  //     latitudeDelta: 0.1,
  //     longitudeDelta: 0.05,
  //   },
  //   locationResult: null,
  //   location: {coords: { latitude: 37.78825, longitude: -122.4324}},
  // };
  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,
  }

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
    this.onRegionChangeComplete(region)
  };

  onRegionChange(region){
    this.setState({
      mapRegion: region,
    });
  // var position = {
  //     latitude: region.latitude,
  //     longitude: region.longitude
  //   }
  // this.props.requestUpdate({  prop: 'mark_position', value: position  })
  }

  onRegionChangeComplete(region){
    this.setState({
      mapRegion: region,
    });
  var position = {
      latitude: region.latitude,
      longitude: region.longitude
    }
  this.props.requestUpdate({  prop: 'mark_position', value: position  })
  }

  render() {
    let { region } = this.state;
    return (
      <View style={styles.container} >
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={this.state.mapRegion}
          region={this.state.mapRegion}
          showsMyLocationButton={true}
          showsUserLocation={true}
          onRegionChange={(region)=>this.onRegionChange(region)}
          onRegionChangeComplete={(region)=>this.onRegionChangeComplete(region)}
        />
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
          <Image pointerEvents="none" source={MapMarker} style={{width: 20, height: 30, }}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { mark_position } = state.requestForm;

  return { mark_position };
};


export default connect(mapStateToProps, ActionCreators)(LocationPickupScreen);