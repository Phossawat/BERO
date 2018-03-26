import React, { Component } from 'react';
import {
  Image,             
  StyleSheet,         
  Text,              
  View,               
} from 'react-native';
import Colors from '../constants/colors';

export default class Callout extends Component {
  render() {
    const { topic, detail, imageUrl } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <View>
            <Image
              style={styles.image}
              source={{ uri: imageUrl }}
            />
            <Text style={styles.topic}>{topic}</Text>
            <Text style={styles.detail}>{detail}</Text>
          </View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  topic: {
    fontSize: 16,
    color: Colors.mintColor,
    marginTop: 5,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 3,
  },
});