import React from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import Colors from '../../constants/colors';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
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

const ITEMS_PER_PAGE = 10;
export default class AllCommentsScreen extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
        title: 'Comments',
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
        this.state = {
            data: this.props.navigation.state.params.item.slice(0, 10),
            dataSource: [],
            page: 1,
            loading: false,
        };
    }

    loadMore = () => {
        this.setState({ loading: true })
        const { page, data } = this.state;
        const start = page * ITEMS_PER_PAGE;
        const end = (page + 1) * ITEMS_PER_PAGE - 1;
        const newPage = page + 1
        const newData = this.props.navigation.state.params.item.slice(start, end);
        setTimeout(() => {
            this.setState({ data: [...data, ...newData], page: newPage });
            this.setState({ loading: false })
        }, 3000);
    }

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: Colors.grey3 }}>
                <ActivityIndicator animating size='large' />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={{ borderColor: Colors.grey3, borderBottomWidth: 1, }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, paddingTop: 10 }}>
                                <Image
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                    }}
                                    resizeMode={"cover"}
                                    source={{ uri: item.ownerprofilePicture }}
                                />
                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={{ color: Colors.grey1, fontSize: 15, fontWeight: 'bold' }}>{item.ownerName}</Text>
                                    <Text style={{ color: Colors.grey2, fontSize: 15, }}>{new Date(comment[lastComment].when).toLocaleString()}</Text>
                                </View>
                            </View>
                            <Text style={{ color: Colors.grey2, fontSize: 15, fontWeight: 'bold', paddingBottom: 10 }}>{comment[lastComment].comment}</Text>
                        </View>
                    )
                    }
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0}
                    keyExtractor={item => item.uid}
                />
            </View>
        );
    }
}
