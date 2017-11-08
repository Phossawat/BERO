import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Constants, Location, Permissions, DangerZone  } from 'expo';
import HeroLocateButton from '../../components/hero-locate-button';
const { Lottie } = DangerZone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 20,
  },
});

export default class FindingScreen extends React.Component {
    static navigationOptions = {
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
   },
  };
    constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleGeolocationSuccess = (position) => {
    const params = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    setTimeout(() => {
      this.props.navigation.navigate('ListHelpScreen', { position });
      this.setState({ loading: false });
    }, 3000);
  };

  goToNearMe = async () => {
    this.setState({ loading: true });
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    else{
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      this.handleGeolocationSuccess(location);
    }
  };

  render() {
    return (
      <View style={styles.container}>
      <HeroLocateButton
          onPress={this.goToNearMe}
          loading={this.state.loading}
        />
      <Text style={styles.header}>Find Nearest Request</Text>
      </View>
    );
  }
}