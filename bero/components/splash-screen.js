import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator, TouchableHighlight, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 320,
    height: 240,
    resizeMode: 'contain',
  },
});

const SplashScreen = () => (
  <View style={styles.container}>
    <Image source={require('../assets/app-logo.png')} style={styles.image}/>
  </View>
);

export default SplashScreen;