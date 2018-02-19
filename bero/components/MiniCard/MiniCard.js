import React, { PropTypes } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      width: 140,
      height: 170,
      paddingRight: 5,
      paddingTop: 20,
      paddingBottom: 10,
  },
  image: {
    width: 137,
    height: 80,
    alignSelf: 'center',
    borderRadius: 3,
  },
  typeHeader: {
      color: '#1ABC9C',
      fontSize: 10,
  },
  header: {
      color: '#34495e',
      fontSize: 12,
      fontWeight: 'bold',
  },
  main: {
      color: '#95a5a6',
      fontSize: 10,
  }
});

const MiniCard = (props) => {
  return (
    <TouchableOpacity style={styles.container}
    onPress={props.onPress}>
        <Image source={require('../../assets/Test.jpeg')} style={styles.image} resizeMode="stretch"/>
        <Text style={styles.typeHeader}>Car</Text>
        <Text style={styles.header}>Lorem Ipsum</Text>
        <Text style={styles.main}>is simply dummy text of the printing a</Text>
    </TouchableOpacity>
  );
};

export default MiniCard;