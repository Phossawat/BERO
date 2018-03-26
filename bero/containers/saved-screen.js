import React from 'react';
import { StyleSheet, View, Platform, Text, TextInput, Dimensions } from 'react-native';
import Col, { Button } from 'react-native-elements'
import { login } from '../actions/auth';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { Constants } from 'expo';
import Colors from '../constants/colors';
import _ from 'lodash';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 33,
        backgroundColor: 'white',
    },
    button: {
        borderRadius: 6,
        borderColor: Colors.mintColor,
        borderWidth: 1,
        width: window.width * 0.4,
    },
});


class SavedScreen extends React.Component {
    static navigationOptions = {
        title: 'Saved',
        headerTintColor: '#EF5350',
        headerTitleStyle: { color: 'black' },
        headerStyle: {
            marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };
    constructor(props) {
        super(props);
        this.state = { code: '', message: '' };
    }
    componentDidMount(){
    }

    render() {
        console.log(this.props.requestArray[0])
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { requestSaved } = state.requestForm;
    const requestArray = _.map(requestSaved, (val, uid) => {
      return { ...val, uid }; 
  });
  console.log("test2 "+ requestArray)
    return { requestArray };
};

export default connect(mapStateToProps, ActionCreators)(SavedScreen);