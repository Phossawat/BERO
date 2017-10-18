import React from 'react';
import { StyleSheet,View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 33,
    backgroundColor: 'white',
  },
});

export default class HeroScreen extends React.Component {
    static navigationOptions = {
    title: 'HERO',
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
   },
  };

  render() {
    return (
      <View style={styles.container} />
    );
  }
}