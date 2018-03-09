import React from 'react';
import { StyleSheet, View, Platform, Text, Dimensions, ScrollView, Image, Animated, StatusBar } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Constants, Location, Permissions, DangerZone } from 'expo';
import HeroLocateButton from '../../components/hero-locate-button';
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
});

class FindingScreen extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollY: new Animated.Value(0),
    };
  }

  componentWillMount() {
    if (this.props.status == 'accepted') {

    }
    else {
      setTimeout(() => {
        this.props.hero_finding();
      }, 3000);
    }
  }

  goToNearMe = async () => {
    this.setState({ loading: true });
    this.props.requestFetch()
    setTimeout(() => {
      this.props.navigation.navigate('ListHelpScreen');
      this.setState({ loading: false });
    }, 3000);
  };

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
    if (this.props.status == "accepted") {
      content = (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
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
                <Text style={styles.topic}>รถเสีย</Text>
                <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ color: Colors.grey1, fontSize: 10, fontWeight: 'bold' }}>Mechanic</Text>
                    <Text style={{ color: Colors.grey2, fontSize: 10, }}>Requested by <Text style={{ color: Colors.mintColor }}>Watthakorn malikaow</Text></Text>
                    <Text style={{ color: Colors.grey2, fontSize: 10, }}>Created 21/10/17</Text>
                  </View>
                  <Image
                    style={styles.image}
                    resizeMode={"cover"}
                    source={{ uri: "https://s-media-cache-ak0.pinimg.com/736x/43/cd/6e/43cd6e82491bf130d97624c198ee1a3f--funny-movie-quotes-funny-movies.jpg" }}
                  />
                </View>
                <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Button
                      style={{ width: window.width * 0.3, }}
                      buttonStyle={{ borderRadius: 3, }}
                      backgroundColor='#EF5350'
                      fontWeight='bold'
                      color='white'
                      title='Route'
                      onPress={() => this.props.navigation.navigate('MapRouteScreen')} />
                    <Button
                      style={{ width: window.width * 0.3, }}
                      buttonStyle={{ borderRadius: 3, }}
                      backgroundColor='#EF5350'
                      fontWeight='bold'
                      color='white'
                      title='Chat'
                      onPress={() => this.props.navigation.navigate('ChatScreen')} />
                  </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderColor: Colors.grey3, borderBottomWidth: 1 }}>
                  <Text style={styles.topic}>Details</Text>
                  <Text style={{ color: Colors.grey1, fontSize: 15, paddingTop: 10, paddingBottom: 10, }}>Lorem Ipsum is simply dummy text of
              the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived
               not only five centuries, but also the leap into electronic
               typesetting, remaining essentially unchanged. It was popularised
               in the 1960s with the release of Letraset sheets containing
               Lorem Ipsum passages, and more recently with desktop publishing
               software like Aldus PageMaker including versions of Lorem Ipsum.
                 </Text>
                </View>
                <View style={{ borderColor: Colors.grey3, borderTopWidth: 1, borderBottomWidth: 1, padding: 15 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Button
                      style={{ width: window.width * 0.3, }}
                      buttonStyle={{ borderRadius: 3, }}
                      backgroundColor='#EF5350'
                      fontWeight='bold'
                      color='white'
                      title='Cancel'
                      onPress={() => this.props.hero_finding()} />
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
              source={{ uri: "https://firebasestorage.googleapis.com/v0/b/bero-be-a-hero.appspot.com/o/images%2Ftest1.jpg?alt=media&token=bcdbb820-6b5d-42f1-908d-3dc9997314ed" }}
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
            <Text style={styles.title}>#00001</Text>
          </Animated.View>
        </View>
      );
    } else if (this.props.status == 'finding') {
      content = (
        <View style={styles.container}>
          <HeroLocateButton
            onPress={this.goToNearMe}
            loading={this.state.loading}
          />
          <Text style={styles.header2}>Find Nearest Request</Text>
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
      <View style={styles.container}>
        {content}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { status } = state.heroStatus;

  return { status };
};


export default connect(mapStateToProps, ActionCreators)(FindingScreen);