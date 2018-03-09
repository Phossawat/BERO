import React from 'react';
import { StyleSheet, View, Dimensions, Animated, Image, TouchableOpacity } from 'react-native';
import FloatingButton from '../../components/FloatingButton';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Card, Text, Button, FormInput, FormLabel, FormValidationMessage, CheckBox, Tile, Icon } from 'react-native-elements';
import { LOCATION } from 'expo/src/Permissions';
import Colors from '../../constants/colors';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import _ from 'lodash';

const window = Dimensions.get('window');

const Images = [
  { uri: "https://firebasestorage.googleapis.com/v0/b/bero-be-a-hero.appspot.com/o/images%2Ftest1.jpg?alt=media&token=bcdbb820-6b5d-42f1-908d-3dc9997314ed" },
  { uri: "https://firebasestorage.googleapis.com/v0/b/bero-be-a-hero.appspot.com/o/images%2Ftest2.jpg?alt=media&token=440b10a4-f4b6-43c6-8a63-d134d5b21a73" },
  { uri: "https://firebasestorage.googleapis.com/v0/b/bero-be-a-hero.appspot.com/o/images%2Ftest1.jpg?alt=media&token=bcdbb820-6b5d-42f1-908d-3dc9997314ed" },
  { uri: "https://firebasestorage.googleapis.com/v0/b/bero-be-a-hero.appspot.com/o/images%2Ftest2.jpg?alt=media&token=440b10a4-f4b6-43c6-8a63-d134d5b21a73" }
]


const CARD_HEIGHT = window.height * 0.4;
const CARD_WIDTH = CARD_HEIGHT - 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  endPadding: {
    paddingRight: window.width - CARD_WIDTH,
  },
  card: {
    padding: 5,
    backgroundColor: "white",
    marginHorizontal: 0,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 2.5,
    borderRadius: 4,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1.5,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(239,83,80, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(239,83,80, 0.5)",
  },
});

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

class MapHelpScreen extends React.Component {
  static navigationOptions = { 
    header: null,
    tabBarVisible: false,
   }
  state = {
    location: { coords: {latitude: 0, longitude: 0}},
    locationMarker: {
        latitude: 13.731014,
        longitude: 100.781193,
    },
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: "Best Place",
        description: "This is the best place in Portland",
        image: Images[0],
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: "Second Best Place",
        description: "This is the second best place in Portland",
        image: Images[1],
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034,
        },
        title: "Third Best Place",
        description: "This is the third best place in Portland",
        image: Images[2],
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917,
        },
        title: "Fourth Best Place",
        description: "This is the fourth best place in Portland",
        image: Images[3],
      },
    ],
    region: {
      latitude: 13.731014,
      longitude: 100.781193,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
};

  replaceScreen = () => {
    this.props.navigation.dispatch({
      key: 'ListHelpScreen',
      type: 'ReplaceCurrentScreen',
      routeName: 'ListHelpScreen',
    });
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.props.requestArray.length) {
        index = this.props.requestArray.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { mark_position } = this.props.requestArray[index];
          this.map.animateToRegion(
            {
              ...mark_position,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }


  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    }
    if (this.refs.myRef) {
    this.setState({location, region})
    }
  }

  render() {
    const interpolations = this.props.requestArray.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    return (
      <View style={styles.container} >
      <View style={{ zIndex: 2, backgroundColor: 'transparent', position: 'absolute' }}>
                        <Icon name="chevron-left" type='font-awesome' color={Colors.red} style={{ paddingTop: 25, paddingLeft: 20 }} onPress={() => this.props.navigation.goBack()} />
                </View>
                <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          showsUserLocation={true}
          style={styles.container}
        >
          {this.props.requestArray.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.mark_position}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.props.requestArray.map((marker, index) => (
            <TouchableOpacity style={styles.card} key={index}  onPress={()=>this.props.navigation.navigate('RequestView')}>
              <Image
                source={{ uri: marker.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.topic}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.detail}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { requestObject } = state.requestForm;
  const requestArray = _.map(requestObject, (val, uid) => {
    return { ...val, uid }; 
});
  return { requestObject, requestArray };
};


export default connect(mapStateToProps, ActionCreators)(MapHelpScreen);