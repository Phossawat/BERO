import React from 'react';
import { StyleSheet, View, Dimensions, Platform, ActivityIndicator, ListView, ScrollView, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import Colors from '../constants/colors';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import _ from 'lodash';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        width: window.width * 0.3,
        height: window.width * 0.1,
        borderRadius: 20,
        padding: 10
    },
    tagContainer: {
        alignItems: 'center',
        height: 40,
        shadowColor: 'grey',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 3 },
    },
    tag: {
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: Colors.grey2,
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class SearchScreen extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTintColor: '#EF5350',
        headerTitleStyle: { color: 'black' },
        headerStyle: {
            marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };

    state = {
        searchText: "",
    };

    firstSearch(text) {
        this.props.search_request(text)
    }

    handleRequest = (item) => {
        this.props.requestFetchAccepted(item.uid)
        this.props.navigation.navigate('RequestView', {
            item: item, save: "Save", uid: item.uid
        })
    }

    render() {
        return (
            <View style={styles.container} >
                <SearchBar
                    returnKeyType='search'
                    containerStyle={{
                        backgroundColor: 'white',
                        borderTopColor: 'transparent',
                    }}
                    inputStyle={{ backgroundColor: 'white' }}
                    lightTheme
                    placeholder='Search...'
                    onChangeText={(text) => this.firstSearch(text)}
                />
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.props.searchRequest}
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
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { requestObject, keyNear, searchRequest } = state.requestForm;
    // const searchArray = _.map(searchRequest, (val, uid) => {
    //     return { ...val, uid };
    // });

    return { requestObject, keyNear, searchRequest };
};


export default connect(mapStateToProps, ActionCreators)(SearchScreen);