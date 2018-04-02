import React, { PropTypes } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  button: {
      shadowColor: 'grey',
      shadowRadius: 4, 
      shadowOpacity: 0.5,
      shadowOffset:{width:0,height:0},
      backgroundColor: 'white',
      borderColor: '#CFD8DC',
      borderWidth: 1,
      borderRadius: 2,

  },
});

const MiniCard = (props) => {
  return (
    <TouchableOpacity style={styles.container}
    onPress={()=>this.props.navigation.navigate('SearchScreen')}>
       <Button
       buttonStyle={styles.button}
       backgroundColor='white'
       color='grey'
  iconLeft
  icon={{name: 'search', color: 'grey',}}
  title='Try "Official"' />
    </TouchableOpacity>
  );
};

export default MiniCard;