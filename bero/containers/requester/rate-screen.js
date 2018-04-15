import React from 'react';
import { StyleSheet, View, Platform, Text, TextInput, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import { Col, Button, Rating } from 'react-native-elements'
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { Constants } from 'expo';
import Colors from '../../constants/colors';
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
    image: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});


export default class RatedScreen extends React.Component {
    static navigationOptions = {
        title: 'Rated',
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
    handleDone = () => {
        this.props.request_form(this.props.userProfileObject.requestCreate)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={_.map(this.props.navigation.state.params.helpers, (val, uid) => {
                        return { ...val, uid };
                    })}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ paddingTop: 5, paddingBottom: 10 }} onPress={() => this.userView(item)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, }}>
                                <Image
                                    style={styles.image}
                                    resizeMode={"cover"}
                                    source={{ uri: item.ownerprofilePicture }}
                                />
                                <View style={{ width: window.width * 0.3 }} >
                                    <Text style={{ color: Colors.grey1, fontSize: 12, fontWeight: 'bold' }}>{((item.ownerName).length > 10) ?
                                        (((item.ownerName).substring(0, 18 - 3)) + '...') :
                                        item.ownerName}</Text>
                                </View>
                                <Rating
                                    showRating
                                    type="star"
                                    fractions={0}
                                    startingValue={5}
                                    imageSize={20}
                                    onFinishRating={this.ratingCompleted}
                                    style={{ paddingVertical: 10,}}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.uid}
                />
            </View>
        );
    }
}