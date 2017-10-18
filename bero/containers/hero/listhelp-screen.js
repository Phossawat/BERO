import React from 'react';
import { StyleSheet,View } from 'react-native';
import FloatingButton from '../../components/FloatingButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
});

export default class ListHelpScreen extends React.Component {
    static navigationOptions = {
    title: 'List',
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
   },
  };

  replaceScreen = () => {
    this.props.navigation.dispatch({
      key: 'MapHelpScreen',
      type: 'ReplaceCurrentScreen',
      routeName: 'MapHelpScreen',
    });
  };

  render() {
    return (
      <View style={styles.container} >
        <FloatingButton
          icon="map"
          onPress={this.replaceScreen}
        />
      </View>
    );
  }
}