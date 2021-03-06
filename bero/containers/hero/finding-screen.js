import React from 'react';
import { StyleSheet, View, Platform, Text, Dimensions, ScrollView, Image, Animated, StatusBar, Modal, Picker, BackHandler, } from 'react-native';
import { Button, Icon, Slider } from 'react-native-elements';
import { Constants, Location, Permissions, DangerZone, Font } from 'expo';
import HeroLocateButton from '../../components/hero-locate-button';
import ModalSelector from 'react-native-modal-selector';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import Colors from '../../constants/colors';

const window = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const { Lottie } = DangerZone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header2: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 20,
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
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  Wrapper: {
    backgroundColor: '#FFFFFF',
    height: window.height * 0.3,
    width: window.width * 0.8,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  viewImage: {
    zIndex: 2,
    top: window.height * 0.22,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModal: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  outerCircle: {
    borderRadius: 55,
    width: 110,
    height: 110,
    backgroundColor: Colors.mintColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class FindingScreen extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      scrollY: new Animated.Value(0),
      location: null,
      errorMessage: null,
      value: 0.1,
      config: false,
      loadingCancle: false,
    };
  }

  componentDidMount() {
    Font.loadAsync({
      'choco': require('../../assets/fonts/chocolate-cake.ttf'),
    });
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return false;
    });
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    this.props.hero_loading()
    if (this.props.userProfileObject.statusRequest == 'accepted' || this.props.userProfileObject.statusRequest == 'in-progress') {
      this.props.requestFetchEvent(this.props.userProfileObject.requestAccepted)
      this.props.fetch_messages(this.props.userProfileObject.requestAccepted);
      setTimeout(() => {
        this.props.hero_inprogress();
      }, 3000);
    }
    else {
      setTimeout(() => {
        this.props.hero_finding();
      }, 3000);
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  goToNearMe = () => {
    this.setState({ loading: false });
    this.props.requestFetchNearKeys(this.state.location.coords.latitude, this.state.location.coords.longitude, this.state.value, this.props.userProfileObject.requestCreate )
    setTimeout(() => {
      this.props.navigation.navigate('ListHelpScreen', { distance: this.state.value, location: this.state.location.coords });
      this.setState({ loading: true });
    }, 2000)
  };

  cancleHandle = () => {
    this.setState({ loadingCancle:true })
    this.props.hero_cancle(this.props.userProfileObject.requestAccepted);
  }

  handleDone = () => {
    this.props.getPoint();
    this.props.hero_finding();
  }

  handleChat = () => {
    this.props.navigation.navigate('ChatScreen', { requestId: this.props.userProfileObject.requestAccepted, requestTopic: this.props.requestAccepted2.topic })
  }

  render() {

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
    let content;
    if (this.props.status == "in-progress") {
      content = (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
          {this.props.requestAccepted2.status == 'done' &&
            <Modal
              transparent={true}
              animationType={'slide'}
              onRequestClose={() => { console.log('close modal') }}>
              <View style={styles.modalBackground}>
                <View style={styles.viewImage}>
                  <View style={styles.outerCircle}>
                    <Image
                      style={styles.imageModal}
                      resizeMode={"cover"}
                      source={{ uri: this.props.requestAccepted2.ownerprofilePicture }}
                    />
                  </View>
                </View>

                <View style={styles.Wrapper}>
                  <View style={{ alignItems: 'center', paddingTop: 20 }}>
                    <Text style={{ fontFamily: 'choco', fontSize: 32, color: Colors.red }}>Thank you</Text>
                    <Text style={{ fontFamily: 'choco', fontSize: 18, color: Colors.red }}>for your help</Text>
                  </View>
                  <Button
                    buttonStyle={{ borderRadius: 6, width: window.width * 0.3, }}
                    backgroundColor={Colors.mintColor}
                    fontWeight='bold'
                    color='white'
                    title='OK'
                    onPress={this.handleDone} />
                </View>
              </View>
            </Modal>
          }
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor="rgba(0, 0, 0, 0.251)"
          />
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
                <Text style={styles.topic}>{this.props.requestAccepted2.topic}</Text>
                <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ color: Colors.grey1, fontSize: 10, fontWeight: 'bold' }}>{this.props.requestAccepted2.type}</Text>
                    <Text style={{ color: Colors.grey2, fontSize: 10, }}>Requested by <Text style={{ color: Colors.mintColor }}>{this.props.requestAccepted2.ownerName}</Text></Text>
                    <Text style={{ color: Colors.grey2, fontSize: 10, }}>Created {new Date(this.props.requestAccepted2.when).toLocaleString()}</Text>
                  </View>
                  <Image
                    style={styles.image}
                    resizeMode={"cover"}
                    source={{ uri: this.props.requestAccepted2.ownerprofilePicture }}
                  />
                </View>
                <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Button
                      buttonStyle={{ borderRadius: 3, width: window.width * 0.3, }}
                      backgroundColor='#EF5350'
                      fontWeight='bold'
                      color='white'
                      title='Route'
                      onPress={() => this.props.navigation.navigate('MapRouteScreen', { item: this.props.requestAccepted2.mark_position })} />
                    <Button
                      buttonStyle={{ borderRadius: 3, width: window.width * 0.3, }}
                      backgroundColor='#EF5350'
                      fontWeight='bold'
                      color='white'
                      title='Chat'
                      onPress={this.handleChat} />
                  </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderColor: Colors.grey3, borderBottomWidth: 1 }}>
                  <Text style={styles.topic}>Details</Text>
                  <Text style={{ color: Colors.grey1, fontSize: 15, paddingTop: 10, paddingBottom: 10, }}>
                    {this.props.requestAccepted2.detail}
                  </Text>
                </View>
                <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Button
                      buttonStyle={{ borderRadius: 3, width: window.width * 0.3, }}
                      loading={this.state.loadingCancle}
                      disabled={this.state.loadingCancle}
                      loadingProps={{ size: "large", color: "white" }}
                      backgroundColor='#EF5350'
                      fontWeight='bold'
                      color='white'
                      title='Cancel'
                      onPress={this.cancleHandle} />
                  </View>
                </View>
              </View>
            </View>
          </Animated.ScrollView>
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
              source={{ uri: this.props.requestAccepted2.imageUrl }}
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
            <Text style={styles.title}>{this.props.requestAccepted2.topic}</Text>
          </Animated.View>
        </View>
      );
    } else if (this.props.status == 'finding') {
      content = (
        <View style={styles.container}>
          <Modal
            transparent={true}
            visible={this.state.config}
            onRequestClose={() => { console.log('close modal') }}>
            <View style={styles.modalBackground}>
              <View style={styles.Wrapper}>
                <View style={{ alignItems: 'stretch', justifyContent: 'center' }}>
                  <Text>Distance area to find</Text>
                  <Slider
                    style={{ width:window.width * 0.7 }}
                    thumbStyle={{ backgroundColor: Colors.mintColor }}
                    thumbTintColor={ Colors.mintColor }
                    maximumValue={10}
                    minimumValue={0.1}
                    step={0.1}
                    value={this.state.value}
                    onValueChange={(value) => this.setState({ value })} />
                  <Text>Distance: {this.state.value.toFixed(1)} Km</Text>
                </View>
                <Button
                  buttonStyle={{ borderRadius: 6, width: window.width * 0.3, }}
                  backgroundColor={Colors.mintColor}
                  fontWeight='bold'
                  color='white'
                  title='OK'
                  onPress={() => {
                    this.setState({ config: false })
                  }} />
              </View>
            </View>
          </Modal>
          {this.state.loading ?
            <View style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
              <View style={{ paddingTop: window.height * 0.4, alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={{ paddingBottom: 1, color: Colors.grey1, fontSize: 30, fontWeight: 'bold' }}>Find nearest request</Text>
                <Text style={{ color: Colors.grey2, fontSize: 15, paddingBottom: 20 }}>Press button below.</Text>
                <Button
                  buttonStyle={{
                    borderRadius: 6,
                    borderColor: Colors.mintColor,
                    borderWidth: 1,
                    width: window.width * 0.4,
                  }}
                  backgroundColor='white'
                  fontSize={15}
                  color={Colors.mintColor}
                  title="Find"
                  onPress={this.goToNearMe}
                />
              </View>
              <Button
                title='Setting'
                buttonStyle={{ backgroundColor: 'white', }}
                color={Colors.grey2}
                onPress={() => {
                  this.setState({ config: true })
                }}
              />
            </View>
            :
            <View style={styles.container}>
              <View>
                <Lottie
                  ref={animation => {
                    if (animation == null) {

                    }
                    else {
                      animation.play();
                    }
                  }}
                  style={{
                    width: window.width * 0.6,
                    height: window.width * 0.6,
                    backgroundColor: 'white',
                  }}
                  loop={true}
                  source={require('../../assets/animations/location.json')}
                />
              </View>
            </View>
          }
        </View>
      );
    } else {
      content = (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
            <View>
              <Lottie
                ref={animation => {
                  if (animation == null) {

                  }
                  else {
                    animation.play();
                  }
                }}
                style={{
                  width: window.width * 0.4,
                  height: window.width * 0.4,
                  backgroundColor: 'white',
                }}
                loop={true}
                source={require('../../assets/animations/loading.json')}
              />
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: 'white', }}>
        {content}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { status } = state.heroStatus;
  const { userProfileObject } = state.userForm;
  const { requestAccepted2 } = state.requestForm;

  return { status, userProfileObject, requestAccepted2 };
};


export default connect(mapStateToProps, ActionCreators)(FindingScreen);