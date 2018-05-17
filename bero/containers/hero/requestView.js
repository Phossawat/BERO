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
import Loader from '../../components/loader';
import ImageViewer from 'react-native-image-zoom-viewer';
import _ from 'lodash'

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
        fontFamily: 'promptB'
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
        resizeMode: 'stretch',
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
                latitude: this.props.requestAccepted.mark_position.latitude,
                longitude: this.props.requestAccepted.mark_position.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.05,
            },
            user_location: null,
            loading: false,
            fullView: false,
        }
    };

    componentDidMount() {
        this._getLocationAsync();
    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        let user_location = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }
        this.setState({ user_location: user_location })
    };

    handleAcceptPress = () => {
        this.setState({ loading: true })
        this.props.hero_accepted(this.props.navigation.state.params.uid, this.state.user_location, this.props.userProfileObject, this.props.requestAccepted.hero);
        setTimeout(() => {
            this.props.navigation.navigate('FindingScreen');
            this.setState({ loading: false });
        }, 1000)
    }
    handleSavePress = () => {
        this.props.save_event(this.props.navigation.state.params.uid);
        this.props.fetch_saved()
    }

    handleUnsavedPress = () => {
        this.props.delete_saved(this.props.navigation.state.params.uid);
        this.props.fetch_saved()
    }

    handleComment = (comment) => {
        this.props.navigation.navigate('AllCommentScreen', { item: comment });
    }

    render() {
        var savedArray = []
        if (this.props.userProfileObject.saved != null) {
            var savedArray = Object.keys(this.props.userProfileObject.saved)
        }
        if (this.props.requestAccepted.heroAccepted >= Number(this.props.requestAccepted.hero)) {
            console.log(this.props.requestAccepted + " " + this.props.requestAccepted.hero)
            buttonStatus = true
        }
        else {
            buttonStatus = false
        }

        if (this.props.requestAccepted.must_be == 'Male') {
            femaleStatus = "No"
            maleStatus = "Yes"
        }
        else if (this.props.requestAccepted.must_be == 'Female') {
            maleStatus = "No"
            femaleStatus = "Yes"
        }
        else {
            maleStatus = "Yes"
            femaleStatus = "Yes"
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
                <Loader
                    loading={this.state.loading} />
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                <View style={{ zIndex: 2, backgroundColor: 'transparent', position: 'absolute' }}>
                    <Icon name="chevron-left" type='font-awesome' color={Colors.red} style={{ paddingTop: 30, paddingLeft: 20 }} onPress={() => this.props.navigation.goBack()} />
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
                            <Text style={styles.topic}>{this.props.requestAccepted.topic}</Text>
                            <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ color: Colors.grey1, fontSize: 10, fontFamily: 'promptB' }}>{this.props.requestAccepted.type}</Text>
                                    <Text style={{ color: Colors.grey2, fontSize: 10, fontFamily: 'prompt' }}>Requested by <Text style={{ color: Colors.mintColor }}>{this.props.requestAccepted.ownerName}</Text></Text>
                                    <Text style={{ color: Colors.grey2, fontSize: 10, fontFamily: 'prompt' }}>{new Date(this.props.requestAccepted.when).toString()}</Text>
                                </View>
                                <Image
                                    style={styles.image}
                                    resizeMode={"cover"}
                                    source={{ uri: this.props.requestAccepted.ownerprofilePicture }}
                                />
                            </View>
                            {this.props.requestAccepted.requestType == 'Request' &&
                                <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <View style={{ alignItems: 'center', }}>
                                            <Icon name="people" type='simple-line-icon' color={Colors.grey2} />
                                            <Text style={{ color: Colors.grey2 }}>{this.props.requestAccepted.heroAccepted}/{this.props.requestAccepted.hero}</Text>
                                        </View>
                                        <View style={{ alignItems: 'center', }}>
                                            <Icon name="eye" type='simple-line-icon' color={Colors.grey2} />
                                            <Text style={{ color: Colors.grey2 }}>{this.props.requestAccepted.view}</Text>
                                        </View>
                                        <View style={{ alignItems: 'center', }}>
                                            <Icon name="symbol-male" type='simple-line-icon' color={Colors.grey2} />
                                            <Text style={{ color: Colors.grey2 }}>{maleStatus}</Text>
                                        </View>
                                        <View style={{ alignItems: 'center', }}>
                                            <Icon name="symbol-female" type='simple-line-icon' color={Colors.grey2} />
                                            <Text style={{ color: Colors.grey2 }}>{femaleStatus}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            {this.props.requestAccepted.requestType == 'Event' &&
                                <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                        <Icon name="clock" type='simple-line-icon' color={Colors.mintColor} />
                                        <Text style={{ color: Colors.grey2, paddingLeft: 10 }}>{this.props.requestAccepted.timeEvent}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                        <Icon name="users" type='font-awesome' color={Colors.mintColor} />
                                        <Text style={{ color: Colors.grey2, paddingLeft: 10 }}>{this.props.requestAccepted.heroAccepted}/{this.props.requestAccepted.hero} Persons</Text>
                                    </View>
                                </View>
                            }
                            <View style={{ paddingTop: 15, paddingBottom: 15, borderColor: Colors.grey3, borderBottomWidth: 1 }}>
                                <Text style={styles.topic}>Details</Text>
                                <Text style={{ color: Colors.grey1, fontSize: 15, paddingTop: 10, paddingBottom: 10, }}>
                                    {this.props.requestAccepted.detail}
                                </Text>
                            </View>
                            <View style={{ paddingTop: 15, paddingBottom: 10, }}>
                                <Text style={styles.topic}>Location</Text>
                                {this.props.requestAccepted.location &&
                                    <Text style={{ color: Colors.grey1, fontSize: 15, }}>
                                        {this.props.requestAccepted.location}
                                    </Text>
                                }
                            </View>
                        </View>
                        <MapView
                            style={{ height: window.height * 0.3 }}
                            initialRegion={this.state.region}
                        >
                            <MapView.Marker
                                coordinate={this.props.requestAccepted.mark_position}
                            />
                        </MapView>
                        {this.props.requestAccepted.requestType == 'Event' &&
                            <View style={styles.headerTopic}>
                                <View style={{ borderColor: Colors.grey3, borderBottomWidth: 1, borderTopWidth: 1 }} >
                                    <Text style={{
                                        color: Colors.grey1,
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                    }}>Comments</Text>
                                    {this.props.commentArray.length > 0 &&
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20, }}>
                                                <Image
                                                    style={{
                                                        height: 40,
                                                        width: 40,
                                                        borderRadius: 20,
                                                    }}
                                                    resizeMode={"cover"}
                                                    source={{ uri: this.props.commentArray[this.props.commentArray.length - 1].ownerprofilePicture }}
                                                />
                                                <View style={{ paddingLeft: 10 }}>
                                                    <Text style={{ color: Colors.grey1, fontSize: 15, fontWeight: 'bold' }}>{this.props.commentArray[this.props.commentArray.length - 1].ownerName}</Text>
                                                    <Text style={{ color: Colors.grey2, fontSize: 15, }}>{new Date(this.props.commentArray[this.props.commentArray.length - 1].when).toLocaleString()}</Text>
                                                </View>
                                            </View>
                                            <Text style={{ color: Colors.grey2, fontSize: 15, fontWeight: 'bold' }}>{this.props.commentArray[this.props.commentArray.length - 1].comment}</Text>
                                        </View>
                                    }
                                    <Text style={{ color: Colors.grey2, fontSize: 15, paddingBottom: 15 }}>{this.props.requestAccepted.uid}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20, justifyContent: 'space-between' }}>
                                    {this.props.commentArray.length > 0 &&
                                        <Text style={{ color: Colors.mintColor, fontSize: 15, fontWeight: 'bold', paddingTop: 10 }}
                                            onPress={() => this.handleComment(this.props.commentArray)}>Read all {this.props.commentArray.length} Comments</Text>
                                    }
                                    {this.props.commentArray.length > 0 &&
                                        <View style={{ paddingTop: 10 }}>
                                            <Text style={{ color: Colors.grey2, fontSize: 12, }}>Rating: <Text style={{ color: Colors.mintColor, fontSize: 15, fontWeight: 'bold', }}>{(this.props.requestAccepted.rated / this.props.commentArray.length).toFixed(1)}</Text> /5</Text>
                                        </View>
                                    }
                                </View>
                            </View>}
                        {this.props.requestAccepted.requestType == 'Request' &&
                            <View style={{ paddingTop: 15, paddingBottom: 10, }} />
                        }
                    </View>
                </Animated.ScrollView>
                <View style={{ borderTopColor: Colors.grey2, borderTopWidth: 1, flex: 0.1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ paddingLeft: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={{ color: Colors.grey1, fontSize: 20, fontWeight: 'bold' }}>{((this.props.requestAccepted.topic).length > 18) ?
                                (((this.props.requestAccepted.topic).substring(0, 18 - 3)) + '...') :
                                this.props.requestAccepted.topic}</Text>
                            <Text style={{ color: Colors.grey2, fontSize: 10, }}>Request ID <Text style={{ color: Colors.mintColor }}>{this.props.navigation.state.params.uid}</Text></Text>
                        </View>
                        {this.props.requestAccepted.requestType == 'Request' && this.props.requestAccepted.status != "done" &&
                            <Button
                                buttonStyle={{ borderRadius: 3, width: window.width * 0.3, paddingRight: 20 }}
                                backgroundColor='#EF5350'
                                fontWeight='bold'
                                color='white'
                                onPress={this.handleAcceptPress}
                                disabled={buttonStatus}
                                title='Accept' />
                        }
                        {this.props.requestAccepted.requestType == 'Event' && savedArray.includes(this.props.navigation.state.params.uid) && this.props.requestAccepted.status != "done" &&
                            <Button
                                buttonStyle={{ borderRadius: 3, width: window.width * 0.3, paddingRight: 20 }}
                                backgroundColor='#EF5350'
                                fontWeight='bold'
                                color='white'
                                onPress={this.handleUnsavedPress}
                                title='Unsaved' />
                        }
                        {this.props.requestAccepted.requestType == 'Event' && savedArray.includes(this.props.navigation.state.params.uid) == false && this.props.requestAccepted.status != "done" &&
                            <Button
                                buttonStyle={{ borderRadius: 3, width: window.width * 0.3, paddingRight: 20 }}
                                backgroundColor='#EF5350'
                                fontWeight='bold'
                                color='white'
                                onPress={this.handleSavePress}
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
                            source={{ uri: this.props.requestAccepted.imageUrl }}
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
                    <Text style={styles.title}>{((this.props.requestAccepted.topic).length > 18) ?
                        (((this.props.requestAccepted.topic).substring(0, 18 - 3)) + '...') :
                        this.props.requestAccepted.topic}</Text>
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { status } = state.heroStatus;
    const { userProfileObject } = state.userForm;
    const { requestAccepted } = state.requestForm;
    const commentArray = _.map(requestAccepted.Comments, (val, uid) => {
        return { ...val, uid };
    })
    const { requestSaved } = state.requestForm
    return { status, requestAccepted, userProfileObject, requestSaved, commentArray };
};


export default connect(mapStateToProps, ActionCreators)(RequestView);