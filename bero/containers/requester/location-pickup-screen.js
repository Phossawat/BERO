import React from 'react';
import { StyleSheet,View, Button } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { MapView, Constants, Location, Permissions } from 'expo';
import Colors from '../../constants/colors'

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
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class LocationPickupScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Position',
    headerRight: <Button color={Colors.red} title={"Next"} onPress={()=> navigation.navigate('ChoosePhotoScreen')} />,
    headerTintColor: '#EF5350',
    headerTitleStyle: { color: 'black' },
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
   },
  }};
  state = {
    location: null,
    errorMessage: null,
    region: {
      latitude: 13.731014,
      longitude: 100.781193,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    }
  };

  componentWillMount() {
    this._getLocationAsync();
  }


  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    region = {
      latitude: 13.731014,
      longitude: 0.781193,
      latitudeDelta: 0.002,
      longitudeDelta: 0.0421,
    },
    this.setState({ location, region });
    this.props.mark_position = {
      latitude: location.coords.latitude,
      longitude: location.coords.latitude
    }
  };

  render() {
    let { region } = this.state;
    return (
      <View style={styles.container} >
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={region}
        >
          <MapView.Marker
            coordinate={this.props.mark_position}
            onSelect={(e) => log('onSelect', e)}
            onDrag={(e) => log('onDrag', e)}
            onDragStart={(e) => log('onDragStart', e)}
            onDragEnd={(e) => log('onDragEnd', e)}
            onPress={(e) => log('onPress', e)}
            draggable
          />
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { mark_position } = state.requestForm;
 
  return { mark_position };
};


export default connect(mapStateToProps, ActionCreators)(LocationPickupScreen);