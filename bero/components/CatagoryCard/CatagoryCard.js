import React, { PropTypes } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 105,
        height: 70,
        paddingRight: 10,
    },
    button: {
        backgroundColor: '#EF5350',
        width: 100,
        height: 70,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const CatagoryCard = (props) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.button}
                underlayColor='#263238'
            >
                <View>
                    <Icon name={props.icon} color='white' size={40}/>
                </View>
            </TouchableHighlight>
        </View>
    );
};

CatagoryCard.propTypes = {
  icon: PropTypes.string,
};

export default CatagoryCard;