import React from 'react';
import { StyleSheet,View } from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import { MapView } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
});

export default class MapHelpScreen extends React.Component {
    static navigationOptions = {
    title: 'Map',
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
   },
  };

  replaceScreen = () => {
    this.props.navigation.dispatch({
      key: 'ListHelpScreen',
      type: 'ReplaceCurrentScreen',
      routeName: 'ListHelpScreen',
    });
  };

  render() {
    return (
      <View style={styles.container} >
        <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
        <FloatingButton
          icon="list"
          onPress={this.replaceScreen}
        />
      </View>
    );
  }
}