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
  static navigationOptions = { header: null };
    constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  goToNearMe = async () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.navigation.navigate('ListHelpScreen');
      this.setState({ loading: false });
    }, 3000);
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