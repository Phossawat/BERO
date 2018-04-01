import React from 'react';
import { StyleSheet, View, Platform, Text, TextInput, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
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
        padding: 20,
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
        this.props.fetch_saved()
    }
    handleRequest = (item) => {
        this.props.requestFetchAccepted(item.uid)
        this.props.navigation.navigate('RequestView', {
            item: item, save: "Remove" })
    }

    render() {
        return (
            <View style={styles.container}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.requestSaved}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ paddingTop: 5, paddingBottom: 10 }}
                onPress={() => this.handleRequest(item)}>
                <Image resizeMode={"cover"}
                  source={{ uri: item.imageUrl }}
                  style={{ height: window.height * 0.3, borderRadius: 3, }} />
                <Text style={{ color: Colors.mintColor, fontSize: 12, fontWeight: 'bold', paddingTop: 8 }}>{item.type}</Text>
                <Text style={{ color: Colors.grey1, fontSize: 20, fontWeight: 'bold', paddingTop: 3 }}>{item.topic}</Text>
                <Text style={{ color: Colors.grey1, fontSize: 12, paddingTop: 3 }}>{item.heroAccepted}/{item.hero} persons</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.uid}
          />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { requestSaved } = state.requestForm;

    return { requestSaved };
};

export default connect(mapStateToProps, ActionCreators)(SavedScreen);