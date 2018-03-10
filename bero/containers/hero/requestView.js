import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import {
    StyleSheet, View, ScrollView, TextInput, Dimensions, Image, Animated, Platform,
    StatusBar,
} from 'react-native';
import Colors from '../../constants/colors';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import { MapView, Constants, Location, Permissions } from 'expo';

const window = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 33,
        backgroundColor: 'white',
    },
    topic: {
        color: Colors.grey1,
        fontSize: 25,
        fontWeight: 'bold',
    },
    headerTopic: {
        padding: 20,
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
        flex: 0.9
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class RequestView extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false,
    }
    constructor(props) {
        super(props)

        this.state = {
            scrollY: new Animated.Value(0),
            region: {
                latitude: this.props.navigation.state.params.item.mark_position.latitude,
                longitude: this.props.navigation.state.params.item.mark_position.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.05,
            }
        }
    };

    handleAcceptPress = () => {
        this.props.hero_accepted(this.props.navigation.state.params.item.uid);
        this.props.navigation.navigate('FindingScreen');
    }
    handleSavePress = () => {
        this.props.navigation.navigate('FindingScreen');
    }
    render() {
        if (this.props.status == "accepted") {
            buttonStatus = true
        }
        else {
            buttonStatus = false
        }
        const headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.8],
            extrapolate: 'clamp',
        });
        const titleTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                <View style={{ zIndex: 2, backgroundColor: 'transparent', position: 'absolute' }}>
                    <Icon name="chevron-left" type='font-awesome' color={Colors.red} style={{ paddingTop: 25, paddingLeft: 20 }} onPress={() => this.props.navigation.goBack()} />
                </View>
                <Animated.ScrollView
                    style={styles.fill}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}
                >
                    <View style={styles.scrollViewContent}>
                        <View style={styles.headerTopic}>
                            <Text style={styles.topic}>{this.props.navigation.state.params.item.topic}</Text>
                            <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ color: Colors.grey1, fontSize: 10, fontWeight: 'bold' }}>{this.props.navigation.state.params.item.type}</Text>
                                    <Text style={{ color: Colors.grey2, fontSize: 10, }}>Requested by <Text style={{ color: Colors.mintColor }}>{this.props.navigation.state.params.item.ownerName}</Text></Text>
                                    <Text style={{ color: Colors.grey2, fontSize: 10, }}>Created 21/10/17</Text>
                                </View>
                                <Image
                                    style={styles.image}
                                    resizeMode={"cover"}
                                    source={{ uri: this.props.navigation.state.params.item.ownerprofilePicture }}
                                />
                            </View>
                            <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <Icon name="people" type='simple-line-icon' color={Colors.grey2} />
                                        <Text style={{ color: Colors.grey2 }}>0/1</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', }}>
                                        <Icon name="eye" type='simple-line-icon' color={Colors.grey2} />
                                        <Text style={{ color: Colors.grey2 }}>Public</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', }}>
                                        <Icon name="symbol-male" type='simple-line-icon' color={Colors.grey2} />
                                        <Text style={{ color: Colors.grey2 }}>No</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', }}>
                                        <Icon name="symbol-female" type='simple-line-icon' color={Colors.grey2} />
                                        <Text style={{ color: Colors.grey2 }}>Yes</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ paddingTop: 15, paddingBottom: 15, borderColor: Colors.grey3, borderBottomWidth: 1 }}>
                                <Text style={styles.topic}>Details</Text>
                                <Text style={{ color: Colors.grey1, fontSize: 15, paddingTop: 10, paddingBottom: 10, }}>
                                    {this.props.navigation.state.params.item.detail}
                                </Text>
                            </View>
                            <View style={{ paddingTop: 15, paddingBottom: 10, }}>
                                <Text style={styles.topic}>Location</Text>
                            </View>
                        </View>
                        <MapView
                            style={{ height: window.height * 0.3 }}
                            initialRegion={this.state.region}
                        >
                            <MapView.Marker
                                coordinate={this.props.navigation.state.params.item.mark_position}
                            />
                        </MapView>
                        {this.props.navigation.state.params.item.requestType == 'Event' &&
                            <View style={styles.headerTopic}>
                                <View style={{ borderColor: Colors.grey3, borderBottomWidth: 1, borderTopWidth: 1 }} >
                                    <Text style={{
                                        color: Colors.grey1,
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                    }}>Reviews</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20, }}>
                                        <Image
                                            style={{
                                                height: 40,
                                                width: 40,
                                                borderRadius: 20,
                                                paddingRight: 5,
                                            }}
                                            resizeMode={"cover"}
                                            source={{ uri: "https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg" }}
                                        />
                                        <View style={{ width: window.width * 0.3 }} >
                                            <Text style={{ color: Colors.grey1, fontSize: 15, fontWeight: 'bold' }}>Test Test</Text>
                                            <Text style={{ color: Colors.grey2, fontSize: 15, }}>21 Oct 2017</Text>
                                        </View>
                                    </View>
                                    <Text style={{ color: Colors.grey2, fontSize: 15, paddingBottom: 15 }}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20, justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.mintColor, fontSize: 15, fontWeight: 'bold', paddingTop: 10 }}>Read all 1 Reviews</Text>
                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                        <Icon name="star" color={Colors.mintColor} size={15} />
                                    </View>
                                </View>
                            </View>}
                        {this.props.navigation.state.params.item.requestType == 'Request' &&
                            <View style={{ paddingTop: 15, paddingBottom: 10, }} />
                        }
                    </View>
                </Animated.ScrollView>
                <View style={{ borderTopColor: Colors.grey2, borderTopWidth: 1, flex: 0.1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ paddingLeft: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={{ color: Colors.grey1, fontSize: 20, fontWeight: 'bold' }}>{((this.props.navigation.state.params.item.topic).length > 18) ?
                                (((this.props.navigation.state.params.item.topic).substring(0, 18 - 3)) + '...') :
                                this.props.navigation.state.params.item.topic}</Text>
                            <Text style={{ color: Colors.grey2, fontSize: 10, }}>Request ID <Text style={{ color: Colors.mintColor }}>{this.props.navigation.state.params.item.uid}</Text></Text>
                        </View>
                        {this.props.navigation.state.params.item.requestType == 'Request' &&
                            <Button
                                buttonStyle={{ borderRadius: 3, width: window.width * 0.3, paddingRight: 20 }}
                                backgroundColor='#EF5350'
                                fontWeight='bold'
                                color='white'
                                onPress={this.handleAcceptPress}
                                disabled={buttonStatus}
                                title='Accept' />
                        }
                        {this.props.navigation.state.params.item.requestType == 'Event' &&
                            <Button
                                buttonStyle={{ borderRadius: 3, width: window.width * 0.3, paddingRight: 20 }}
                                backgroundColor='#EF5350'
                                fontWeight='bold'
                                color='white'
                                onPress={this.handleSavePress}
                                disabled={buttonStatus}
                                title='Save' />
                        }
                    </View>
                </View>
                <Animated.View
                    style={[
                        styles.header,
                        { transform: [{ translateY: headerTranslate }] },
                    ]}
                >
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        source={{ uri: this.props.navigation.state.params.item.imageUrl }}
                    />
                </Animated.View>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.title}>{((this.props.navigation.state.params.item.topic).length > 18) ?
                        (((this.props.navigation.state.params.item.topic).substring(0, 18 - 3)) + '...') :
                        this.props.navigation.state.params.item.topic}</Text>
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { status } = state.heroStatus;
    return { status };
};


export default connect(mapStateToProps, ActionCreators)(RequestView);