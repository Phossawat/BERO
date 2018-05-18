import React from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import Colors from '../constants/colors';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import _ from 'lodash';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
    },
});

const ITEMS_PER_PAGE = 4;
class AllEventScreen extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
        title: 'List',
        headerTintColor: '#EF5350',
        headerTitleStyle: { color: 'black' },
        headerStyle: {
            marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
            backgroundColor: 'white',
            borderBottomWidth: 0,
        },
    };
    state = {
        refreshing: false,
        data: this.props.requestEvent.slice(0, 4),
        dataSource: [],
        page: 1,
        loading: false,
    }

    handleRefresh = () => {
        this.props.fetch_event()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ refreshing: false })
    }

    handleRequest = (item) => {
        this.props.requestFetchAccepted(item.uid)
        this.props.navigation.navigate('RequestViewEvent', {
            uid: item.uid
        })
    }
    renderFooter = () => {
        if (this.state.loading) {
            return (
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: Colors.grey3 }}>
                    <ActivityIndicator animating size='large' />
                </View>
            )
        } else {
            return null;
        }
    }

    loadMore = () => {
        var length = this.state.data.length
        if (!this.state.loading && length>=(this.state.page*ITEMS_PER_PAGE)) {
            this.setState({ loading: true })
            const { page, data } = this.state;
            const start = page * ITEMS_PER_PAGE;
            const end = (page + 1) * ITEMS_PER_PAGE - 1;
            const newPage = page + 1
            const newData = this.props.requestEvent.slice(start, end);
            setTimeout(() => {
                this.setState({ data: [...data, ...newData], page: newPage });
                this.setState({ loading: false })
            }, 1000);
        }
    }
    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    refreshing={false}
                    onRefresh={this.handleRefresh}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ paddingTop: 5, paddingBottom: 10 }}
                            onPress={() => this.handleRequest(item)}>
                            <Image resizeMode={"cover"}
                                source={{ uri: item.imageUrl }}
                                style={{ height: window.height * 0.3, borderRadius: 3, }} />
                            <Text style={{ color: Colors.mintColor, fontSize: 12, fontWeight: 'bold', paddingTop: 8 }}>{item.type}</Text>
                            <Text style={{ color: Colors.grey1, fontSize: 20, fontFamily: 'prompt', paddingTop: 3 }}>{item.topic}</Text>
                            <Text style={{ color: Colors.grey1, fontSize: 12, paddingTop: 3 }}>{item.heroAccepted}/{item.hero} persons</Text>
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={100}
                    keyExtractor={item => item.uid}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { requestEvent } = state.requestForm;
    const { userProfileObject } = state.userForm;
    return { requestEvent, userProfileObject };
};


export default connect(mapStateToProps, ActionCreators)(AllEventScreen);