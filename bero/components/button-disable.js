import React, { PropTypes } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Constants } from 'expo';
import Colors from '../constants/colors';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        width: window.width * 0.3,
        height: window.width * 0.1,
        borderRadius: 20,
        padding: 10
    },
    disableButton: {
        width: window.width * 0.3,
        height: window.width * 0.1,
        borderRadius: 20,
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
    },
});

const ButtonDisable = ({ onPress = () => null , disabled, title }) => {


  return (
    <View>
        {disabled ?
        <Button
        onPress={onPress}
        buttonStyle={styles.button}
        backgroundColor={Colors.pink}
        title={title}
        color='white'
    />
        :
        <Button
        onPress={onPress}
        buttonStyle={styles.disableButton}
        backgroundColor={Colors.grey5}
        title={title}
        color='white'
    />
        }
    </View>
  );
};

ButtonDisable.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ButtonDisable;