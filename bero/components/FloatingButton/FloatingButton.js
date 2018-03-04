import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

const FloatingButton = (props) => {
  return (
    <View style={styles.container}>
      <Icon
        raised
        reverse
        name={props.icon || 'map'}
        type="font-awesome"
        color={'#EF5350'}
        onPress={props.onPress}
      />
    </View>
  );
};

FloatingButton.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func,
};

export default FloatingButton;